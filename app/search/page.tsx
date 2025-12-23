"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ListingCard } from "@/components/listing-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockListings, categories, regions, currencies, type Listing } from "@/lib/mock-data"
import { SlidersHorizontal, X } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [selectedListingType, setSelectedListingType] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [priceCurrency, setPriceCurrency] = useState("UZS")
  const [negotiableOnly, setNegotiableOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  
  const districts = regions.find((r) => r.name === selectedRegion)?.districts || []

  // Filter and search logic
  const filteredListings = useMemo(() => {
    let filtered: Listing[] = [...mockListings]

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.category.toLowerCase().includes(query) ||
          listing.region.toLowerCase().includes(query) ||
          listing.district.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      const category = categories.find((c) => c.slug === selectedCategory)
      if (category) {
        filtered = filtered.filter((listing) => listing.category === category.name)
      }
    }

    // Listing type filter
    if (selectedListingType !== "all") {
      filtered = filtered.filter((listing) => listing.listingType === selectedListingType)
    }

    // Region filter
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter((listing) => listing.region === selectedRegion)
    }

    // District filter
    if (selectedDistrict && selectedDistrict !== "all") {
      filtered = filtered.filter((listing) => listing.district === selectedDistrict)
    }

    // Price filter
    if (priceMin || priceMax) {
      filtered = filtered.filter((listing) => {
        if (listing.listingType !== "sell" || !listing.price) return false
        if (listing.currency !== priceCurrency) return false
        
        const price = listing.price
        if (priceMin && price < Number(priceMin)) return false
        if (priceMax && price > Number(priceMax)) return false
        return true
      })
    }

    // Negotiable filter
    if (negotiableOnly) {
      filtered = filtered.filter((listing) => listing.negotiable)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "price-asc":
          if (!a.price || !b.price) return 0
          return a.price - b.price
        case "price-desc":
          if (!a.price || !b.price) return 0
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [
    searchQuery,
    selectedCategory,
    selectedListingType,
    selectedRegion,
    selectedDistrict,
    priceMin,
    priceMax,
    priceCurrency,
    negotiableOnly,
    sortBy,
  ])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedListingType("all")
    setSelectedRegion("")
    setSelectedDistrict("")
    setPriceMin("")
    setPriceMax("")
    setNegotiableOnly(false)
    setSortBy("newest")
  }

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedListingType !== "all" ||
    selectedRegion ||
    priceMin ||
    priceMax ||
    negotiableOnly

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Barcha e'lonlar</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Jami {filteredListings.length} ta e'lon topildi
          {filteredListings.length !== mockListings.length && ` (${mockListings.length} tadan)`}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Filter Button and Modal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtrlar
                  {hasActiveFilters && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {[
                        searchQuery,
                        selectedCategory !== "all",
                        selectedListingType !== "all",
                        selectedRegion,
                        priceMin || priceMax,
                        negotiableOnly,
                      ].filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Filtrlar</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  {/* Search Query */}
                  <div className="space-y-2">
                    <Label htmlFor="search-modal" className="text-foreground">
                      Qidirish
                    </Label>
                <div className="relative">
                    <div className="relative">
                      <Input
                        id="search-modal"
                        type="text"
                        placeholder="Mahsulot nomi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-8"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="category-modal" className="text-foreground">
                      Kategoriya
                    </Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category-modal" className="w-full">
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barchasi</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Listing Type Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="listingType-modal" className="text-foreground">
                      E'lon turi
                    </Label>
                    <Select value={selectedListingType} onValueChange={setSelectedListingType}>
                      <SelectTrigger id="listingType-modal" className="w-full">
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barchasi</SelectItem>
                        <SelectItem value="sell">Sotish</SelectItem>
                        <SelectItem value="barter">Ayirboshlash</SelectItem>
                        <SelectItem value="free">Bepul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Region Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="region-modal" className="text-foreground">
                      Viloyat
                    </Label>
                    <Select
                      value={selectedRegion}
                      onValueChange={(value) => {
                        setSelectedRegion(value)
                        setSelectedDistrict("")
                      }}
                    >
                      <SelectTrigger id="region-modal" className="w-full">
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Barchasi</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* District Filter */}
                  {selectedRegion && selectedRegion !== "all" && (
                    <div className="space-y-2">
                      <Label htmlFor="district-modal" className="text-foreground">
                        Tuman/Shahar
                      </Label>
                      <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                        <SelectTrigger id="district-modal" className="w-full">
                          <SelectValue placeholder="Tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Barchasi</SelectItem>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-foreground">Narx oralig'i</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Dan"
                        className="w-full flex-1"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Gacha"
                        className="w-full flex-1"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                      />
                    </div>
                    <Select value={priceCurrency} onValueChange={setPriceCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Valyuta" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negotiable-modal"
                        checked={negotiableOnly}
                        onCheckedChange={(checked) => setNegotiableOnly(checked === true)}
                      />
                      <label
                        htmlFor="negotiable-modal"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer"
                      >
                        Faqat kelishuv asosida
                      </label>
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <Label htmlFor="sort-modal" className="text-foreground">
                      Saralash
                    </Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-modal" className="w-full">
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Eng yangi</SelectItem>
                        <SelectItem value="price-asc">Narx: Arzondan qimmmatga</SelectItem>
                        <SelectItem value="price-desc">Narx: Qimmatdan arzonga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        clearFilters()
                        setIsFilterOpen(false)
                      }}
                      className="w-full bg-transparent"
                    >
                      Filtrlarni tozalash
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">

          {filteredListings.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-xl font-semibold text-foreground mb-2">E'lonlar topilmadi</p>
              <p className="text-muted-foreground mb-4">
                Filtrlarni o'zgartiring yoki boshqa so'rov kiriting
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Filtrlarni tozalash
              </Button>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" disabled>
              Oldingi
            </Button>
            <Button variant="default" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Keyingi</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
