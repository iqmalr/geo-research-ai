import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { name, description, price, images, tags, status } = body

  if (!name || price == null) {
    return NextResponse.json({ error: "name and price are required" }, { status: 400 })
  }

  const product = await prisma.product.create({
    data: {
      name,
      description: description ?? "",
      price: parseFloat(price),
      images: images ?? [],
      tags: tags ?? [],
      status: status ?? "ACTIVE",
    },
  })

  return NextResponse.json(product, { status: 201 })
}
