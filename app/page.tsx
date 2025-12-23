import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/category-card"
import { ListingCard } from "@/components/listing-card"
import { categories, mockListings } from "@/lib/mock-data"
import Link from "next/link"

export default function HomePage() {
  const featuredListings = mockListings.filter((listing) => listing.featured)
  const recentListings = mockListings.slice(0, 6)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Qishloq xo'jaligi mahsulotlari bozori
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-muted-foreground text-balance leading-relaxed px-2">
              O'zbekiston bo'ylab fermerlar va tadbirkorlar uchun ishonchli onlayn platforma
            </p>

            <div className="mt-4 sm:mt-6">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto px-6 sm:px-8">
                <Link href="/listings/create">Bepul e'lon joylashtirish</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">Kategoriyalar</h2>
            <p className="text-sm sm:text-base text-muted-foreground text-balance">Kerakli mahsulotni toping</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} name={category.name} icon={category.icon} slug={category.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      {featuredListings.length > 0 && (
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Tavsiya etamiz</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Eng yaxshi takliflar</p>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <Link href="/search">Barchasini ko'rish</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Oxirgi e'lonlar</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Yangi qo'shilgan mahsulotlar</p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href="/search">Barchasini ko'rish</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/search">Ko'proq yuklash</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-12 sm:py-16 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-balance">Mahsulotingizni bugun soting!</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto text-balance leading-relaxed px-2">
            Minglab xaridorlar kutmoqda. Bepul e'lon joylashtiring va biznesni rivojlantiring
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 w-full sm:w-auto"
          >
            <Link href="/listings/create">E'lon berish</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
