import { type NextRequest, NextResponse } from "next/server"



export async function POST(request: NextRequest) {
  try {
    const { xdr } = await request.json()

    if (!xdr) {
      return NextResponse.json({ error: "Transaction XDR required" }, { status: 400 })
    }

    // Dynamic import to avoid Next.js compatibility issues
    const StellarSdk = await import('stellar-sdk')
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")
    const networkPassphrase = "Test SDF Network ; September 2015"

    const transaction = StellarSdk.TransactionBuilder.fromXDR(xdr, networkPassphrase)
    const result = await server.submitTransaction(transaction)

    return NextResponse.json({
      success: true,
      transactionHash: result.hash,
      ledger: result.ledger,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Transaction submission error:", error)
    return NextResponse.json({ 
      error: error.message || "Transaction failed" 
    }, { status: 500 })
  }
}
