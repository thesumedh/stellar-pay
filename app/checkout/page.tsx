"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { sendPaymentWithFreighter, isFreighterInstalled } from "@/lib/freighter-utils"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const cartItems = [
    { id: 1, title: "React Advanced Patterns", price: 0.99, quantity: 1 },
    { id: 2, title: "UI Design Masterclass", price: 1.49, quantity: 1 },
    { id: 3, title: "TypeScript Complete Guide", price: 1.29, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const fee = subtotal * 0.001
  const total = subtotal + fee

  const handleFreighterPayment = async () => {
    try {
      setLoading(true)
      setError("")

      if (!isFreighterInstalled()) {
        setError("Freighter wallet not installed. Please install it first.")
        return
      }

      // Send payment for each item
      for (const item of cartItems) {
        await sendPaymentWithFreighter(
          "GBRPYHIL2CI3WHZDTOOQFC6EB4RRJC3XNRBF3LGYXMFNQ5BNHXVXVXV", // Demo recipient
          item.price.toString(),
          `StellarPay: ${item.title}`,
        )
      }

      setStep(3)
    } catch (err: any) {
      console.error("[v0] Payment error:", err)
      setError(err.message || "Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
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

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {step === 1 && (
              <Card className="p-8 border-primary/10">
                <h1 className="text-2xl font-bold text-foreground mb-6">Review Order</h1>

                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                  className="space-y-6"
                >
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      You'll be prompted to confirm this transaction with your Freighter wallet
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    Continue to Payment
                  </Button>
                </form>

                <Link
                  href="/marketplace"
                  className="flex items-center gap-2 justify-center text-sm text-primary hover:underline mt-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Marketplace
                </Link>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-8 border-primary/10">
                <h1 className="text-2xl font-bold text-foreground mb-6">Confirm Payment</h1>

                <div className="space-y-6">
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Payment Error</p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Freighter Wallet Required</p>
                      <p className="text-sm text-muted-foreground">
                        Click the button below to open Freighter and confirm the transaction
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleFreighterPayment}
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6 gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Open Freighter to Pay
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Freighter will open in a new window. Please approve the transaction to complete your purchase.
                  </p>

                  <button
                    onClick={() => {
                      setStep(1)
                      setError("")
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 justify-center text-sm text-primary hover:underline w-full disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card className="p-8 border-primary/10 text-center">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground">Your content is now available for download</p>
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Go to Dashboard</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-primary/10 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="text-foreground">${fee.toFixed(4)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Powered by Stellar • Instant Settlement</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
