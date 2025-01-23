import { NextResponse } from 'next/server'
import jobseekers from '@/data/jobseeker.json'
import { JobSeeker } from '@/types/jobseeker'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    const jobseeker = (jobseekers as JobSeeker[]).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    )

    if (!jobseeker) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'OTP sent successfully'
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
} 