import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getModel } from "@/lib/gemini"

const PROMPT_TEMPLATE = (keyword: string, productType: string) => `
Kamu adalah copywriter SEO e-commerce yang ahli.
Buat konten produk yang menarik dan teroptimasi untuk mesin pencari.

Keyword: "${keyword}"
Tipe Produk: "${productType}"

Hasilkan dalam format JSON yang valid (tanpa markdown/backtick), persis seperti ini:
{
  "title": "Judul produk yang menarik, 50-80 karakter, mengandung keyword utama",
  "description": "Deskripsi produk 150-250 kata. Jelaskan manfaat, keunggulan, material/bahan, cara penggunaan. Gunakan bahasa yang persuasif dan natural. Sertakan keyword secara alami.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"]
}

Aturan tags:
- 6-8 tag relevan
- Huruf kecil semua
- Singkat (1-3 kata per tag)
- Campuran: keyword utama, sinonim, kategori, material, penggunaan
`.trim()

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { keyword, productType } = body

  if (!keyword) {
    return NextResponse.json({ error: "keyword is required" }, { status: 400 })
  }

  const prompt = PROMPT_TEMPLATE(keyword, productType ?? "produk umum")

  const result = await getModel().generateContent(prompt)
  const text = result.response.text().trim()

  let parsed: { title: string; description: string; tags: string[] }
  try {
    const clean = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim()
    parsed = JSON.parse(clean)
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON", raw: text }, { status: 500 })
  }

  return NextResponse.json(parsed)
}
