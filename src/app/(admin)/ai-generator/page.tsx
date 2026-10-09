import { AiGeneratorClient } from "@/components/admin/ai-generator/ai-generator-client"

export default function AiGeneratorPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">AI Generator</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Generate judul, deskripsi, dan tags produk dari keyword.
      </p>
      <AiGeneratorClient />
    </div>
  )
}
