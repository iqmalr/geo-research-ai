import { prisma } from "@/lib/prisma"
import { ProductsTable } from "@/components/admin/products/products-table"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Products</h1>
      <p className="text-muted-foreground text-sm mb-6">Kelola produk toko kamu.</p>
      <ProductsTable products={products} />
    </div>
  )
}
