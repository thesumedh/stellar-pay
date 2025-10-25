import { useState, useEffect, useCallback } from 'react'

interface AccountBalance {
  xlmBalance: number
  balances: Array<{
    asset_type: string
    asset_code: string
    balance: number
  }>
}

export function useStellarAccount(publicKey: string | null) {
  const [balance, setBalance] = useState<AccountBalance | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/stellar/account/balance?publicKey=${publicKey}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch balance')
      }

      setBalance({
        xlmBalance: data.xlmBalance,
        balances: data.balances
      })
    } catch (err: any) {
      setError(err.message)
      setBalance(null)
    } finally {
      setIsLoading(false)
    }
  }, [publicKey])

  const fundAccount = useCallback(async () => {
    if (!publicKey) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stellar/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fund account')
      }

      // Refresh balance after funding
      await fetchBalance()
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [publicKey, fetchBalance])

  useEffect(() => {
    if (publicKey) {
      fetchBalance()
    } else {
      setBalance(null)
      setError(null)
    }
  }, [publicKey, fetchBalance])

  return {
    balance,
    isLoading,
    error,
    refetch: fetchBalance,
    fundAccount
  }
}