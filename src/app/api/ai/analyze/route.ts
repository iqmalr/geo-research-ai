import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getModel } from "@/lib/gemini"

const PROMPT_TEMPLATE = (
  title: string,
  description: string,
  tags: string[]
) => `
Kamu adalah auditor SEO e-commerce yang ahli.
Audit konten produk berikut dan berikan saran perbaikan.

Konten saat ini:
- Judul: "${title}"
- Deskripsi: "${description}"
- Tags: ${JSON.stringify(tags)}

Hasilkan dalam format JSON yang valid (tanpa markdown/backtick):
{
  "score": <angka 0-100, nilai SEO keseluruhan>,
  "suggestedTitle": "judul yang lebih baik, 50-80 karakter",
  "suggestedDescription": "deskripsi yang lebih baik, 150-250 kata, natural dan persuasif",
  "suggestedTags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"],
  "issues": ["masalah 1 yang ditemukan", "masalah 2", "masalah 3"]
}

Aturan score:
- 80-100: konten sudah sangat baik
- 50-79: cukup baik, ada beberapa perbaikan
- 0-49: perlu perbaikan signifikan

Aturan issues: maksimal 4 isu konkret, singkat, actionable.
`.trim()

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, tags } = body

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 })
  }

  const prompt = PROMPT_TEMPLATE(title, description ?? "", tags ?? [])

  const result = await getModel().generateContent(prompt)
  const text = result.response.text().trim()

  let parsed: {
    score: number
    suggestedTitle: string
    suggestedDescription: string
    suggestedTags: string[]
    issues: string[]
  }

  try {
    const clean = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim()
    parsed = JSON.parse(clean)
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON", raw: text }, { status: 500 })
  }

  return NextResponse.json(parsed)
}
