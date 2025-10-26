"use client"

import { WalletData } from "@/components/molecules/wallet-data"
import { Card } from "@/components/ui/card"

export default function WalletDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Freighter Wallet Integration Demo</h1>
          <p className="text-slate-400">Following Stellar documentation patterns</p>
        </div>

        <Card className="p-8 border-slate-700/50 bg-slate-800/30">
          <h2 className="text-2xl font-bold mb-6">WalletData Component</h2>
          <div className="flex justify-center">
            <WalletData />
          </div>
        </Card>

        <Card className="p-6 border-slate-700/50 bg-slate-800/30">
          <h3 className="text-lg font-semibold mb-4">How it works:</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Uses <code className="bg-slate-700 px-2 py-1 rounded">useIsMounted</code> hook for SSR safety</li>
            <li>• Uses <code className="bg-slate-700 px-2 py-1 rounded">useAccount</code> hook to fetch wallet data</li>
            <li>• Shows ConnectButton when wallet not connected</li>
            <li>• Shows wallet info when connected</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}