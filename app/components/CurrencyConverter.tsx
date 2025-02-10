"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CurrencyConverter({ currencies }) {
  const t = useTranslations("CurrencyConverter")
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("")
  const [toCurrency, setToCurrency] = useState("")
  const [result, setResult] = useState(null)

  const convertCurrency = async () => {
    // In a real application, you would call an API to get the current exchange rate
    const response = await fetch(`/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    const data = await response.json()
    setResult(data.result)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 gold-gradient">{t("title")}</h2>
      <div>
        <label htmlFor="amount" className="block mb-1 text-gold">
          {t("amount")}
        </label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t("enterAmount")}
          className="bg-gray-800 text-white border-gold"
        />
      </div>
      <div>
        <label htmlFor="fromCurrency" className="block mb-1 text-gold">
          {t("from")}
        </label>
        <Select onValueChange={setFromCurrency}>
          <SelectTrigger className="bg-gray-800 text-white border-gold">
            <SelectValue placeholder={t("selectCurrency")} />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency} className="text-black">
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="toCurrency" className="block mb-1 text-gold">
          {t("to")}
        </label>
        <Select onValueChange={setToCurrency}>
          <SelectTrigger className="bg-gray-800 text-white border-gold">
            <SelectValue placeholder={t("selectCurrency")} />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency} className="text-black">
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={convertCurrency} className="w-full bg-gold text-black hover:bg-gold-dark">
        {t("convert")}
      </Button>
      {result && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-2xl gold-gradient">
            {t("result", { amount, fromCurrency, result, toCurrency })}
          </p>
        </div>
      )}
    </div>
  )
}

