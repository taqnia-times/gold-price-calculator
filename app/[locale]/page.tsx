import { useTranslations } from "next-intl"
import GoldPrices from "../components/GoldPrices"
import GoldCalculator from "../components/GoldCalculator"
import GoldPriceChart from "../components/GoldPriceChart"
import CurrencyConverter from "../components/CurrencyConverter"
import Link from "next/link"
import Script from "next/script"
import {
  DiamondIcon as GoldIcon,
  NewspaperIcon as NewsIcon,
  CalculatorIcon,
  BarChartIcon as ChartIcon,
  CurrencyIcon,
} from "lucide-react"
import type { Metadata } from "next"

function getSettings() {
  return {
    siteName: process.env.SITE_NAME || "Gold Price Calculator",
    description: process.env.SITE_DESCRIPTION || "Calculate gold prices in various currencies",
    keywords: process.env.SITE_KEYWORDS || "gold, price, calculator",
  }
}

export function generateMetadata(): Metadata {
  const settings = getSettings()
  return {
    title: settings.siteName,
    description: settings.description,
    keywords: settings.keywords,
  }
}

export default function Home() {
  const settings = getSettings()
  const t = useTranslations("Home")

  // Mock data for the chart
  const chartData = [
    { date: "2023-05-01", price: 1800 },
    { date: "2023-05-02", price: 1805 },
    { date: "2023-05-03", price: 1810 },
    { date: "2023-05-04", price: 1815 },
    { date: "2023-05-05", price: 1820 },
    { date: "2023-05-06", price: 1825 },
    { date: "2023-05-07", price: 1830 },
  ]

  // Mock data for currencies
  const currencies = ["USD", "EUR", "GBP", "JPY", "AED", "SAR", "EGP"]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Script id="schema-org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "${settings.siteName}",
            "description": "${settings.description}",
            "url": "https://www.yourdomain.com",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          }
        `}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gold-gradient">{t("title")}</h1>
          <p className="text-xl text-gold-dark">{t("description")}</p>
        </header>
        <nav className="mb-12 flex justify-center">
          <Link
            href="/news"
            className="flex items-center bg-gold text-black px-6 py-3 rounded-full hover:bg-gold-dark transition-colors duration-300"
          >
            <NewsIcon className="mr-2" />
            {t("viewNews")}
          </Link>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="gold-border rounded-lg p-6 gold-shadow hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-50">
            <div className="flex items-center mb-4">
              <GoldIcon className="text-gold mr-2" />
              <h2 className="text-2xl font-semibold gold-gradient">{t("currentPrice")}</h2>
            </div>
            <GoldPrices />
          </div>
          <div className="gold-border rounded-lg p-6 gold-shadow hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-50">
            <div className="flex items-center mb-4">
              <ChartIcon className="text-gold mr-2" />
              <h2 className="text-2xl font-semibold gold-gradient">{t("priceChart")}</h2>
            </div>
            <GoldPriceChart data={chartData} />
          </div>
          <div className="gold-border rounded-lg p-6 gold-shadow hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-50">
            <div className="flex items-center mb-4">
              <CalculatorIcon className="text-gold mr-2" />
              <h2 className="text-2xl font-semibold gold-gradient">{t("calculator")}</h2>
            </div>
            <GoldCalculator />
          </div>
          <div className="gold-border rounded-lg p-6 gold-shadow hover:scale-105 transition-transform duration-300 bg-gray-800 bg-opacity-50">
            <div className="flex items-center mb-4">
              <CurrencyIcon className="text-gold mr-2" />
              <h2 className="text-2xl font-semibold gold-gradient">{t("currencyConverter")}</h2>
            </div>
            <CurrencyConverter currencies={currencies} />
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-gold-dark">
        <p>
          &copy; {new Date().getFullYear()} {t("footerText")}
        </p>
      </footer>
    </main>
  )
}

