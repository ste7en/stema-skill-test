import { NextResponse } from 'next/server'
import jobseekers from '@/data/jobseeker.json'
import { JobSeeker } from '@/types/jobseeker'

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()
    
    // Find the user
    const jobseeker = (jobseekers as JobSeeker[]).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (!jobseeker) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // In a real app, we would verify the OTP here
    // For this demo, we'll accept any OTP and return the user
    
    return NextResponse.json({
      user: jobseeker
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
} 