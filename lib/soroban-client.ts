import { rpc, TransactionBuilder, Networks, Account } from "@stellar/stellar-sdk"

const rpcUrl = "https://soroban-testnet.stellar.org"
const server = new rpc.Server(rpcUrl)

export async function buildSorobanTransaction(publicKey: string) {
  const account = await server.getAccount(publicKey)
  
  const transaction = new TransactionBuilder(new Account(publicKey, account.sequence), {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
  .setTimeout(30)
  .build()
  
  return transaction.toXDR()
}