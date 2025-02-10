import { NextResponse } from "next/server"

export async function GET() {
  const settings = {
    siteName: process.env.SITE_NAME || "Gold Price Calculator",
    description: process.env.SITE_DESCRIPTION || "Calculate gold prices in various currencies",
    keywords: process.env.SITE_KEYWORDS || "gold, price, calculator",
  }
  return NextResponse.json(settings)
}

export async function POST(request: Request) {
  // In a real-world scenario, you might want to update environment variables here
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Settings updated successfully" })
}

