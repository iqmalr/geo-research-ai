import { prisma } from "@/lib/prisma"

export async function getStoreConfig() {
  return prisma.storeConfig.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })
}
