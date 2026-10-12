import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.storeConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "Batik Nusantara",
      city: "Semarang",
      province: "Jawa Tengah",
      address: "Jl. Pemuda No. 12",
      phone: "024-1234567",
      whatsapp: "628112345678",
      description: "Toko batik dan pakaian tradisional berkualitas di Semarang.",
    },
  })

  const products = [
    {
      name: "Batik Tulis Motif Parang",
      description: "Batik tulis asli dengan motif parang klasik, cocok untuk acara formal maupun semi-formal.",
      price: 350000,
      tags: ["batik", "tulis", "parang", "formal"],
    },
    {
      name: "Kemeja Batik Pria Slim Fit",
      description: "Kemeja batik pria modern dengan potongan slim fit, bahan katun premium nyaman dipakai seharian.",
      price: 185000,
      tags: ["kemeja", "batik", "pria", "slim fit"],
    },
    {
      name: "Dress Batik Wanita Modern",
      description: "Dress batik wanita desain modern, perpaduan motif klasik dengan potongan kekinian.",
      price: 275000,
      tags: ["dress", "batik", "wanita", "modern"],
    },
    {
      name: "Baju Koko Polos Premium",
      description: "Baju koko pria bahan katun premium, cocok untuk sholat Jumat dan acara keagamaan.",
      price: 145000,
      tags: ["koko", "pria", "muslim", "premium"],
    },
    {
      name: "Kebaya Kutubaru Brokat",
      description: "Kebaya kutubaru bahan brokat halus, tersedia berbagai pilihan warna elegan.",
      price: 420000,
      tags: ["kebaya", "kutubaru", "brokat", "wanita"],
    },
    {
      name: "Rok Batik Lilit Wanita",
      description: "Rok batik lilit dengan tali adjustable, cocok dipakai ke kantor atau acara santai.",
      price: 125000,
      tags: ["rok", "batik", "wanita", "casual"],
    },
    {
      name: "Sarung Batik Pria Dewasa",
      description: "Sarung batik pria bahan katun halus, motif tradisional pilihan untuk ibadah dan santai.",
      price: 95000,
      tags: ["sarung", "batik", "pria", "ibadah"],
    },
    {
      name: "Blus Batik Cap Lengan Panjang",
      description: "Blus batik cap lengan panjang, desain elegan cocok untuk wanita berkerudung.",
      price: 165000,
      tags: ["blus", "batik", "cap", "lengan panjang", "wanita"],
    },
    {
      name: "Set Couple Batik Pasangan",
      description: "Set batik couple untuk pasangan suami istri, motif senada tampil serasi di setiap kesempatan.",
      price: 390000,
      tags: ["couple", "batik", "pasangan", "set"],
    },
    {
      name: "Celana Batik Santai Pria",
      description: "Celana batik santai pria bahan nyaman, desain kasual cocok untuk bersantai di rumah.",
      price: 110000,
      tags: ["celana", "batik", "pria", "santai"],
    },
  ]

  for (const p of products) {
    await prisma.product.create({ data: { ...p, images: [], status: "ACTIVE" } })
  }

  console.log("Seeded 10 products + store config")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
