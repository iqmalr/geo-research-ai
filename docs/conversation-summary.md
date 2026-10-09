# Rangkuman Percakapan — Pivot Project

**Tanggal:** 2026-10-09
**Konteks:** Diskusi awal rancangan ulang project seo-ai menuju konsep baru

---

## Latar Belakang

Project lama bernama **seo-ai** adalah Electron desktop app untuk otomasi SEO toko Etsy:
- Generate judul, 13 tags, dan deskripsi produk via AI (Gemini)
- Integrasi Etsy Open API v3 (OAuth 2.0)
- Dashboard performa toko, Listing Creator, SEO Optimizer, Research Engine
- Stack: Electron + electron-vite + React 19 + TypeScript + shadcn/ui + Tailwind CSS v4 + Express (seo-ai-api) + NeonDB

Status milestone lama saat percakapan:
- M1–M5 sudah selesai (Foundation, OAuth, Dashboard, Listing Creator, SEO Optimizer)
- M6 (Research Engine mock), M7 (Crafty MCP), M8 (Web Dashboard) belum dikerjakan

---

## Keputusan Pivot

User memutuskan untuk **tidak melanjutkan** integrasi dengan Etsy, dan beralih membangun **platform e-commerce sendiri** (seperti Etsy versi sederhana).

---

## Hasil Klarifikasi (Q&A)

| Pertanyaan | Jawaban |
|---|---|
| Target pengguna | Single-vendor — satu toko, satu pemilik |
| Platform | Web app — **Electron dihapus dari rencana** |
| Fitur buyer | Listing & katalog produk (no cart/checkout/payment untuk sekarang) |
| Peran AI/SEO | Tetap fitur utama — AI generate title/desc/tags untuk produk di toko sendiri |
| Codebase lama | **Mulai fresh** — semua ditinggal, tidak ada migrasi |
| Auth model | Satu akun owner saja — tidak ada registrasi umum |

---

## Gambaran Produk Baru

**Nama folder project:** `geo-research-ai`

**Konsep:** Web app toko online satu pemilik dengan AI-powered SEO tools.

### Dua Sisi Aplikasi

**1. Public Storefront (buyer)**
- Browse katalog produk
- Halaman detail produk
- Tidak ada cart/checkout di scope awal

**2. Admin Panel (owner — login required)**
- Manage produk (CRUD)
- AI SEO Generator — generate title, deskripsi, tags dari keyword/ide produk
- SEO Optimizer — audit dan perbaiki konten produk yang sudah ada

---

## Tech Stack Baru (Rencana)

| Layer | Teknologi |
|---|---|
| Frontend | Next.js + React + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Backend | Next.js API Routes atau Express (fresh) |
| Database | NeonDB (PostgreSQL) |
| AI | Gemini |
| Auth | Single owner login (JWT atau NextAuth) |
| Icons | lucide-react |
| Toast | sonner |

---

## Yang Perlu Dibuat Selanjutnya

- [ ] PRD & milestones baru sesuai konsep web app
- [ ] CLAUDE.md untuk project ini
- [ ] Scaffold project Next.js
- [ ] Tentukan nama produk final
