"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Heart } from "lucide-react"
import { toast } from "sonner"
import type { Listing } from "@/lib/mock-data"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? "Sevimlilardan olib tashlandi" : "Sevimlilarga qo'shildi")
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

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow p-0 h-full">
        <div className="flex flex-row h-full">
          {/* Left side - Image */}
          <div className="relative w-32 sm:w-40 md:w-48 shrink-0 overflow-hidden bg-muted">
            <Image
              src={listing.images[0] || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {listing.featured && (
              <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">Tavsiya</Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 h-7 w-7 sm:h-8 sm:w-8 bg-background/80 hover:bg-background"
              onClick={handleFavoriteClick}
            >
              <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Right side - Content */}
          <CardContent className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 text-balance flex-1 min-w-0">{listing.title}</h3>
                <Badge variant={getListingTypeVariant(listing.listingType)} className="shrink-0 text-xs">
                  {getListingTypeText(listing.listingType)}
                </Badge>
              </div>

              <div className="mb-2 sm:mb-3">
                {listing.listingType === "sell" && listing.price ? (
                  <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-xl sm:text-2xl font-bold text-primary">{listing.price.toLocaleString()}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{listing.currency}</span>
                    {listing.negotiable && <span className="text-xs text-muted-foreground">/ kelishuv</span>}
                  </div>
                ) : (
                  <span className="text-base sm:text-lg font-semibold text-muted-foreground">
                    {getListingTypeText(listing.listingType)}
                  </span>
                )}
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {listing.quantity} {listing.unit}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                <span className="truncate">
                  {listing.region}, {listing.district}
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
