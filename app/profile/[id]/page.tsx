"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { Star, MessageCircle, Share2, Heart } from "lucide-react"
import Image from "next/image"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const creator = {
    id: params.id,
    name: "Alex Chen",
    avatar: "/placeholder-user.jpg",
    bio: "Full-stack developer and content creator. Passionate about React, TypeScript, and teaching.",
    followers: 12450,
    rating: 4.8,
    reviews: 234,
    totalEarnings: 45230,
    joinDate: "Jan 2024",
    website: "https://alexchen.dev",
  }

  const content = [
    { id: 1, title: "React Advanced Patterns", price: 0.99, rating: 4.8, reviews: 234, image: "/react-tutorial.jpg" },
    {
      id: 2,
      title: "Performance Optimization",
      price: 0.79,
      rating: 4.7,
      reviews: 189,
      image: "/performance-guide.jpg",
    },
    { id: 3, title: "TypeScript Complete", price: 1.29, rating: 4.9, reviews: 567, image: "/typescript-tutorial.jpg" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <Card className="p-8 border-primary/10 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Image
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.name}
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{creator.name}</h1>
              <p className="text-muted-foreground mb-4">{creator.bio}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <p className="text-2xl font-bold text-primary">{creator.followers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{creator.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating ({creator.reviews} reviews)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">${creator.totalEarnings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Earnings</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Heart className="w-4 h-4" />
                  Follow
                </Button>
                <Button variant="outline" className="bg-transparent gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
                <Button variant="outline" className="bg-transparent gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Content</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.map((item) => (
              <Card key={item.id} className="overflow-hidden border-primary/10 hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-muted overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Buy
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
