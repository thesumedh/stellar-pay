"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Download } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  contentTitle: string
  creator: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  txHash: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "sent",
    amount: 0.99,
    contentTitle: "Advanced React Patterns",
    creator: "Sarah Chen",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed",
    txHash: "abc123def456",
  },
  {
    id: "2",
    type: "received",
    amount: 12.4,
    contentTitle: "Web Design Tips",
    creator: "You",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: "completed",
    txHash: "xyz789uvw012",
  },
  {
    id: "3",
    type: "sent",
    amount: 1.49,
    contentTitle: "UI/UX Design Masterclass",
    creator: "Alex Rivera",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "completed",
    txHash: "pqr345stu678",
  },
  {
    id: "4",
    type: "received",
    amount: 8.92,
    contentTitle: "React Hooks Guide",
    creator: "You",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "completed",
    txHash: "mno901jkl234",
  },
  {
    id: "5",
    type: "sent",
    amount: 0.79,
    contentTitle: "Web Performance Optimization",
    creator: "Jordan Lee",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed",
    txHash: "def567ghi890",
  },
]

export function TransactionHistory() {
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all")

  const filteredTransactions =
    filterType === "all" ? mockTransactions : mockTransactions.filter((tx) => tx.type === filterType)

  const totalSent = mockTransactions.filter((tx) => tx.type === "sent").reduce((sum, tx) => sum + tx.amount, 0)
  const totalReceived = mockTransactions.filter((tx) => tx.type === "received").reduce((sum, tx) => sum + tx.amount, 0)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-foreground">${totalSent.toFixed(2)}</p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-destructive opacity-20" />
          </div>
        </Card>

        <Card className="p-6 border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
              <p className="text-3xl font-bold text-foreground">${totalReceived.toFixed(2)}</p>
            </div>
            <ArrowDownLeft className="w-8 h-8 text-primary opacity-20" />
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-4 border-primary/10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {(["all", "sent", "received"] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
              className={filterType === type ? "bg-primary hover:bg-primary/90" : ""}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </Card>

      {/* Transaction List */}
      <Card className="border-primary/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Content</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Creator</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Hash</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tx.type === "sent" ? (
                        <ArrowUpRight className="w-5 h-5 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 text-primary" />
                      )}
                      <span className="text-sm font-medium text-foreground capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{tx.contentTitle}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tx.creator}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(tx.timestamp)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === "completed"
                          ? "bg-primary/10 text-primary"
                          : tx.status === "pending"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={`https://testnet.steexp.com/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-mono text-xs"
                    >
                      {tx.txHash.slice(0, 8)}...
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
