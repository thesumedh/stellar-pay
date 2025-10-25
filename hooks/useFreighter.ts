import { useState, useEffect, useCallback } from 'react'
import { connectFreighter, isFreighterInstalled, sendPaymentWithFreighter } from '@/lib/freighter-utils'

interface FreighterState {
  isInstalled: boolean
  isConnected: boolean
  publicKey: string | null
  isLoading: boolean
  error: string | null
}

export function useFreighter() {
  const [state, setState] = useState<FreighterState>({
    isInstalled: false,
    isConnected: false,
    publicKey: null,
    isLoading: false,
    error: null,
  })

  useEffect(() => {
    const checkFreighter = () => {
      setState(prev => ({
        ...prev,
        isInstalled: isFreighterInstalled()
      }))
    }
    
    // Check immediately
    checkFreighter()
    
    // Check again after a short delay for extension loading
    const timer = setTimeout(checkFreighter, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const connect = useCallback(async () => {
    if (!state.isInstalled) {
      setState(prev => ({ ...prev, error: 'Freighter wallet not installed' }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const wallet = await connectFreighter()
      setState(prev => ({
        ...prev,
        isConnected: true,
        publicKey: wallet.publicKey,
        isLoading: false,
      }))
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }))
    }
  }, [state.isInstalled])

  const sendPayment = useCallback(async (
    recipientPublicKey: string,
    amount: string,
    memo?: string
  ) => {
    if (!state.isConnected || !state.publicKey) {
      throw new Error('Wallet not connected')
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const result = await sendPaymentWithFreighter(recipientPublicKey, amount, memo)
      setState(prev => ({ ...prev, isLoading: false }))
      return result
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }))
      throw error
    }
  }, [state.isConnected, state.publicKey])

  const disconnect = useCallback(() => {
    setState({
      isInstalled: state.isInstalled,
      isConnected: false,
      publicKey: null,
      isLoading: false,
      error: null,
    })
  }, [state.isInstalled])

  return {
    ...state,
    connect,
    disconnect,
    sendPayment,
  }
}