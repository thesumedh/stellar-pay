import { useState, useEffect } from 'react'

interface Account {
  displayName: string
  publicKey: string
}

export function useAccount() {
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).freighter) {
        try {
          const publicKey = await (window as any).freighter.getPublicKey()
          setAccount({
            displayName: `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
            publicKey
          })
        } catch (error) {
          setAccount(null)
        }
      }
    }

    checkConnection()
  }, [])

  return account
}