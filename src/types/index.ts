export type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  tags: string[]
  status: "active" | "inactive"
  createdAt: Date
}

export type SeoAnalysis = {
  score: number
  suggestedTitle: string
  suggestedDescription: string
  suggestedTags: string[]
  issues: string[]
}

export type AiGenerateResult = {
  title: string
  description: string
  tags: string[]
}
