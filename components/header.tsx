"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, User, Plus, LogIn, UserPlus, LogOut, Settings, Heart } from "lucide-react"
import { toast } from "sonner"

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if user is authenticated (in real app, check token from localStorage or context)
    const authStatus = localStorage.getItem("isAuthenticated")
    const user = localStorage.getItem("userName")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setUserName(user || "Foydalanuvchi")
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/search")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    setIsAuthenticated(false)
    setUserName("")
    toast.success("Tizimdan chiqildi")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-3 sm:px-4">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <span className="text-lg sm:text-xl font-bold">X</span>
          </div>
          <span className="text-base sm:text-xl font-bold text-foreground truncate">Xirmon Market</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Bosh sahifa
          </Link>
          <Link href="/search" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            E'lonlar
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Biz haqimizda
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <form onSubmit={handleSearch} className="hidden lg:flex relative w-48 xl:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidirish..."
              className="pl-9 bg-muted border-0 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">Profil</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mening profilim</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=favorites" className="flex items-center cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Sevimlilar</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Sozlamalar</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Chiqish</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Hisob</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="flex items-center cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Tizimga kirish</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register" className="flex items-center cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Ro'yxatdan o'tish</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile User Button */}
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" className="md:hidden" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="md:hidden" asChild>
              <Link href="/auth/login">
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          )}

          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-4">
            <Link href="/listings/create" className="flex items-center">
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">E'lon berish</span>
              <span className="sm:hidden">E'lon</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
