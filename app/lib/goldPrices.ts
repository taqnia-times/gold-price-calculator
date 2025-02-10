export async function getGoldPrice() {
  // في تطبيق حقيقي، ستقوم بجلب هذه البيانات من واجهة برمجة تطبيقات (API)
  return 55.67 // سعر افتراضي للذهب عيار 24 قيراط بالدولار الأمريكي للجرام
}

export async function getCountryInfo(country: string) {
  // هذه البيانات تمثل العوامل والعملات وأسعار الصرف (افتراضية)
  const countryInfo = {
    مصر: { factor: 0.98, currency: "جنيه مصري", exchangeRate: 30.9 },
    السعودية: { factor: 1.02, currency: "ريال سعودي", exchangeRate: 3.75 },
    الإمارات: { factor: 1.03, currency: "درهم إماراتي", exchangeRate: 3.67 },
    قطر: { factor: 1.01, currency: "ريال قطري", exchangeRate: 3.64 },
    الكويت: { factor: 1.0, currency: "دينار كويتي", exchangeRate: 0.31 },
    البحرين: { factor: 0.99, currency: "دينار بحريني", exchangeRate: 0.38 },
    الأردن: { factor: 0.97, currency: "دينار أردني", exchangeRate: 0.71 },
  }
  return countryInfo[country] || { factor: 1, currency: "دولار أمريكي", exchangeRate: 1 }
}

