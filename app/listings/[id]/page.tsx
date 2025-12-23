import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ListingCard } from "@/components/listing-card"
import { mockListings } from "@/lib/mock-data"
import { MapPin, Phone, Mail, Flag, ArrowLeft, Calendar } from "lucide-react"

interface ListingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params
  const listing = mockListings.find((l) => l.id === Number(id))

  if (!listing) {
    notFound()
  }

  const getListingTypeText = (type: string) => {
    switch (type) {
      case "sell":
        return "Sotish"
      case "barter":
        return "Ayirboshlash"
      case "free":
        return "Bepul"
      default:
        return type
    }
  }

  const getListingTypeVariant = (type: string): "default" | "secondary" | "outline" => {
    switch (type) {
      case "sell":
        return "default"
      case "barter":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Get similar listings from same category
  const similarListings = mockListings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3)

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm" className="mb-4 sm:mb-6">
        <Link href="/search">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga
        </Link>
      </Button>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                <Image
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
                {listing.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Tavsiya</Badge>
                )}
              </div>

              {/* Additional images preview */}
              {listing.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {listing.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-muted">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${listing.title} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Info */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2 flex-wrap">
                    <Badge variant={getListingTypeVariant(listing.listingType)}>
                      {getListingTypeText(listing.listingType)}
                    </Badge>
                    <Badge variant="outline">{listing.category}</Badge>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-balance">{listing.title}</h1>
                </div>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                {listing.listingType === "sell" && listing.price ? (
                  <>
                    <span className="text-3xl sm:text-4xl font-bold text-primary">{listing.price.toLocaleString()}</span>
                    <span className="text-lg sm:text-xl text-muted-foreground">{listing.currency}</span>
                    {listing.negotiable && <span className="text-sm text-muted-foreground">/ kelishuv asosida</span>}
                  </>
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground">
                    {getListingTypeText(listing.listingType)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-lg">
                  Miqdor: <span className="font-semibold text-foreground">{listing.quantity}</span> {listing.unit}
                </span>
              </div>

              <Separator />

              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  {listing.region}, {listing.district}
                </span>
              </div>

              <div className="flex items-start gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  Joylashtirilgan:{" "}
                  {new Date(listing.createdAt).toLocaleDateString("uz-UZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Tavsif</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Aloqa ma'lumotlari</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">Telefon</p>
                    <p className="font-medium text-foreground break-words">{listing.contactPhone}</p>
                  </div>
                </div>

                {listing.contactEmail && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium text-foreground break-words">{listing.contactEmail}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Sotuvchi</p>
                  <p className="font-medium text-foreground">{listing.contactName}</p>
                </div>
              </div>

              <Separator />

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Qo'ng'iroq qilish
              </Button>

              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Flag className="mr-2 h-4 w-4" />
                Shikoyat qilish
              </Button>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Xavfsizlik maslahatlari</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Mahsulotni ko'rmasdan to'lov qilmang</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Ommaviy joylarda uchrashing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Shubhali takliflarga ehtiyot bo'ling</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Listings */}
      {similarListings.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">O'xshash e'lonlar</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {similarListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
