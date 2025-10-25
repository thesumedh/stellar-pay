import * as StellarSdk from "stellar-sdk"

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org")
const networkPassphrase = StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE

/**
 * HACKATHON FEATURE: Smart Contract for Content Escrow
 * Holds payment until content is delivered
 */
export async function createContentEscrow(
  buyerSecret: string,
  sellerPublic: string,
  amount: string,
  contentId: number
): Promise<string> {
  try {
    const buyerKeypair = StellarSdk.Keypair.fromSecret(buyerSecret)
    const escrowKeypair = StellarSdk.Keypair.random()
    
    // Create escrow account
    const buyerAccount = await server.accounts().accountId(buyerKeypair.publicKey()).call()
    
    const createEscrowTx = new StellarSdk.TransactionBuilder(buyerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.createAccount({
          destination: escrowKeypair.publicKey(),
          startingBalance: amount,
        })
      )
      .addOperation(
        StellarSdk.Operation.setOptions({
          source: escrowKeypair.publicKey(),
          signer: {
            ed25519PublicKey: sellerPublic,
            weight: 1,
          },
          masterWeight: 1,
          lowThreshold: 2,
          medThreshold: 2,
          highThreshold: 2,
        })
      )
      .setTimeout(30)
      .build()

    createEscrowTx.sign(buyerKeypair, escrowKeypair)
    await server.submitTransaction(createEscrowTx)
    
    return escrowKeypair.publicKey()
  } catch (error) {
    console.error("Escrow creation failed:", error)
    throw new Error("Failed to create content escrow")
  }
}

/**
 * HACKATHON FEATURE: Streaming Micropayments
 * Pay per second of content consumption
 */
export class StreamingPayment {
  private intervalId: NodeJS.Timeout | null = null
  private totalPaid = 0

  constructor(
    private senderSecret: string,
    private recipientPublic: string,
    private ratePerSecond: number
  ) {}

  start(): void {
    this.intervalId = setInterval(async () => {
      try {
        await this.sendMicroPayment()
        this.totalPaid += this.ratePerSecond
      } catch (error) {
        console.error("Streaming payment failed:", error)
        this.stop()
      }
    }, 1000)
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  getTotalPaid(): number {
    return this.totalPaid
  }

  private async sendMicroPayment(): Promise<void> {
    const senderKeypair = StellarSdk.Keypair.fromSecret(this.senderSecret)
    const senderAccount = await server.accounts().accountId(senderKeypair.publicKey()).call()

    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: this.recipientPublic,
          asset: StellarSdk.Asset.native(),
          amount: this.ratePerSecond.toString(),
        })
      )
      .setTimeout(30)
      .build()

    transaction.sign(senderKeypair)
    await server.submitTransaction(transaction)
  }
}

/**
 * HACKATHON FEATURE: Revenue Sharing Smart Contract
 * Automatically split payments between multiple creators
 */
export async function createRevenueShare(
  payerSecret: string,
  recipients: Array<{ publicKey: string; percentage: number }>,
  totalAmount: string
): Promise<string[]> {
  try {
    const payerKeypair = StellarSdk.Keypair.fromSecret(payerSecret)
    const payerAccount = await server.accounts().accountId(payerKeypair.publicKey()).call()

    const transaction = new StellarSdk.TransactionBuilder(payerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })

    // Add payment operation for each recipient
    recipients.forEach(recipient => {
      const amount = (parseFloat(totalAmount) * recipient.percentage / 100).toFixed(7)
      transaction.addOperation(
        StellarSdk.Operation.payment({
          destination: recipient.publicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
    })

    const builtTransaction = transaction.setTimeout(30).build()
    builtTransaction.sign(payerKeypair)
    
    const result = await server.submitTransaction(builtTransaction)
    return [result.id]
  } catch (error) {
    console.error("Revenue sharing failed:", error)
    throw new Error("Failed to distribute revenue share")
  }
}

/**
 * HACKATHON FEATURE: Content NFT Minting
 * Create unique tokens for premium content
 */
export async function mintContentNFT(
  creatorSecret: string,
  contentId: number,
  contentHash: string
): Promise<string> {
  try {
    const creatorKeypair = StellarSdk.Keypair.fromSecret(creatorSecret)
    const creatorAccount = await server.accounts().accountId(creatorKeypair.publicKey()).call()

    // Create unique asset for this content
    const assetCode = `CONTENT${contentId}`
    const contentAsset = new StellarSdk.Asset(assetCode, creatorKeypair.publicKey())

    const transaction = new StellarSdk.TransactionBuilder(creatorAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: contentAsset,
          limit: "1", // Only 1 NFT
        })
      )
      .addOperation(
        StellarSdk.Operation.payment({
          destination: creatorKeypair.publicKey(),
          asset: contentAsset,
          amount: "1",
        })
      )
      .addOperation(
        StellarSdk.Operation.setOptions({
          setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag,
        })
      )
      .addOperation(
        StellarSdk.Operation.manageData({
          name: `content_${contentId}`,
          value: contentHash,
        })
      )
      .setTimeout(30)
      .build()

    transaction.sign(creatorKeypair)
    const result = await server.submitTransaction(transaction)
    
    return result.id
  } catch (error) {
    console.error("NFT minting failed:", error)
    throw new Error("Failed to mint content NFT")
  }
}