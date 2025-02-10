import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const countriesPath = path.join(process.cwd(), "data", "countries.json")

export async function GET() {
  const countries = await fs.readFile(countriesPath, "utf-8")
  return NextResponse.json(JSON.parse(countries))
}

export async function POST(request: Request) {
  const newCountry = await request.json()
  const countries = JSON.parse(await fs.readFile(countriesPath, "utf-8"))
  countries.push(newCountry)
  await fs.writeFile(countriesPath, JSON.stringify(countries, null, 2))
  return NextResponse.json({ message: "Country added successfully" })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")
  let countries = JSON.parse(await fs.readFile(countriesPath, "utf-8"))
  countries = countries.filter((country) => country.name !== name)
  await fs.writeFile(countriesPath, JSON.stringify(countries, null, 2))
  return NextResponse.json({ message: "Country deleted successfully" })
}

