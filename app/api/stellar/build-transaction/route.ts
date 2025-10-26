import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { senderPublicKey, recipientPublicKey, amount, memo } = await request.json()

    // For demo purposes, return a mock XDR
    const mockXdr = "AAAAAgAAAABYEG9Q7+5VGKBhFQObYQC7wqaW8Qx8VhZvVqiMM7rCqgAAAGQAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAABhYm9ydAAAAAABAAAAAQAAAABYEG9Q7+5VGKBhFQObYQC7wqaW8Qx8VhZvVqiMM7rCqgAAAAEAAAAAWBBvUO/uVRigYRUDm2EAu8KmlvEMfFYWb1aojDO6wqoAAAAAAAAAAACYloAAAAAAAAAAATOsyqoAAABAhJy0YKJjphyVWwqUDzqMzXaUUhiPThnCg0oIXNn2mxAlFgTqPX7/wZBfY2jCr6qCoAoIGgGFzgUcmQ=="

    return NextResponse.json({
      xdr: mockXdr,
      fee: "100",
      networkPassphrase: "Test SDF Network ; September 2015",
    })
  } catch (error: any) {
    console.error("Transaction build error:", error)
    return NextResponse.json({ 
      error: "Failed to build transaction" 
    }, { status: 500 })
  }
}
