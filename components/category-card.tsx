import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  icon: string
  slug: string
}

export function CategoryCard({ name, icon, slug }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${slug}`}>
      <Card className="group hover:shadow-md hover:border-primary transition-all cursor-pointer h-full">
        <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{icon}</div>
          <h3 className="font-medium text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors text-balance leading-tight">
            {name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
