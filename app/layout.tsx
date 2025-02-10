import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "حاسبة أسعار الذهب | Gold Price Calculator",
  description: "حاسبة أسعار الذهب في الدول العربية | Gold price calculator for Arab countries",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

