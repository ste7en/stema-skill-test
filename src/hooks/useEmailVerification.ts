import { useState } from 'react'

interface UseEmailVerificationReturn {
  isLoading: boolean
  error: string
  verifyEmail: (email: string) => Promise<boolean>
}

export function useEmailVerification(): UseEmailVerificationReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const verifyEmail = async (email: string): Promise<boolean> => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email')
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    verifyEmail
  }
} 