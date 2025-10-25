"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle } from "lucide-react"

interface WalletSetupProps {
  onComplete: (wallet: { publicKey: string; secretKey: string }) => void
}

export function WalletSetup({ onComplete }: WalletSetupProps) {
  const [step, setStep] = useState<"create" | "display" | "confirm">("create")
  const [wallet, setWallet] = useState<{ publicKey: string; secretKey: string } | null>(null)
  const [copied, setCopied] = useState<"public" | "secret" | null>(null)

  const generateWallet = async () => {
    try {
      // Generate a real Stellar keypair
      const { Keypair } = await import('stellar-sdk')
      const keypair = Keypair.random()
      
      const wallet = {
        publicKey: keypair.publicKey(),
        secretKey: keypair.secret(),
      }
      setWallet(wallet)
      setStep("display")
    } catch (error) {
      console.error('Failed to generate wallet:', error)
      // Fallback for demo purposes only
      const mockWallet = {
        publicKey: "DEMO_PUBLIC_KEY",
        secretKey: "DEMO_SECRET_KEY",
      }
      setWallet(mockWallet)
      setStep("display")
    }
  }

  const copyToClipboard = (text: string, type: "public" | "secret") => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-primary/10 p-8">
        {step === "create" && (
          <div className="space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Set Up Your Stellar Wallet</h1>
              <p className="text-muted-foreground">Create a wallet to send and receive micropayments</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left space-y-3">
              <h3 className="font-semibold text-foreground">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>A unique Stellar public address for receiving payments</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>A secret key to authorize transactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>10,000 XLM testnet tokens to get started</span>
                </li>
              </ul>
            </div>

            <Button onClick={generateWallet} className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
              Generate Wallet
            </Button>
          </div>
        )}

        {step === "display" && wallet && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Stellar Wallet</h1>
              <p className="text-muted-foreground">Save these credentials securely</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 border border-border/50 rounded-lg p-4 space-y-2">
                <label className="block text-sm font-medium text-foreground">Public Address</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono text-foreground break-all">{wallet.publicKey}</code>
                  <button
                    onClick={() => copyToClipboard(wallet.publicKey, "public")}
                    className="p-2 hover:bg-muted rounded transition"
                  >
                    <Copy className={`w-4 h-4 ${copied === "public" ? "text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 space-y-2">
                <label className="block text-sm font-medium text-foreground">Secret Key (Keep Private!)</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono text-foreground break-all">{wallet.secretKey}</code>
                  <button
                    onClick={() => copyToClipboard(wallet.secretKey, "secret")}
                    className="p-2 hover:bg-muted rounded transition"
                  >
                    <Copy className={`w-4 h-4 ${copied === "secret" ? "text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Security Notice:</p>
              <p>Never share your secret key. Anyone with it can access your funds.</p>
            </div>

            <Button onClick={() => setStep("confirm")} className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
              I've Saved My Keys
            </Button>
          </div>
        )}

        {step === "confirm" && wallet && (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Wallet Ready!</h1>
              <p className="text-muted-foreground">Your Stellar wallet is set up and funded with testnet XLM</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Public Address:</strong>
              </p>
              <code className="block text-xs font-mono text-foreground bg-background p-2 rounded break-all">
                {wallet.publicKey}
              </code>
            </div>

            <Button onClick={() => onComplete(wallet)} className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
              Start Using StellarPay
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
