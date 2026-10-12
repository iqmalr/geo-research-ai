import { ResearchTable } from "@/components/admin/research/research-table"

const MOCK_KEYWORDS = [
  { keyword: "tas kulit handmade", searchVolume: 12400, opportunityScore: 87, competition: "Low" as const, estSales: 320 },
  { keyword: "dompet kulit pria", searchVolume: 9800, opportunityScore: 82, competition: "Low" as const, estSales: 270 },
  { keyword: "gelang kayu custom", searchVolume: 7600, opportunityScore: 79, competition: "Medium" as const, estSales: 195 },
  { keyword: "lilin aromaterapi soy wax", searchVolume: 6900, opportunityScore: 75, competition: "Low" as const, estSales: 210 },
  { keyword: "bingkai foto kayu rustic", searchVolume: 5400, opportunityScore: 71, competition: "Medium" as const, estSales: 145 },
  { keyword: "sabun natural handmade", searchVolume: 8200, opportunityScore: 68, competition: "Medium" as const, estSales: 180 },
  { keyword: "tote bag kanvas bordir", searchVolume: 4700, opportunityScore: 65, competition: "Low" as const, estSales: 130 },
  { keyword: "dekorasi makrame dinding", searchVolume: 6100, opportunityScore: 62, competition: "High" as const, estSales: 110 },
  { keyword: "perhiasan silver handmade", searchVolume: 11200, opportunityScore: 58, competition: "High" as const, estSales: 95 },
  { keyword: "celemek dapur custom", searchVolume: 3900, opportunityScore: 54, competition: "Low" as const, estSales: 88 },
  { keyword: "mug keramik custom", searchVolume: 8900, opportunityScore: 51, competition: "High" as const, estSales: 75 },
  { keyword: "stiker laptop custom", searchVolume: 15600, opportunityScore: 47, competition: "High" as const, estSales: 60 },
]

export default function ResearchPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Research</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Keyword opportunities untuk inspirasi produk baru. Klik "Use as Keyword" untuk generate langsung.
      </p>
      <ResearchTable keywords={MOCK_KEYWORDS} />
    </div>
  )
}
