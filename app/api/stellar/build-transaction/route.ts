import { type NextRequest, NextResponse } from "next/server"



export async function POST(request: NextRequest) {
  try {
    const { senderPublicKey, recipientPublicKey, amount, memo } = await request.json()

    if (!senderPublicKey || !recipientPublicKey || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Dynamic import to avoid Next.js compatibility issues
    const StellarSdk = await import('stellar-sdk')
    const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org")
    const networkPassphrase = "Test SDF Network ; September 2015"

    const accountResponse = await server.accounts().accountId(senderPublicKey).call()
    const senderAccount = new StellarSdk.Account(senderPublicKey, accountResponse.sequence)

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
      .addMemo(StellarSdk.Memo.text(memo || "StellarPay Payment"))
      .setTimeout(300)
      .build()

    const xdr = transaction.toXDR()

    return NextResponse.json({
      xdr,
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
  } catch (error: any) {
    console.error("Transaction build error:", error)
    return NextResponse.json({ 
      error: error.message || "Failed to build transaction" 
    }, { status: 500 })
  }
}
