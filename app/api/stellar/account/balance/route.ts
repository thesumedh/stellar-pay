import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicKey = searchParams.get('publicKey')

    if (!publicKey) {
      return NextResponse.json({ error: "Public key required" }, { status: 400 })
    }

    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKey)) {
      return NextResponse.json({ error: "Invalid public key" }, { status: 400 })
    }

    const account = await server.accounts().accountId(publicKey).call()
    
    const nativeBalance = account.balances.find(b => b.asset_type === "native")
    const xlmBalance = nativeBalance ? parseFloat(nativeBalance.balance) : 0

    const balances = account.balances.map(balance => ({
      asset_type: balance.asset_type,
      asset_code: balance.asset_code || "XLM",
      balance: parseFloat(balance.balance),
    }))

    return NextResponse.json({
      publicKey,
      xlmBalance,
      balances,
      sequence: account.sequence,
    })

  } catch (error: any) {
    if (error.response?.status === 404) {
      return NextResponse.json({ 
        error: "Account not found",
        xlmBalance: 0,
        balances: []
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: "Failed to fetch balance" 
    }, { status: 500 })
  }
}