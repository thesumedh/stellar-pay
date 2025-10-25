import { NextResponse } from "next/server"
import { demoContent } from "@/lib/demo-data"

export async function GET() {
  return NextResponse.json({
    content: demoContent,
    total: demoContent.length,
  })
}
