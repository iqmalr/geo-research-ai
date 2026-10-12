"use client"

import { useRouter } from "next/navigation"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type KeywordRow = {
  keyword: string
  searchVolume: number
  opportunityScore: number
  competition: "Low" | "Medium" | "High"
  estSales: number
}

function OpportunityBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-500" :
    score >= 60 ? "bg-yellow-500" :
                  "bg-red-400"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm tabular-nums">{score}</span>
    </div>
  )
}

function CompetitionBadge({ level }: { level: string }) {
  const variant =
    level === "Low" ? "default" :
    level === "Medium" ? "secondary" :
    "destructive"
  return <Badge variant={variant} className="text-xs">{level}</Badge>
}

export function ResearchTable({ keywords }: { keywords: KeywordRow[] }) {
  const router = useRouter()

  const useKeyword = (keyword: string) => {
    router.push(`/ai-generator?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead className="text-right">Search Volume</TableHead>
            <TableHead>Opportunity</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead className="text-right">Est. Sales/mo</TableHead>
            <TableHead className="w-[140px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((row) => (
            <TableRow key={row.keyword}>
              <TableCell className="font-medium">{row.keyword}</TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {row.searchVolume.toLocaleString("id-ID")}
              </TableCell>
              <TableCell>
                <OpportunityBar score={row.opportunityScore} />
              </TableCell>
              <TableCell>
                <CompetitionBadge level={row.competition} />
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                ~{row.estSales}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => useKeyword(row.keyword)}
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Use as Keyword
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
