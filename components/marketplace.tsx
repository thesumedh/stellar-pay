"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Search, ShoppingCart, Heart } from "lucide-react"

const contentItems = [
  {
    id: 1,
    title: "Advanced React Patterns",
    creator: "Sarah Chen",
    price: 0.99,
    rating: 4.8,
    reviews: 234,
    views: 5420,
    category: "Tutorial",
    image: "/react-tutorial.jpg",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    creator: "Alex Rivera",
    price: 1.49,
    rating: 4.9,
    reviews: 512,
    views: 8932,
    category: "Course",
    image: "/design-course.jpg",
  },
  {
    id: 3,
    title: "Web Performance Optimization",
    creator: "Jordan Lee",
    price: 0.79,
    rating: 4.7,
    reviews: 189,
    views: 3421,
    category: "Guide",
    image: "/performance-guide.jpg",
  },
  {
    id: 4,
    title: "TypeScript Deep Dive",
    creator: "Morgan Smith",
    price: 1.29,
    rating: 4.9,
    reviews: 421,
    views: 6234,
    category: "Tutorial",
    image: "/typescript-tutorial.jpg",
  },
  {
    id: 5,
    title: "Next.js 15 Complete Guide",
    creator: "Casey Johnson",
    price: 1.99,
    rating: 4.8,
    reviews: 678,
    views: 12543,
    category: "Course",
    image: "/nextjs-guide.jpg",
  },
  {
    id: 6,
    title: "CSS Grid & Flexbox Secrets",
    creator: "Taylor Brown",
    price: 0.59,
    rating: 4.6,
    reviews: 145,
    views: 2891,
    category: "Tutorial",
    image: "/css-tutorial.jpg",
  },
]

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = ["All", "Tutorial", "Course", "Guide"]

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id])
  }

  const cartTotal = cart.reduce((sum, id) => {
    const item = contentItems.find((c) => c.id === id)
    return sum + (item?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Content Marketplace</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative bg-transparent">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button className="bg-primary hover:bg-primary/90 relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search content, creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-primary hover:bg-primary/90" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredContent.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="relative h-40 bg-muted overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition"
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.includes(item.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">by {item.creator}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div>
                    <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{item.views.toLocaleString()} views</p>
                  </div>
                  <Button onClick={() => addToCart(item.id)} className="bg-primary hover:bg-primary/90" size="sm">
                    Buy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="p-6 border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 sticky bottom-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
                </p>
                <p className="text-3xl font-bold text-foreground">${cartTotal.toFixed(2)}</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">Proceed to Checkout</Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
