import { useState } from 'react'
import { JobSeeker } from '@/types/jobseeker'

interface UseOtpVerificationReturn {
  isLoading: boolean
  error: string
  verifyOtp: (email: string, otp: string) => Promise<JobSeeker | null>
}

export function useOtpVerification(): UseOtpVerificationReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const verifyOtp = async (email: string, otp: string): Promise<JobSeeker | null> => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP')
      }

      return data.user
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    verifyOtp
  }
} 