# Product Knowledge — geo-research-ai

**Last updated:** 2026-10-09

---

## Apa itu geo-research-ai?

**geo-research-ai** adalah web app toko online single-vendor dengan AI-powered SEO tools. Dirancang untuk satu pemilik toko yang ingin membuat konten produk berkualitas tinggi secara otomatis menggunakan AI, sekaligus menyajikan katalog produk yang rapi kepada pembeli.

---

## Nilai Utama (Value Proposition)

- **AI Content Generation:** Buat judul, deskripsi, dan tags produk yang teroptimasi cukup dari satu input keyword.
- **SEO Audit 1-Klik:** Analisis semua produk aktif dan terapkan saran perbaikan langsung dari dashboard.
- **Toko Sendiri:** Tidak bergantung marketplace pihak ketiga — produk ditampilkan di platform sendiri.
- **Simple & Private:** Single owner, tidak ada registrasi publik, semua data di database sendiri.

---

## Target Pengguna

| Persona | Deskripsi |
|---|---|
| **Owner (Admin)** | Pemilik toko — login ke admin panel, kelola produk, gunakan AI tools |
| **Buyer (Publik)** | Pengunjung — browse katalog, lihat detail produk (tanpa perlu login) |

---

## Fitur Utama

### Admin Panel (login required)

1. **Dashboard** — ringkasan jumlah produk, status toko
2. **Product Management** — CRUD produk (nama, deskripsi, harga, foto, tags, status aktif/nonaktif)
3. **AI SEO Generator** — input keyword → AI generate title + deskripsi + tags → simpan sebagai produk baru atau terapkan ke produk yang ada
4. **SEO Optimizer** — audit semua produk, tampilkan skor SEO, saran perbaikan AI, apply 1-klik
5. **Research Engine** — tabel keyword opportunities untuk inspirasi produk baru

### Public Storefront

1. **Katalog** — grid produk dengan nama, foto, harga
2. **Detail Produk** — halaman lengkap per produk

---

## Scope v1 (Tidak termasuk)

- Cart / keranjang belanja
- Checkout & payment gateway
- Manajemen order
- Registrasi akun pembeli
- Multi-vendor / multi-seller

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | lucide-react |
| Toast | sonner |
| Database | NeonDB (PostgreSQL) |
| ORM | Prisma |
| AI | Gemini (pluggable) |
| Auth | Owner-only (NextAuth credentials atau JWT sederhana) |
| Deploy | Vercel |

---

## Arsitektur Singkat

```
Browser (Next.js)
  ├── /           → Public storefront (katalog + detail produk)
  └── /admin      → Admin panel (protected, owner only)
        ├── Dashboard
        ├── Products (CRUD)
        ├── AI Generator
        ├── SEO Optimizer
        └── Research

Next.js API Routes (/api/*)
  └── NeonDB via Prisma
  └── Gemini AI API
```
