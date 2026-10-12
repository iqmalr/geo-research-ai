"use client"

import { useState } from "react"
import { StoreConfig } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Props = { config: StoreConfig }

export function SettingsForm({ config }: Props) {
  const [form, setForm] = useState({
    storeName: config.storeName,
    city: config.city,
    province: config.province,
    address: config.address,
    phone: config.phone,
    whatsapp: config.whatsapp,
    description: config.description,
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="storeName">Nama Toko</Label>
        <Input id="storeName" value={form.storeName} onChange={(e) => set("storeName", e.target.value)} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="city">Kota</Label>
        <Input
          id="city"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="contoh: Semarang"
        />
        <p className="text-xs text-muted-foreground">
          Digunakan di judul halaman dan metadata SEO — kata kunci kota tidak perlu ditulis di nama produk.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="province">Provinsi</Label>
        <Input id="province" value={form.province} onChange={(e) => set("province", e.target.value)} placeholder="contoh: Jawa Tengah" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Alamat</Label>
        <Input id="address" value={form.address} onChange={(e) => set("address", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Telepon</Label>
          <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="628xxxxxxxxx" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Deskripsi Toko</Label>
        <Textarea id="description" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
        {saved && <span className="text-sm text-green-600">Tersimpan!</span>}
      </div>
    </form>
  )
}
