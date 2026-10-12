import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { getStoreConfig } from "@/lib/store-config"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const [product, config] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    getStoreConfig(),
  ])

  if (!product) return {}

  const locationSuffix = config.city ? ` di ${config.city}` : ""
  const title = `${product.name} | ${config.storeName}${locationSuffix}`
  const description = product.description
    ? `${product.description} Tersedia${locationSuffix} — ${config.storeName}.`
    : `Beli ${product.name}${locationSuffix}. ${config.storeName} — pengiriman ke seluruh Indonesia.`

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const [product, config] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    getStoreConfig(),
  ])

  if (!product || product.status === "INACTIVE") notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: config.storeName,
        address: {
          "@type": "PostalAddress",
          addressLocality: config.city,
          addressRegion: config.province,
          addressCountry: "ID",
          streetAddress: config.address,
        },
        telephone: config.phone,
      },
    },
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-xl border bg-muted flex items-center justify-center overflow-hidden">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-20 h-20 text-muted-foreground/30" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold leading-snug">{product.name}</h1>
            <p className="text-3xl font-bold mt-2">{formatPrice(product.price)}</p>
          </div>

          {product.description && (
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
