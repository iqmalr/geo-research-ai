import Link from "next/link"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4">
          <Link href="/" className="font-semibold text-base tracking-tight">
            geo-research
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-7xl flex h-12 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">© 2026 geo-research</p>
        </div>
      </footer>
    </div>
  )
}
