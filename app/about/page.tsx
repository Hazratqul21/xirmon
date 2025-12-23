import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Shield, TrendingUp, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Keng auditoriya",
      description: "Minglab fermerlar va xaridorlar bilan bog'laning",
    },
    {
      icon: Shield,
      title: "Xavfsiz savdo",
      description: "To'liq xavfsizlik va ishonchlilik kafolati",
    },
    {
      icon: TrendingUp,
      title: "O'sish imkoniyati",
      description: "Biznesingizni rivojlantirish uchun qulay platforma",
    },
  ]

  const stats = [
    { value: "10,000+", label: "Faol foydalanuvchi" },
    { value: "50,000+", label: "Joylashtrilgan e'lon" },
    { value: "14", label: "Viloyatda faol" },
    { value: "99%", label: "Mijoz qanoati" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              Xirmon Market haqida
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance px-2">
              Biz O'zbekiston qishloq xo'jaligi sektorini modernizatsiya qilish va fermerlar bilan xaridorlarni
              birlashtirishga intilamiz. Platformamiz orqali mahsulotlarni oson va tezkor sotish hamda sotib olish
              imkoniyatini yaratdik.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Bizning maqsadimiz</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Xirmon Market - bu O'zbekiston qishloq xo'jaligi mahsulotlari uchun eng ishonchli onlayn bozor.
                2024-yilda tashkil etilgan platformamiz fermerlar, tadbirkorlar va xaridorlar o'rtasida
                to'g'ridan-to'g'ri aloqa o'rnatishga yordam beradi.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Biz mahalliy ishlab chiqaruvchilarni qo'llab-quvvatlash va sifatli mahsulotlarni yetkazib berishda muhim
                rol o'ynaymiz. Platformamiz orqali har bir fermer o'z mahsulotini millionlab potentsial xaridorlarga
                taqdim etish imkoniyatiga ega.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <img src="/uzbekistan-agriculture-farming-fields.jpg" alt="Qishloq xo'jaligi" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">Nima uchun Xirmon Market?</h2>
            <p className="text-muted-foreground text-balance">Bizning afzalliklarimiz</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">Bizning qadriyatlarimiz</h2>
            <p className="text-muted-foreground text-balance">Biz nima uchun ishlaymiz</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              "Fermerlarni qo'llab-quvvatlash va ularning mehnatini qadrlash",
              "Sifatli va ekologik toza mahsulotlarni targ'ib qilish",
              "Ishonch va ochiqlik asosida ishlash",
              "Innovatsion texnologiyalar orqali qulaylik yaratish",
              "Mahalliy iqtisodiyotni rivojlantirishga hissa qo'shish",
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-primary mt-0.5" />
                <p className="text-foreground leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3">Biz bilan bog'laning</h2>
              <p className="text-muted-foreground text-balance">
                Savollaringiz bormi? Biz sizga yordam berishga tayyormiz
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Telefon</h3>
                  <p className="text-sm text-muted-foreground">+998 71 123 45 67</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">info@xirmon.uz</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Manzil</h3>
                  <p className="text-sm text-muted-foreground">Toshkent, O'zbekiston</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/listings/create">E'lon joylashtirish</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
