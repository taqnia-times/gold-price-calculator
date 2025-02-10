import { getRequestConfig } from "next-intl/server"
import { locales } from "../next-intl.config.js"

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) locale = "ar"

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

