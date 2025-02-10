"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminPanel() {
  const [settings, setSettings] = useState({
    siteName: "",
    description: "",
    keywords: "",
  })
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState({ name: "", flag: "", currency: "" })

  useEffect(() => {
    fetchSettings()
    fetchCountries()
  }, [])

  const fetchSettings = async () => {
    const response = await fetch("/api/settings")
    const data = await response.json()
    setSettings(data)
  }

  const fetchCountries = async () => {
    const response = await fetch("/api/countries")
    const data = await response.json()
    setCountries(data)
  }

  const handleSettingsChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleNewCountryChange = (e) => {
    setNewCountry({ ...newCountry, [e.target.name]: e.target.value })
  }

  const saveSettings = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    alert("تم حفظ الإعدادات بنجاح")
  }

  const addCountry = async () => {
    await fetch("/api/countries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCountry),
    })
    setNewCountry({ name: "", flag: "", currency: "" })
    fetchCountries()
  }

  const deleteCountry = async (countryName) => {
    await fetch(`/api/countries?name=${countryName}`, { method: "DELETE" })
    fetchCountries()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">إعدادات الموقع</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">اسم الموقع</Label>
            <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleSettingsChange} />
          </div>
          <div>
            <Label htmlFor="description">وصف الموقع</Label>
            <Textarea
              id="description"
              name="description"
              value={settings.description}
              onChange={handleSettingsChange}
            />
          </div>
          <div>
            <Label htmlFor="keywords">الكلمات المفتاحية</Label>
            <Input id="keywords" name="keywords" value={settings.keywords} onChange={handleSettingsChange} />
          </div>
          <Button onClick={saveSettings}>حفظ الإعدادات</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">إدارة الدول</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="countryName">اسم الدولة</Label>
            <Input id="countryName" name="name" value={newCountry.name} onChange={handleNewCountryChange} />
          </div>
          <div>
            <Label htmlFor="countryFlag">علم الدولة (رمز emoji)</Label>
            <Input id="countryFlag" name="flag" value={newCountry.flag} onChange={handleNewCountryChange} />
          </div>
          <div>
            <Label htmlFor="countryCurrency">عملة الدولة</Label>
            <Input id="countryCurrency" name="currency" value={newCountry.currency} onChange={handleNewCountryChange} />
          </div>
          <Button onClick={addCountry}>إضافة دولة</Button>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">قائمة الدول</h3>
          <ul className="space-y-2">
            {countries.map((country) => (
              <li key={country.name} className="flex items-center justify-between">
                <span>
                  {country.flag} {country.name} - {country.currency}
                </span>
                <Button variant="destructive" onClick={() => deleteCountry(country.name)}>
                  حذف
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

