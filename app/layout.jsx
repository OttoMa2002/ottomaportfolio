import { Fredoka, Quicksand } from "next/font/google"
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

export const metadata = {
  title: "Otto's Home",
  icons: {
    icon: "/小小猪.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  )
}