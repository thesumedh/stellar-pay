"use client"

import React, { useState } from "react"
import { useAccount } from "@/hooks/useAccount"
import { useIsMounted } from "@/hooks/useIsMounted"
import { ConnectButton } from "@/components/atoms/connect-button"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function WalletData() {
  const mounted = useIsMounted()
  const account = useAccount()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const sendToCreator = async () => {
    if (!account || !amount) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/stellar/build-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderPublicKey: account.publicKey,
          recipientPublicKey: "GANG3GZKNCPZ5GX2HUQJTMUWJORQJ5XJMLLHFNNUW3GX4IHOGIF4IOXA",
          amount: amount,
          memo: "StellarPay Transaction"
        })
      })
      
      const { xdr } = await response.json()
      
      const signedXdr = await (window as any).freighter.signTransaction(xdr, {
        network: "TESTNET"
      })
      
      const submitResponse = await fetch('/api/stellar/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xdr: signedXdr })
      })
      
      const result = await submitResponse.json()
      
      if (result.success) {
        alert(`Transaction successful! Hash: ${result.transactionHash}`)
        setAmount("")
      }
    } catch (error: any) {
      alert(`Transaction failed: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <>
      {mounted && account ? (
        <Card className="p-4 bg-slate-800/30 border-slate-700/50 min-w-[300px]">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Connected Wallet</p>
              <p className="font-mono text-white text-xs">{account.displayName}</p>
            </div>
            
            <div className="space-y-2">
              <Input
                type="number"
                step="0.0000001"
                placeholder="Amount (XLM)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-700/50 border-slate-600"
              />
              <Button 
                onClick={sendToCreator}
                disabled={!amount || loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send to Creator"}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <ConnectButton label="Connect Wallet" />
      )}
    </>
  )
}