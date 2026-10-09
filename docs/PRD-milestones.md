# PRD Milestones — geo-research-ai

**Product:** geo-research-ai
**Stack:** Next.js + React + TypeScript + Tailwind CSS v4 + shadcn/ui + NeonDB + Gemini AI
**Last updated:** 2026-10-09
**Status:** 📝 Draft awal

---

## Visi Produk

Web app toko online single-vendor dengan AI-powered SEO tools. Owner mengelola produk dan menggunakan AI untuk membuat konten produk yang teroptimasi. Buyer bisa browse katalog secara publik.

---

## Milestone 1 — Foundation

**Goal:** Setup Next.js, layout dasar, auth owner, halaman kosong.

### Tasks
- [ ] Init project Next.js + TypeScript + Tailwind CSS v4 + shadcn/ui
- [ ] Struktur folder: `app/`, `components/ui/`, `lib/`, `types/`, `hooks/`
- [ ] Layout admin panel: sidebar + main area (protected route)
- [ ] Layout public: navbar + footer
- [ ] Auth: simple owner login (JWT / NextAuth credentials)
- [ ] Halaman placeholder: Dashboard, Products, AI Generator, SEO Optimizer
- [ ] `GET /api/health` — cek koneksi DB

### Kriteria Selesai
- `npm run dev` buka browser, layout tampil
- Login owner berhasil, redirect ke admin dashboard
- Halaman publik bisa diakses tanpa login

---

## Milestone 2 — Product Management (CRUD)

**Goal:** Owner bisa tambah, edit, hapus produk.

### Tasks
- [ ] Schema DB: tabel `products` (id, name, description, price, images, tags, status, created_at)
- [ ] `GET /api/products` — list semua produk
- [ ] `POST /api/products` — tambah produk baru
- [ ] `PUT /api/products/:id` — update produk
- [ ] `DELETE /api/products/:id` — hapus produk
- [ ] Admin page "Products": table + tombol Add/Edit/Delete
- [ ] Form produk: shadcn Dialog + Form fields

### Kriteria Selesai
- Owner bisa CRUD produk dari admin panel
- Data tersimpan di NeonDB

---

## Milestone 3 — Public Storefront

**Goal:** Buyer bisa browse katalog dan lihat detail produk.

### Tasks
- [ ] Halaman `/` — grid katalog produk (nama, foto, harga)
- [ ] Halaman `/products/[slug]` — detail produk (nama, deskripsi, harga, tags)
- [ ] Search / filter sederhana
- [ ] Skeleton loading

### Kriteria Selesai
- Produk yang ditambah owner tampil di storefront publik
- Halaman detail produk bisa diakses via URL

---

## Milestone 4 — AI SEO Generator

**Goal:** Owner input keyword → AI generate title/deskripsi/tags → apply ke produk.

### Tasks
- [ ] `POST /api/ai/generate` — Gemini generate `{ title, description, tags[] }`
- [ ] Admin page "AI Generator":
  - Form: keyword + product type
  - Tombol "Generate with AI" + loading state
  - Preview: title, description, tags (bisa diedit sebelum disimpan)
  - Tombol "Save as New Product" atau "Apply to Existing"

### Kriteria Selesai
- Input keyword → output title + deskripsi + tags dalam < 8 detik
- Hasil bisa langsung disimpan sebagai produk baru

---

## Milestone 5 — SEO Optimizer

**Goal:** Audit produk aktif, saran perbaikan AI, apply 1-klik.

### Tasks
- [ ] `POST /api/ai/analyze` — AI audit produk, return `{ score, suggestedTitle, suggestedDescription, suggestedTags, issues }`
- [ ] `PUT /api/products/:id/apply-seo` — update produk dengan saran AI
- [ ] Admin page "SEO Optimizer":
  - Table produk dengan skor SEO (hijau ≥80 / abu ≥50 / merah <50)
  - Tombol "Analyze" per produk → loading state per-row
  - Dialog: Current vs Suggested (title + deskripsi + tags + issues)
  - Tombol "Apply Changes"

### Kriteria Selesai
- Semua produk bisa diaudit AI
- Saran diterapkan 1-klik tanpa reload

---

## Milestone 6 — Research Engine (Mock)

**Goal:** Tampilkan keyword opportunities untuk inspirasi produk baru.

### Tasks
- [ ] `GET /api/research/keywords` — mock data (keyword, opportunity score, competition, est. sales)
- [ ] Admin page "Research":
  - Table: Keyword | Search Volume | Opportunity Score | Competition | Est. Sales
  - Tombol "Use as Keyword" → pindah ke AI Generator dengan keyword terisi

### Kriteria Selesai
- Mock data tampil di tabel
- "Use as Keyword" navigasi ke AI Generator dengan keyword pre-filled

---

## Status Summary

| Milestone | Status |
|---|---|
| M1 — Foundation | 🔲 Belum |
| M2 — Product Management | 🔲 Belum |
| M3 — Public Storefront | 🔲 Belum |
| M4 — AI SEO Generator | 🔲 Belum |
| M5 — SEO Optimizer | 🔲 Belum |
| M6 — Research Engine (mock) | 🔲 Belum |
