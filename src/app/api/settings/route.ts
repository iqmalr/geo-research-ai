import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const config = await prisma.storeConfig.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })
  return NextResponse.json(config)
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { storeName, city, province, address, phone, whatsapp, description } = body

  const config = await prisma.storeConfig.upsert({
    where: { id: "default" },
    update: { storeName, city, province, address, phone, whatsapp, description },
    create: { id: "default", storeName, city, province, address, phone, whatsapp, description },
  })

  return NextResponse.json(config)
}
