import { NextResponse } from "next/server"
import { demoUsers } from "@/lib/demo-data"

export async function GET() {
  return NextResponse.json({
    users: demoUsers,
    total: demoUsers.length,
  })
}
