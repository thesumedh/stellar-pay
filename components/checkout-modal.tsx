"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFreighter } from "@/hooks/useFreighter"
import { X, Loader2, CheckCircle, Wallet } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: Array<{ id: number; title: string; price: number }>
  total: number
}

export function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const [step, setStep] = useState<"payment" | "processing" | "success">("payment")
  const [error, setError] = useState<string | null>(null)
  const { isConnected, publicKey, connect, sendPayment, isLoading } = useFreighter()

  const handlePayment = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    setStep("processing")
    setError(null)

    try {
      // Send to your real testnet wallet
      const recipientKey = "GANG3GZKNCPZ5GX2HUQJTMUWJORQJ5XJMLLHFNNUW3GX4IHOGIF4IOXA"
      const result = await sendPayment(
        recipientKey,
        total.toString(),
        `StellarPay: ${items.map(i => i.title).join(', ')}`
      )
      
      if (result.success) {
        setStep("success")
      }
    } catch (err: any) {
      setError(err.message)
      setStep("payment")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/10">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Checkout</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === "payment" && (
            <>
              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.title}</span>
                    <span className="text-foreground font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border/50 pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Payment Method</h3>
                {isConnected ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-800">Freighter Connected</span>
                    </div>
                    <code className="text-xs text-green-700 break-all">{publicKey}</code>
                  </div>
                ) : (
                  <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                    <Wallet className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">Connect Freighter wallet to continue</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Payment Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                <p className="text-muted-foreground mb-2">
                  <strong>Network Fee:</strong> ~0.00001 XLM
                </p>
                <p className="text-muted-foreground">
                  <strong>Platform Fee:</strong> 0.1% (${(total * 0.001).toFixed(4)})
                </p>
              </div>

              <Button 
                onClick={handlePayment} 
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 py-6 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : isConnected ? (
                  `Pay ${total.toFixed(2)} XLM with Stellar`
                ) : (
                  'Connect Freighter Wallet'
                )}
              </Button>
            </>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-foreground font-medium">Processing payment...</p>
              <p className="text-sm text-muted-foreground">This usually takes 2-5 seconds</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CheckCircle className="w-12 h-12 text-primary" />
              <p className="text-foreground font-medium text-lg">Payment Successful!</p>
              <p className="text-sm text-muted-foreground text-center">
                Your content is now available. Check your dashboard for details.
              </p>
              <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 py-6 text-base">
                Done
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
