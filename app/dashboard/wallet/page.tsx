"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Send, Download, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [copied, setCopied] = useState(false)
  const walletAddress = "GBRPYHIL2CI3WHZDTOOQFC6EB4RRJC3XNRBF3LGYXMFNQ5BNHXVXVXV"
  const balance = 2450.5
  const xlmBalance = 1225.25

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
              <p className="text-muted-foreground">Manage your Stellar wallet and funds</p>
            </div>

            {/* Wallet Balance Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Total Balance</h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-4xl font-bold text-foreground">
                    {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {showBalance ? `${xlmBalance.toFixed(2)} XLM` : "••••••"}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 gap-2">
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent gap-2">
                    <Download className="w-4 h-4" />
                    Receive
                  </Button>
                </div>
              </div>
            </Card>

            {/* Wallet Address */}
            <Card className="p-6 border-primary/10">
              <h3 className="font-semibold text-foreground mb-4">Wallet Address</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Your Stellar public address</p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-muted px-4 py-3 rounded-lg text-sm text-foreground break-all font-mono">
                    {walletAddress}
                  </code>
                  <Button onClick={handleCopy} variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-primary">Copied to clipboard!</p>}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-primary/10">
                <h3 className="font-semibold text-foreground mb-4">Add Funds</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Transfer XLM from another wallet or exchange to your StellarPay wallet
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">Add Funds</Button>
              </Card>

              <Card className="p-6 border-primary/10">
                <h3 className="font-semibold text-foreground mb-4">Withdraw</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Withdraw your earnings to an external Stellar wallet
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Withdraw Funds
                </Button>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="p-6 border-primary/10">
              <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { type: "Received", amount: "+$12.50", date: "2 hours ago", status: "Completed" },
                  { type: "Received", amount: "+$8.75", date: "5 hours ago", status: "Completed" },
                  { type: "Sent", amount: "-$25.00", date: "1 day ago", status: "Completed" },
                  { type: "Received", amount: "+$15.00", date: "2 days ago", status: "Completed" },
                ].map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{txn.type}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${txn.type === "Received" ? "text-primary" : "text-foreground"}`}
                      >
                        {txn.amount}
                      </p>
                      <p className="text-xs text-primary">{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
