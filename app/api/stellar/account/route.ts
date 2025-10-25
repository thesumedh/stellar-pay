import { type NextRequest, NextResponse } from "next/server"
import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")

export async function GET(request: NextRequest) {
  try {
    const publicKey = request.nextUrl.searchParams.get("publicKey")

    if (!publicKey) {
      return NextResponse.json({ error: "Public key required" }, { status: 400 })
    }

    // Validate Stellar address format
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(publicKey)) {
      return NextResponse.json({ error: "Invalid Stellar address" }, { status: 400 })
    }

    const account = await server.accounts().accountId(publicKey).call()
    const nativeBalance = account.balances.find((b) => b.asset_type === "native")

    return NextResponse.json({
      publicKey,
      balance: nativeBalance?.balance || "0",
      sequenceNumber: account.sequence,
      subentryCount: account.subentry_count,
    })
  } catch (error: any) {
    console.error("[v0] Account fetch error:", error.message)
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 })
  }
}
