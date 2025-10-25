import { NextResponse } from "next/server"
import { demoTransactions } from "@/lib/demo-data"

export async function GET() {
  return NextResponse.json({
    transactions: demoTransactions,
    total: demoTransactions.length,
  })
}
