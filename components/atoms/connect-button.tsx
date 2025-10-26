"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface ConnectButtonProps {
  label: string
}

export function ConnectButton({ label }: ConnectButtonProps) {
  const handleConnect = async () => {
    if (typeof window !== 'undefined' && (window as any).freighter) {
      try {
        const publicKey = await (window as any).freighter.getPublicKey()
        if (publicKey) {
          window.location.reload()
        }
      } catch (error) {
        alert('Please approve the connection in Freighter wallet')
      }
    } else {
      alert('Please install Freighter wallet first')
      window.open('https://freighter.app/', '_blank')
    }
  }

  return (
    <Button onClick={handleConnect} className="gap-2">
      <Wallet className="w-4 h-4" />
      {label}
    </Button>
  )
}