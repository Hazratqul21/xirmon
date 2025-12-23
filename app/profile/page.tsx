"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListingCard } from "@/components/listing-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockListings } from "@/lib/mock-data"
import { User, Settings, Heart, Package, LogOut, Edit, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("listings")
  const [user, setUser] = useState({
    name: "Aziz Rahimov",
    email: "aziz@example.com",
    phone: "+998 90 123 45 67",
    region: "Samarqand",
    district: "Jomboy",
    avatar: "/placeholder-user.jpg",
  })

  useEffect(() => {
    // Get user data from localStorage
    const userName = localStorage.getItem("userName")
    if (userName) {
      setUser((prev) => ({ ...prev, name: userName }))
    }
  }, [])

  // Mock user's listings
  const userListings = mockListings.filter((l) => l.contactName === user.name)
  const favoriteListings = mockListings.slice(0, 3) // Mock favorites

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    toast.success("Tizimdan chiqildi")
    router.push("/")
    router.refresh() // Refresh to update header
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">{user.name}</h1>
                  <Badge variant="secondary" className="w-fit">Faol</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {user.region}, {user.district}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Tahrirlash
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full sm:w-auto">
                  <LogOut className="mr-2 h-4 w-4" />
                  Chiqish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 mb-4 sm:mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{userListings.length}</p>
                  <p className="text-xs text-muted-foreground">E'lonlar</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{favoriteListings.length}</p>
                  <p className="text-xs text-muted-foreground">Sevimlilar</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Sotilgan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-xs text-muted-foreground">Reyting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">Mening e'lonlarim</TabsTrigger>
            <TabsTrigger value="favorites">Sevimlilar</TabsTrigger>
            <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Mening e'lonlarim</h2>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/listings/create">
                  <Package className="mr-2 h-4 w-4" />
                  Yangi e'lon
                </Link>
              </Button>
            </div>
            {userListings.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {userListings.map((listing) => (
                  <div key={listing.id} className="relative">
                    <ListingCard listing={listing} />
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-3 w-3" />
                        Tahrirlash
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        O'chirish
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">E'lonlar yo'q</h3>
                  <p className="text-muted-foreground mb-4">Hali birorta e'lon joylashtirmadingiz</p>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/listings/create">Birinchi e'lonni joylashtirish</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sevimli e'lonlar</h2>
            {favoriteListings.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sevimlilar yo'q</h3>
                  <p className="text-muted-foreground">Hali birorta e'loni sevimlilarga qo'shmadingiz</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sozlamalar</CardTitle>
                <CardDescription>Hisobingiz sozlamalarini boshqaring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Shaxsiy ma'lumotlar</h3>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Ma'lumotlarni tahrirlash
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Xavfsizlik</h3>
                  <Button variant="outline" className="w-full">
                    Parolni o'zgartirish
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Bildirishnomalar</h3>
                  <Button variant="outline" className="w-full">
                    Bildirishnomalarni sozlash
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

