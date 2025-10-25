import * as StellarSdk from "stellar-sdk"

// Initialize Stellar SDK for testnet
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")
const networkPassphrase = StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE

export interface StellarAccount {
  publicKey: string
  secretKey: string
  balance: string
}

export interface MicropaymentTransaction {
  id: string
  from: string
  to: string
  amount: string
  contentId: number
  timestamp: number
  status: "pending" | "completed" | "failed"
}

/**
 * Create a new Stellar account for a user
 */
export async function createStellarAccount(): Promise<StellarAccount> {
  const keypair = StellarSdk.Keypair.random()
  const publicKey = keypair.publicKey()
  const secretKey = keypair.secret()

  // In production, fund the account through a proper funding service
  // For hackathon, we'll use the testnet friendbot
  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
    if (!response.ok) {
      throw new Error(`Friendbot funding failed: ${response.status}`)
    }
  } catch (error) {
    console.error("Failed to fund account:", error)
    throw new Error("Account funding failed. Please try again.")
  }

  return {
    publicKey,
    secretKey,
    balance: "10000", // Testnet friendbot provides 10,000 XLM
  }
}

/**
 * Get account balance from Stellar
 */
export async function getAccountBalance(publicKey: string): Promise<string> {
  try {
    const account = await server.accounts().accountId(publicKey).call()
    const nativeBalance = account.balances.find((b) => b.asset_type === "native")
    return nativeBalance?.balance || "0"
  } catch (error) {
    console.error("Failed to get account balance:", error)
    if (error instanceof Error && error.message.includes('404')) {
      throw new Error('Account not found. Please ensure the account is funded.')
    }
    throw new Error('Unable to retrieve account balance. Please try again.')
  }
}

/**
 * Send a micropayment using Stellar
 */
export async function sendMicropayment(
  senderSecret: string,
  recipientPublic: string,
  amount: string,
  contentId: number,
): Promise<MicropaymentTransaction> {
  try {
    const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret)
    const senderPublic = senderKeypair.publicKey()

    // Get sender account
    const senderAccount = await server.accounts().accountId(senderPublic).call()

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: recipientPublic,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        }),
      )
      .setTimeout(30)
      .build()

    // Sign transaction
    transaction.sign(senderKeypair)

    // Submit to network
    const result = await server.submitTransaction(transaction)

    return {
      id: result.id,
      from: senderPublic,
      to: recipientPublic,
      amount,
      contentId,
      timestamp: Date.now(),
      status: "completed",
    }
  } catch (error) {
    console.error("Micropayment failed:", error)
    let errorMessage = 'Transaction failed'
    
    if (error instanceof Error) {
      if (error.message.includes('insufficient')) {
        errorMessage = 'Insufficient balance'
      } else if (error.message.includes('destination')) {
        errorMessage = 'Invalid recipient address'
      }
    }
    
    throw new Error(errorMessage)
  }
}

/**
 * Get transaction history for an account
 */
export async function getTransactionHistory(publicKey: string): Promise<MicropaymentTransaction[]> {
  try {
    const transactions = await server.transactions().forAccount(publicKey).order("desc").limit(50).call()

    return transactions.records.map((tx: any) => ({
      id: tx.id,
      from: tx.source_account,
      to: publicKey,
      amount: "0", // Would need to parse operations
      contentId: 0,
      timestamp: new Date(tx.created_at).getTime(),
      status: "completed",
    }))
  } catch (error) {
    console.error("Failed to get transaction history:", error)
    return []
  }
}

/**
 * Watch for incoming payments
 */
export function watchForPayments(publicKey: string, callback: (payment: any) => void) {
  const es = server.payments().forAccount(publicKey).stream({
    onmessage: callback,
  })

  return () => es.close()
}
