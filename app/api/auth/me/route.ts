// app/api/auth/me/route.ts
// Returns currently logged in user

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not logged in' },
        { status: 401 }
      )
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    await connectDB()
    const user = await User.findById(payload.userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data (without password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      branch: user.branch,
      company: user.company,
      jobTitle: user.jobTitle,
      location: user.location,
    }

    return NextResponse.json({ user: userData })
  } catch (error: any) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}