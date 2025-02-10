"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const karats = [
  { value: "24", label: "24 قيراط" },
  { value: "22", label: "22 قيراط" },
  { value: "21", label: "21 قيراط" },
  { value: "18", label: "18 قيراط" },
]

export default function GoldCalculator() {
  const t = useTranslations("GoldCalculator")
  const [weight, setWeight] = useState("")
  const [country, setCountry] = useState("")
  const [karat, setKarat] = useState("")
  const [result, setResult] = useState<{ price: number; currency: string } | null>(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    const response = await fetch("/api/countries")
    const data = await response.json()
    setCountries(data)
  }

  const calculatePrice = async () => {
    const response = await fetch(`/api/calculate?weight=${weight}&country=${country}&karat=${karat}`)
    const data = await response.json()
    setResult(data)
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold mb-4 gold-gradient">{t("title")}</h2>
      <div>
        <label htmlFor="weight" className="block mb-1 text-gold">
          {t("weight")}
        </label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={t("enterWeight")}
          className="bg-gray-800 text-white border-gold"
        />
      </div>
      <div>
        <label htmlFor="country" className="block mb-1 text-gold">
          {t("country")}
        </label>
        <Select onValueChange={setCountry}>
          <SelectTrigger className="bg-gray-800 text-white border-gold">
            <SelectValue placeholder={t("selectCountry")} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.name} value={c.name} className="text-black">
                <span className="mr-2">{c.flag}</span>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="karat" className="block mb-1 text-gold">
          {t("karat")}
        </label>
        <Select onValueChange={setKarat}>
          <SelectTrigger className="bg-gray-800 text-white border-gold">
            <SelectValue placeholder={t("selectKarat")} />
          </SelectTrigger>
          <SelectContent>
            {karats.map((k) => (
              <SelectItem key={k.value} value={k.value} className="text-black">
                {k.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={calculatePrice} className="w-full bg-gold text-black hover:bg-gold-dark">
        {t("calculate")}
      </Button>
      {result && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-2xl gold-gradient">
            {t("result", { price: result.price.toFixed(2), currency: result.currency })}
          </p>
        </div>
      )}
    </div>
  )
}

