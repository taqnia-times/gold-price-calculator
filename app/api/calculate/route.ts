import { NextResponse } from "next/server"
import { getGoldPrice, getCountryInfo } from "../../lib/goldPrices"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const weight = searchParams.get("weight")
  const country = searchParams.get("country")
  const karat = searchParams.get("karat")

  if (!weight || !country || !karat) {
    return NextResponse.json({ error: "Missing weight, country, or karat" }, { status: 400 })
  }

  const basePrice = await getGoldPrice()
  const { factor, currency, exchangeRate } = await getCountryInfo(country)
  const karatFactor = Number.parseInt(karat) / 24

  const pricePerGram = basePrice * karatFactor * factor * exchangeRate
  const totalPrice = Number.parseFloat(weight) * pricePerGram

  return NextResponse.json({ price: totalPrice, currency })
}

