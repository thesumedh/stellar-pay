"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const products = [
  {
    id: 1,
    title: "React Advanced Patterns",
    creator: "Alex Chen",
    price: 0.99,
    rating: 4.8,
    reviews: 234,
    views: 5420,
    image: "/react-tutorial.jpg",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "UI Design Masterclass",
    creator: "Sarah Design",
    price: 1.49,
    rating: 4.9,
    reviews: 456,
    views: 8920,
    image: "/design-course.jpg",
    category: "Course",
  },
  {
    id: 3,
    title: "Performance Optimization Guide",
    creator: "Dev Pro",
    price: 0.79,
    rating: 4.7,
    reviews: 189,
    views: 3450,
    image: "/performance-guide.jpg",
    category: "Guide",
  },
  {
    id: 4,
    title: "TypeScript Complete Guide",
    creator: "Code Master",
    price: 1.29,
    rating: 4.9,
    reviews: 567,
    views: 12340,
    image: "/typescript-tutorial.jpg",
    category: "Tutorial",
  },
  {
    id: 5,
    title: "Next.js 15 Essentials",
    creator: "Web Dev",
    price: 0.99,
    rating: 4.8,
    reviews: 345,
    views: 7890,
    image: "/nextjs-guide.jpg",
    category: "Course",
  },
  {
    id: 6,
    title: "CSS Grid & Flexbox",
    creator: "Design Dev",
    price: 0.59,
    rating: 4.6,
    reviews: 234,
    views: 4560,
    image: "/css-tutorial.jpg",
    category: "Tutorial",
  },
]

export function MarketplaceGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden border-primary/10 hover:shadow-lg transition-shadow">
          {/* Image */}
          <div className="relative h-40 bg-muted overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur rounded-lg hover:bg-background transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
              />
            </button>
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2">{product.title}</h3>
              <p className="text-xs text-muted-foreground">by {product.creator}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
              <span className="text-xs text-muted-foreground ml-auto">{product.views.toLocaleString()} views</span>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
                <ShoppingCart className="w-4 h-4" />
                Buy
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
