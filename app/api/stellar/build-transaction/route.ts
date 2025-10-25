import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")
const networkPassphrase = StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE

export async function POST(request: NextRequest) {
  try {
    const { senderPublicKey, recipientPublicKey, amount, memo } = await request.json()

    // Validate required fields
    if (!senderPublicKey || !recipientPublicKey || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate Stellar public keys
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(senderPublicKey)) {
      return NextResponse.json({ error: "Invalid sender public key" }, { status: 400 })
    }
    
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(recipientPublicKey)) {
      return NextResponse.json({ error: "Invalid recipient public key" }, { status: 400 })
    }

    // Validate amount
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const senderAccount = await server.accounts().accountId(senderPublicKey).call()

    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: recipientPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        }),
      )
      .addMemo(StellarSdk.Memo.text(memo || "StellarPay Micropayment"))
      .setTimeout(300)
      .build()

    const xdr = transaction.toXDR()

    return NextResponse.json({
      xdr,
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
  } catch (error: any) {
    console.error("Transaction build error:", error.message)
    
    if (error.response?.status === 404) {
      return NextResponse.json({ 
        error: "Account not found. Please ensure the account is funded." 
      }, { status: 404 })
    }
    
    if (error.message?.includes('insufficient')) {
      return NextResponse.json({ 
        error: "Insufficient balance for transaction" 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: "Failed to build transaction. Please try again." 
    }, { status: 500 })
  }
}
