"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Zap, Wallet, Copy, CheckCircle2, AlertCircle } from "lucide-react"

export default function WalletSetupPage() {
  const [step, setStep] = useState(1)
  const [walletAddress, setWalletAddress] = useState("")
  const [copied, setCopied] = useState(false)

  const handleConnectFreighter = async () => {
    // TODO: Implement Freighter wallet connection
    // This will be handled by the user's backend
    console.log("Connecting to Freighter wallet...")
    // Simulated wallet address for demo
    setWalletAddress("GBRPYHIL2CI3WHZDTOOQFC6EB4RRJC3XNRBF3LGYXMFNQ5BNHXVXVXV")
    setStep(2)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFundWallet = () => {
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">StellarPay</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card className="p-8 border-primary/10">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Connect Your Wallet</h1>
                <p className="text-muted-foreground">Use Freighter to connect your Stellar wallet</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">What is Freighter?</p>
                    <p className="text-sm text-muted-foreground">
                      Freighter is a browser extension wallet for Stellar. It securely manages your private keys and
                      enables seamless transactions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleConnectFreighter}
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6 gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Freighter Wallet
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Don't have Freighter?{" "}
                  <a
                    href="https://www.freighter.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Install it here
                  </a>
                </p>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 border-primary/10">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Wallet Connected!</h1>
                <p className="text-muted-foreground">Your Stellar wallet is ready to use</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <p className="text-sm text-muted-foreground">Your Wallet Address:</p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-background px-3 py-2 rounded text-sm text-foreground break-all font-mono">
                    {walletAddress}
                  </code>
                  <Button
                    onClick={handleCopyAddress}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-primary">Copied to clipboard!</p>}
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Your wallet is now connected. You can start uploading content and receiving payments immediately.
                </p>
              </div>

              <Button onClick={handleFundWallet} className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                Continue to Dashboard
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 border-primary/10">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">All Set!</h1>
                <p className="text-muted-foreground">You're ready to start earning</p>
              </div>

              <div className="space-y-3">
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Go to Dashboard</Button>
                </Link>
                <Link href="/marketplace" className="block">
                  <Button variant="outline" className="w-full text-lg py-6 bg-transparent">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
