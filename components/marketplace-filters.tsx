"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function MarketplaceFilters() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("category")

  const categories = [
    { name: "Tutorials", count: 245 },
    { name: "Courses", count: 189 },
    { name: "Templates", count: 156 },
    { name: "Design Assets", count: 342 },
    { name: "Code Snippets", count: 421 },
  ]

  const priceRanges = [
    { label: "Under $0.10", value: "0-0.1" },
    { label: "$0.10 - $0.50", value: "0.1-0.5" },
    { label: "$0.50 - $1.00", value: "0.5-1" },
    { label: "$1.00+", value: "1+" },
  ]

  return (
    <aside className="w-64 space-y-4 hidden lg:block">
      {/* Categories */}
      <Card className="p-4 border-primary/10">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "category" ? null : "category")}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-foreground">Categories</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedCategory === "category" ? "rotate-180" : ""}`}
          />
        </button>
        {expandedCategory === "category" && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-sm text-muted-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Price Range */}
      <Card className="p-4 border-primary/10">
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" className="rounded-full border-input" />
              <span className="text-sm text-muted-foreground">{range.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Rating */}
      <Card className="p-4 border-primary/10">
        <h3 className="font-semibold text-foreground mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((stars) => (
            <label key={stars} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input" />
              <span className="text-sm text-muted-foreground">
                {"★".repeat(stars)}
                {"☆".repeat(5 - stars)}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full bg-transparent">
        Clear Filters
      </Button>
    </aside>
  )
}
