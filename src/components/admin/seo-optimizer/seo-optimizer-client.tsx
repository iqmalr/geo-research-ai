"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@prisma/client"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, ScanSearch, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type SeoResult = {
  score: number
  suggestedTitle: string
  suggestedDescription: string
  suggestedTags: string[]
  issues: string[]
}

type RowState = {
  loading: boolean
  result: SeoResult | null
  error: string
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-100 text-green-700" :
    score >= 50 ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", color)}>
      {score}
    </span>
  )
}

export function SeoOptimizerClient({ products }: { products: Product[] }) {
  const router = useRouter()
  const [rows, setRows] = useState<Record<string, RowState>>({})
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null)
  const [applying, setApplying] = useState(false)

  const activeResult = dialogProduct ? rows[dialogProduct.id]?.result : null

  const analyze = async (product: Product) => {
    setRows((r) => ({ ...r, [product.id]: { loading: true, result: null, error: "" } }))

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.name,
          description: product.description,
          tags: product.tags,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Gagal analyze")

      setRows((r) => ({ ...r, [product.id]: { loading: false, result: data, error: "" } }))
    } catch (err) {
      setRows((r) => ({
        ...r,
        [product.id]: {
          loading: false,
          result: null,
          error: err instanceof Error ? err.message : "Error",
        },
      }))
    }
  }

  const openDialog = (product: Product) => {
    setDialogProduct(product)
  }

  const applyChanges = async () => {
    if (!dialogProduct || !activeResult) return
    setApplying(true)
    try {
      await fetch(`/api/products/${dialogProduct.id}/apply-seo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeResult),
      })
      setDialogProduct(null)
      router.refresh()
    } finally {
      setApplying(false)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[90px] text-center">Score</TableHead>
              <TableHead className="w-[180px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  Belum ada produk untuk diaudit.
                </TableCell>
              </TableRow>
            )}
            {products.map((p) => {
              const row = rows[p.id]
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium max-w-[220px] truncate">{p.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                      {p.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{p.tags.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.result ? <ScoreBadge score={row.result.score} /> : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={row?.loading}
                        onClick={() => analyze(p)}
                      >
                        {row?.loading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <ScanSearch className="w-3.5 h-3.5" />
                        )}
                        <span className="ml-1.5">Analyze</span>
                      </Button>
                      {row?.result && (
                        <Button size="sm" variant="ghost" onClick={() => openDialog(p)}>
                          <Info className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                    {row?.error && (
                      <p className="text-xs text-destructive mt-1">{row.error}</p>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={!!dialogProduct} onOpenChange={(v) => !v && setDialogProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              SEO Audit
              {activeResult && <ScoreBadge score={activeResult.score} />}
            </DialogTitle>
          </DialogHeader>

          {dialogProduct && activeResult && (
            <div className="flex flex-col gap-5 py-2">
              {/* Issues */}
              {activeResult.issues.length > 0 && (
                <div className="rounded-lg bg-muted/50 p-4 flex flex-col gap-2">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    Temuan
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {activeResult.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="mt-0.5 text-yellow-500">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Title comparison */}
              <div className="grid gap-3">
                <p className="text-sm font-medium">Judul</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Saat ini</p>
                    <p className="text-sm">{dialogProduct.name}</p>
                  </div>
                  <div className="rounded-md border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-3">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" /> Saran
                    </p>
                    <p className="text-sm">{activeResult.suggestedTitle}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description comparison */}
              <div className="grid gap-3">
                <p className="text-sm font-medium">Deskripsi</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Saat ini</p>
                    <p className="text-sm whitespace-pre-line line-clamp-6">
                      {dialogProduct.description || <span className="italic text-muted-foreground">Kosong</span>}
                    </p>
                  </div>
                  <div className="rounded-md border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-3">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" /> Saran
                    </p>
                    <p className="text-sm whitespace-pre-line line-clamp-6">{activeResult.suggestedDescription}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags comparison */}
              <div className="grid gap-3">
                <p className="text-sm font-medium">Tags</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground mb-2">Saat ini</p>
                    <div className="flex flex-wrap gap-1">
                      {dialogProduct.tags.length ? dialogProduct.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      )) : <span className="text-xs italic text-muted-foreground">Kosong</span>}
                    </div>
                  </div>
                  <div className="rounded-md border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-3">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" /> Saran
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {activeResult.suggestedTags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogProduct(null)}>Tutup</Button>
            <Button onClick={applyChanges} disabled={applying || !activeResult}>
              {applying ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Menerapkan...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4 mr-2" />Apply Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
