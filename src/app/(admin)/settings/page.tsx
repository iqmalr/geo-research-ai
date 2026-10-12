import { getStoreConfig } from "@/lib/store-config"
import { SettingsForm } from "@/components/admin/settings/settings-form"

export default async function SettingsPage() {
  const config = await getStoreConfig()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Pengaturan Toko</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Kota dan nama toko akan otomatis muncul di metadata SEO setiap halaman produk.
      </p>
      <SettingsForm config={config} />
    </div>
  )
}
