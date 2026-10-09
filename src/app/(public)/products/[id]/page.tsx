import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
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
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product || product.status === "INACTIVE") notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
