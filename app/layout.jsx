import { Fredoka, Quicksand, Noto_Sans_SC } from "next/font/google"
import "./globals.css"

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

export const metadata = {
  title: "Otto's Home",
  icons: {
    icon: "/neon_back.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable} ${notoSansSC.variable}`}>
      <body>{children}</body>
    </html>
  )
}