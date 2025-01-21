import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear the user-id cookie
  response.cookies.delete('user-id')
  
  return response
} 