import "./globals.css"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }, { locale: "ur" }]
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} dir={locale === "ar" || locale === "ur" ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

