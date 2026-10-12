import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { suggestedTitle, suggestedDescription, suggestedTags } = await req.json()

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: suggestedTitle,
      description: suggestedDescription,
      tags: suggestedTags,
    },
  })

  return NextResponse.json(product)
}
