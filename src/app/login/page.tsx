'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEmailVerification } from '@/hooks/useEmailVerification'
import { useOtpVerification } from '@/hooks/useOtpVerification'

export default function LoginPage() {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  
  const {
    isLoading: isEmailLoading,
    error: emailError,
    verifyEmail
  } = useEmailVerification()

  const {
    isLoading: isOtpLoading,
    error: otpError,
    verifyOtp
  } = useOtpVerification()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = await verifyEmail(email)
    if (isValid) {
      setIsVerifying(true)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = await verifyOtp(email, otp)
    if (user) {
      // Here we could store the user in global state
      router.push('/dashboard')
    }
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/stema-logo.svg"
              alt="Stema Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          <CardTitle className="text-2xl text-center">Welcome to Stema</CardTitle>
          <CardDescription className="text-center">
            {isVerifying 
              ? 'Enter the verification code sent to your email'
              : 'Enter your email to receive a one-time code'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isVerifying ? handleOtpSubmit : handleEmailSubmit} className="space-y-4">
            {!isVerifying ? (
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isEmailLoading}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={isOtpLoading}
                  maxLength={6}
                />
              </div>
            )}
            {(emailError || otpError) && (
              <p className="text-sm text-destructive">
                {emailError || otpError}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isEmailLoading || isOtpLoading}
            >
              {isEmailLoading || isOtpLoading
                ? 'Please wait...' 
                : isVerifying 
                  ? 'Verify Code' 
                  : 'Continue with Email'
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 