"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { TransactionHistory } from "@/components/transaction-history"
import { BarChart3, History } from "lucide-react"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "transactions">("analytics")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Analytics & Transactions</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("analytics")}
            variant={activeTab === "analytics" ? "default" : "outline"}
            className={`gap-2 ${activeTab === "analytics" ? "bg-primary hover:bg-primary/90" : ""}`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Button>
          <Button
            onClick={() => setActiveTab("transactions")}
            variant={activeTab === "transactions" ? "default" : "outline"}
            className={`gap-2 ${activeTab === "transactions" ? "bg-primary hover:bg-primary/90" : ""}`}
          >
            <History className="w-4 h-4" />
            Transaction History
          </Button>
        </div>

        {/* Content */}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "transactions" && <TransactionHistory />}
      </main>
    </div>
  )
}
