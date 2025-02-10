import type { Metadata } from "next"
import GoldPrices from "./components/GoldPrices"
import GoldCalculator from "./components/GoldCalculator"

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

export default async function Home() {
  const settings = await getSettings()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{settings.siteName}</h1>
      <GoldPrices />
      <GoldCalculator />
    </main>
  )
}

