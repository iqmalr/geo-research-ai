import { Suspense } from "react"
import { AiGeneratorClient } from "@/components/admin/ai-generator/ai-generator-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function AiGeneratorPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">AI Generator</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Generate judul, deskripsi, dan tags produk dari keyword.
      </p>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <AiGeneratorClient />
      </Suspense>
    </div>
  )
}
