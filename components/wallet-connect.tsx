"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useFreighter } from "@/hooks/useFreighter"
import { useStellarAccount } from "@/hooks/useStellarAccount"
import { Wallet, ExternalLink, Copy, RefreshCw } from "lucide-react"

export function WalletConnect() {
  const { isInstalled, isConnected, publicKey, isLoading, error, connect, disconnect } = useFreighter()
  const { balance, fundAccount } = useStellarAccount(publicKey)
  const [copied, setCopied] = useState(false)

  const copyPublicKey = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleFundAccount = async () => {
    try {
      await fundAccount()
    } catch (error) {
      console.error('Funding failed:', error)
    }
  }

  if (!isInstalled) {
    return (
      <Card className="p-6 text-center">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Freighter Wallet Required</h3>
        <p className="text-muted-foreground mb-4">
          Install Freighter wallet to connect to Stellar network
        </p>
        <div className="space-y-3">
          <Button asChild>
            <a 
              href="https://freighter.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Install Freighter <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </Card>
    )
  }

  if (!isConnected) {
    return (
      <Card className="p-6 text-center">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-4">
          Connect Freighter to start making micropayments
        </p>
        <Button onClick={connect} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            'Connect Freighter'
          )}
        </Button>
        {error && (
          <p className="text-destructive text-sm mt-2">{error}</p>
        )}
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="font-medium">Wallet Connected</span>
        </div>
        <Button variant="outline" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Public Key</label>
          <div className="flex items-center gap-2 mt-1">
            <code className="flex-1 text-xs font-mono bg-muted p-2 rounded truncate">
              {publicKey}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPublicKey}
              className="shrink-0"
            >
              <Copy className={`w-4 h-4 ${copied ? 'text-green-500' : ''}`} />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Balance</label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-bold">
              {balance ? `${balance.xlmBalance.toFixed(2)} XLM` : 'Loading...'}
            </span>
            {balance && balance.xlmBalance === 0 && (
              <Button size="sm" onClick={handleFundAccount} disabled={isLoading}>
                Fund Account
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}