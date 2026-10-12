"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Save, Loader2, X } from "lucide-react"

type GenerateResult = {
  title: string
  description: string
  tags: string[]
}

export function AiGeneratorClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "")
  const [productType, setProductType] = useState("")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [error, setError] = useState("")

  // Editable result state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleGenerate = async () => {
    if (!keyword.trim()) return
    setGenerating(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, productType }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? "Gagal generate")

      setResult(data)
      setTitle(data.title)
      setDescription(data.description)
      setTags(data.tags)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setGenerating(false)
    }
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase().replace(/,/g, "")
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          description,
          price: 0,
          tags,
          images: [],
          status: "ACTIVE",
        }),
      })
      router.push("/products")
    } catch {
      setError("Gagal menyimpan produk")
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Input</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="keyword">Keyword Utama *</Label>
            <Input
              id="keyword"
              placeholder="contoh: tas kulit handmade"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="productType">Tipe Produk</Label>
            <Input
              id="productType"
              placeholder="contoh: aksesoris fashion, dekorasi rumah"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generating || !keyword.trim()}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate dengan AI
              </>
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Result Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hasil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!result && !generating && (
            <p className="text-sm text-muted-foreground py-6 text-center">
              Hasil generate akan muncul di sini.
            </p>
          )}

          {generating && (
            <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              Sedang generate...
            </div>
          )}

          {result && !generating && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="res-title">Judul</Label>
                <Input
                  id="res-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">{title.length} karakter</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="res-desc">Deskripsi</Label>
                <Textarea
                  id="res-desc"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">{description.length} karakter</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-1.5 min-h-9 rounded-md border px-3 py-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 text-xs">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    className="flex-1 min-w-24 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="tambah tag, Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                  />
                </div>
              </div>

              <Separator />

              <Button onClick={handleSave} disabled={saving || !title}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan sebagai Produk Baru
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
