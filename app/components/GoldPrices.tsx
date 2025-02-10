import { useTranslations } from "next-intl"
import { getGoldPrice } from "../lib/goldPrices"

export default async function GoldPrices() {
  const t = useTranslations("GoldPrices")
  const price = await getGoldPrice()

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4 gold-gradient">{t("title")}</h2>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-3xl gold-gradient">{price.toFixed(2)} USD/g</p>
      </div>
    </div>
  )
}

