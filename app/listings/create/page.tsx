"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { categories, regions, units, currencies } from "@/lib/mock-data"
import { Upload, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function CreateListingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [listingType, setListingType] = useState("sell")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [title, setTitle] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("UZS")
  const [negotiable, setNegotiable] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [description, setDescription] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  
  const districts = regions.find((r) => r.name === selectedRegion)?.districts || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!selectedCategory) {
      toast.error("Kategoriyani tanlang")
      setIsLoading(false)
      return
    }
    if (!title.trim()) {
      toast.error("Sarlavhani kiriting")
      setIsLoading(false)
      return
    }
    if (!quantity || Number(quantity) <= 0) {
      toast.error("To'g'ri miqdorni kiriting")
      setIsLoading(false)
      return
    }
    if (!unit) {
      toast.error("O'lchov birligini tanlang")
      setIsLoading(false)
      return
    }
    if (listingType === "sell" && (!price || Number(price) <= 0)) {
      toast.error("To'g'ri narxni kiriting")
      setIsLoading(false)
      return
    }
    if (!selectedRegion) {
      toast.error("Viloyatni tanlang")
      setIsLoading(false)
      return
    }
    if (!selectedDistrict) {
      toast.error("Tumanni tanlang")
      setIsLoading(false)
      return
    }
    if (!description.trim() || description.trim().length < 50) {
      toast.error("Tavsif kamida 50 ta belgidan iborat bo'lishi kerak")
      setIsLoading(false)
      return
    }
    if (!contactName.trim()) {
      toast.error("To'liq ismingizni kiriting")
      setIsLoading(false)
      return
    }
    if (!contactPhone.trim()) {
      toast.error("Telefon raqamingizni kiriting")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("E'lon muvaffaqiyatli joylashtirildi!")
    router.push("/search")
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Yangi e'lon joylashtirish</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Ma'lumotlarni to'ldiring va e'loningizni joylashtiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Listing Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>E'lon ma'lumotlari</CardTitle>
              <CardDescription>Asosiy ma'lumotlarni kiriting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Listing Type */}
              <div className="space-y-3">
                <Label>E'lon turi</Label>
                <RadioGroup value={listingType} onValueChange={setListingType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sell" id="sell" />
                    <Label htmlFor="sell" className="font-normal cursor-pointer">
                      Sotish
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="barter" id="barter" />
                    <Label htmlFor="barter" className="font-normal cursor-pointer">
                      Ayirboshlash
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="font-normal cursor-pointer">
                      Bepul
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategoriya *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Sarlavha *</Label>
                <Input
                  id="title"
                  placeholder="Masalan: Yuqori navli bug'doy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Quantity and Unit */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Miqdor *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">O'lchov birligi *</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price (only for sell type) */}
              {listingType === "sell" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Narx *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="1000000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Valyuta *</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={negotiable}
                      onCheckedChange={(checked) => setNegotiable(checked === true)}
                    />
                    <Label htmlFor="negotiable" className="font-normal cursor-pointer">
                      Kelishuv asosida
                    </Label>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card>
            <CardHeader>
              <CardTitle>Joylashuv</CardTitle>
              <CardDescription>Mahsulot joylashgan manzil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Davlat</Label>
                <Input id="country" value="O'zbekiston" disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Viloyat *</Label>
                <Select
                  value={selectedRegion}
                  onValueChange={(value) => {
                    setSelectedRegion(value)
                    setSelectedDistrict("")
                  }}
                >
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Viloyatni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.name}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRegion && (
                <div className="space-y-2">
                  <Label htmlFor="district">Tuman/Shahar *</Label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger id="district">
                      <SelectValue placeholder="Tumanni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tavsif</CardTitle>
              <CardDescription>Mahsulot haqida batafsil ma'lumot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Tavsif *</Label>
                <Textarea
                  id="description"
                  placeholder="Mahsulot haqida to'liq ma'lumot bering: sifati, yetishtirilish joyi, xususiyatlari..."
                  rows={6}
                  className="resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={50}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Kamida 50 ta belgi ({description.length}/50)
                </p>
              </div>

              <Button variant="outline" type="button" className="w-full bg-transparent">
                <Sparkles className="mr-2 h-4 w-4" />
                AI yordamida tavsif yaratish
              </Button>
            </CardContent>
          </Card>

          {/* Images Section */}
          <Card>
            <CardHeader>
              <CardTitle>Rasmlar</CardTitle>
              <CardDescription>Mahsulot rasmlarini yuklang (maksimal 5 ta)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Rasm {index}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">JPG, PNG. Maksimal 5MB</p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Aloqa ma'lumotlari</CardTitle>
              <CardDescription>Xaridorlar siz bilan bog'lanishi uchun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">To'liq ism *</Label>
                <Input
                  id="contactName"
                  placeholder="Ism Familiya"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telefon raqam *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email (ixtiyoriy)</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="example@mail.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.back()}
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Joylashtirilmoqda..." : "E'lonni joylashtirish"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            E'lon joylashtirish orqali siz{" "}
            <a href="/rules" className="text-primary hover:underline">
              foydalanish qoidalari
            </a>
            ga rozilik bildirasiz
          </p>
        </form>
      </div>
    </div>
  )
}
