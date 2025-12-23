"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold">X</span>
              </div>
              <span className="font-bold text-foreground">Xirmon Market</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Qishloq xo'jaligi mahsulotlari uchun ishonchli onlayn bozor
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Havolalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Barcha e'lonlar
                </Link>
              </li>
              <li>
                <Link href="/listings/create" className="text-muted-foreground hover:text-primary transition-colors">
                  E'lon berish
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Biz haqimizda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Yordam</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rules" className="text-muted-foreground hover:text-primary transition-colors">
                  Foydalanish qoidalari
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-muted-foreground hover:text-primary transition-colors">
                  Xavfsizlik
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Xirmon Market. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
