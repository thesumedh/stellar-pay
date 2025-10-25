import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")
const networkPassphrase = StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE

export async function POST(request: NextRequest) {
  try {
    const { xdr } = await request.json()

    if (!xdr) {
      return NextResponse.json({ error: "Transaction XDR required" }, { status: 400 })
    }

    // Validate XDR format
    let transaction
    try {
      transaction = StellarSdk.TransactionBuilder.fromXDR(xdr, networkPassphrase)
    } catch (xdrError) {
      return NextResponse.json({ error: "Invalid transaction XDR" }, { status: 400 })
    }

    const result = await server.submitTransaction(transaction)

    return NextResponse.json({
      success: true,
      transactionHash: result.hash,
      ledger: result.ledger,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Transaction submission error:", error.message)
    
    // Handle specific Stellar errors
    if (error.response?.data?.extras?.result_codes) {
      const resultCodes = error.response.data.extras.result_codes
      
      if (resultCodes.transaction === 'tx_insufficient_balance') {
        return NextResponse.json({ 
          error: "Insufficient balance for transaction and fees" 
        }, { status: 400 })
      }
      
      if (resultCodes.transaction === 'tx_bad_seq') {
        return NextResponse.json({ 
          error: "Transaction sequence number is invalid" 
        }, { status: 400 })
      }
      
      if (resultCodes.operations?.includes('op_no_destination')) {
        return NextResponse.json({ 
          error: "Destination account does not exist" 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json({ 
      error: "Transaction failed. Please try again.",
      details: error.message 
    }, { status: 500 })
  }
}
