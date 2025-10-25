import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")

export async function GET(request: NextRequest) {
  try {
    const publicKey = request.nextUrl.searchParams.get("publicKey")
    const limit = request.nextUrl.searchParams.get("limit") || "50"

    if (!publicKey) {
      return NextResponse.json({ error: "Public key required" }, { status: 400 })
    }

    const transactions = await server
      .transactions()
      .forAccount(publicKey)
      .order("desc")
      .limit(Number.parseInt(limit))
      .call()

    const formattedTransactions = transactions.records.map((tx: any) => ({
      id: tx.id,
      hash: tx.hash,
      ledger: tx.ledger_attr,
      createdAt: tx.created_at,
      sourceAccount: tx.source_account,
      operationCount: tx.operation_count,
      memo: tx.memo,
    }))

    return NextResponse.json({
      transactions: formattedTransactions,
      total: transactions.records.length,
    })
  } catch (error: any) {
    console.error("[v0] Transaction history error:", error.message)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
