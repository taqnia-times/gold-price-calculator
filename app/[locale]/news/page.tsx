import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "GoldNews" })

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  }
}

export default function GoldNewsPage() {
  const t = useTranslations("GoldNews")

  // In a real application, you would fetch this data from an API or database
  const news = [
    { id: 1, title: t("newsItem1.title"), content: t("newsItem1.content") },
    { id: 2, title: t("newsItem2.title"), content: t("newsItem2.content") },
    { id: 3, title: t("newsItem3.title"), content: t("newsItem3.content") },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center gold-gradient">{t("pageTitle")}</h1>
      <div className="space-y-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-lg gold-border gold-shadow hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 gold-gradient">{item.title}</h2>
            <p className="text-white">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

