import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { getStoreConfig } from "@/lib/store-config"
import { ProductCard } from "@/components/public/product-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Props = {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getStoreConfig()
  const locationSuffix = config.city ? ` di ${config.city}` : ""
  const title = `${config.storeName} — Toko Online${locationSuffix}`
  const description = config.description
    ? config.description
    : `Belanja produk berkualitas dari ${config.storeName}${locationSuffix}. Pengiriman ke seluruh Indonesia.`

  return { title, description, openGraph: { title, description } }
}

export default async function HomePage({ searchParams }: Props) {
  const { q } = await searchParams
  const config = await getStoreConfig()

  const locationSuffix = config.city ? ` di ${config.city}` : ""
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.storeName,
    description: config.description || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address,
      addressLocality: config.city,
      addressRegion: config.province,
      addressCountry: "ID",
    },
    telephone: config.phone,
  }

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { tags: { has: q } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Katalog Produk</h1>
          {config.city && (
            <p className="text-sm text-muted-foreground mt-0.5">{config.storeName} — {config.city}</p>
          )}
        </div>
        <form className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Cari produk..."
            className="pl-9"
          />
        </form>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          {q ? `Tidak ada produk untuk "${q}".` : "Belum ada produk."}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
