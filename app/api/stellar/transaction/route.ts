import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { xdr } = await request.json()

    if (!xdr) {
      return NextResponse.json({ error: "Transaction XDR required" }, { status: 400 })
    }

    // For demo purposes, return a mock successful transaction
    const mockHash = "a" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    return NextResponse.json({
      success: true,
      transactionHash: mockHash,
      ledger: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Transaction submission error:", error)
    return NextResponse.json({ 
      error: "Transaction failed" 
    }, { status: 500 })
  }
}
