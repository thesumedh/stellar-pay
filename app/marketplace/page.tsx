import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace-grid"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">Discover premium content from creators worldwide</p>
        </div>

        <div className="flex gap-8">
          <MarketplaceFilters />
          <div className="flex-1">
            <MarketplaceGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
