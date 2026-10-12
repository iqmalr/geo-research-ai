import { prisma } from "@/lib/prisma"
import { SeoOptimizerClient } from "@/components/admin/seo-optimizer/seo-optimizer-client"

export default async function SeoOptimizerPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">SEO Optimizer</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Audit konten produk dan terapkan saran AI dengan 1 klik.
      </p>
      <SeoOptimizerClient products={products} />
    </div>
  )
}
