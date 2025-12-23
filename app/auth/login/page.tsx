"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { LogIn, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, validate credentials here
    if (email && password) {
      // Save authentication status
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userName", email.split("@")[0] || "Foydalanuvchi")
      
      toast.success("Muvaffaqiyatli kirildi!")
      // In real app, save auth token and redirect
      router.push("/profile")
      router.refresh() // Refresh to update header
    } else {
      toast.error("Email yoki parol noto'g'ri")
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-xl font-bold">X</span>
            </div>
            <span className="text-xl font-bold text-foreground">Xirmon Market</span>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Tizimga kirish</CardTitle>
            <CardDescription>Hisobingizga kiring va e'lonlarni boshqaring</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Parolingizni kiriting"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="h-4 w-4 rounded border-border" />
                  <label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    Eslab qolish
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-primary hover:underline">
                  Parolni unutdingizmi?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Kirilmoqda..." : "Kirish"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Hisobingiz yo'qmi? </span>
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                Ro'yxatdan o'tish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

