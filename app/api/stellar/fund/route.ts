import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

export async function POST(request: NextRequest) {
  try {
    const { publicKey } = await request.json()

    if (!publicKey) {
      return NextResponse.json({ error: "Public key required" }, { status: 400 })
    }

    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKey)) {
      return NextResponse.json({ error: "Invalid public key" }, { status: 400 })
    }

    const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
    
    if (!response.ok) {
      throw new Error(`Friendbot failed: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      publicKey,
      transactionHash: result.hash,
      message: "Account funded with 10,000 XLM testnet tokens"
    })

  } catch (error: any) {
    console.error("Funding error:", error.message)
    
    if (error.message.includes('createAccountAlreadyExist')) {
      return NextResponse.json({
        success: true,
        message: "Account already exists and funded"
      })
    }
    
    return NextResponse.json({ 
      error: "Failed to fund account" 
    }, { status: 500 })
  }
}