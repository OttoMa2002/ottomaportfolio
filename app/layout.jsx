import { Fredoka, Quicksand, Noto_Sans_SC, Great_Vibes } from "next/font/google"
import "./globals.css"

/* 四种 Google 字体：品牌/英文正文/中文正文/花体*/
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fredoka",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
})

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
})

/* 站点元信息：浏览器标签标题 + favicon */
export const metadata = {
  title: "Otto's Home",
  icons: {
    icon: "/neon_back.png",
  },
}

/* 根布局：挂载四种字体变量到 html，供全站使用 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable} ${notoSansSC.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  )
}