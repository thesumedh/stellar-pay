import * as StellarSdk from "stellar-sdk"
import { debugFreighterNetwork } from "./network-debug"

export interface FreighterWallet {
  publicKey: string
  isConnected: boolean
}

/**
 * Check if Freighter is installed
 */
export function isFreighterInstalled(): boolean {
  if (typeof window === "undefined") return false
  return !!(window as any).freighter && typeof (window as any).freighter.getPublicKey === "function"
}

/**
 * Connect to Freighter wallet
 */
export async function connectFreighter(): Promise<FreighterWallet> {
  if (!isFreighterInstalled()) {
    throw new Error("Freighter wallet not installed")
  }

  try {
    const publicKey = await (window as any).freighter.getPublicKey()
    return {
      publicKey,
      isConnected: true,
    }
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error("User declined wallet connection")
    }
    throw new Error("Failed to connect to Freighter wallet")
  }
}

/**
 * Sign transaction with Freighter
 */
export async function signTransactionWithFreighter(xdr: string): Promise<string> {
  if (!isFreighterInstalled()) {
    throw new Error("Freighter wallet not installed")
  }

  try {
    // Debug and verify Freighter network
    await debugFreighterNetwork()
    
    const { network, networkPassphrase } = await (window as any).freighter.getNetwork()
    console.log("🔍 Transaction Debug:")
    console.log("Freighter network:", network)
    console.log("Freighter passphrase:", networkPassphrase)
    console.log("Expected network: TESTNET")
    console.log("Expected passphrase:", "Test SDF Network ; September 2015")
    
    if (network !== "TESTNET") {
      throw new Error("Please switch Freighter to Testnet in wallet settings")
    }

    const signedXdr = await (window as any).freighter.signTransaction(xdr, {
      network: "TESTNET",
      networkPassphrase: "Test SDF Network ; September 2015",
    })
    return signedXdr
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error("User declined transaction signing")
    }
    throw new Error("Failed to sign transaction with Freighter")
  }
}

/**
 * Send payment via Freighter
 */
export async function sendPaymentWithFreighter(
  recipientPublicKey: string,
  amount: string,
  memo?: string,
): Promise<{ hash: string; success: boolean }> {
  try {
    // Step 1: Get sender's public key
    const senderPublicKey = await (window as any).freighter.getPublicKey()

    // Step 2: Build transaction on backend
    const buildResponse = await fetch("/api/stellar/build-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderPublicKey,
        recipientPublicKey,
        amount,
        memo,
      }),
    })

    const { xdr } = await buildResponse.json()

    // Step 3: Verify network and sign with Freighter
    const { network, networkPassphrase } = await (window as any).freighter.getNetwork()
    if (network !== "TESTNET") {
      throw new Error("Please switch Freighter to Testnet in wallet settings")
    }

    const signedXdr = await (window as any).freighter.signTransaction(xdr, {
      network: "TESTNET",
      networkPassphrase: "Test SDF Network ; September 2015",
    })

    // Step 4: Submit to Stellar network via backend
    const submitResponse = await fetch("/api/stellar/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xdr: signedXdr }),
    })

    const result = await submitResponse.json()

    return {
      hash: result.transactionHash,
      success: true,
    }
  } catch (error: any) {
    console.error("Payment error:", error.message)
    if (error.message?.includes('insufficient')) {
      throw new Error("Insufficient balance for transaction")
    }
    if (error.message?.includes('User declined')) {
      throw new Error("Transaction cancelled by user")
    }
    throw new Error("Payment failed. Please try again.")
  }
}