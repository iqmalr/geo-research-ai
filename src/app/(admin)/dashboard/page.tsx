import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, CheckCircle2, EyeOff } from "lucide-react"

export default async function DashboardPage() {
  const [total, active, inactive] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.product.count({ where: { status: "INACTIVE" } }),
  ])

  const stats = [
    { label: "Total Produk", value: total, icon: Package, color: "text-blue-500" },
    { label: "Produk Aktif", value: active, icon: CheckCircle2, color: "text-green-500" },
    { label: "Produk Nonaktif", value: inactive, icon: EyeOff, color: "text-muted-foreground" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-6">Ringkasan toko kamu.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
