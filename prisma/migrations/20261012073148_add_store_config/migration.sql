-- CreateTable
CREATE TABLE "store_config" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "storeName" TEXT NOT NULL DEFAULT 'Toko Saya',
    "city" TEXT NOT NULL DEFAULT '',
    "province" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "store_config_pkey" PRIMARY KEY ("id")
);
