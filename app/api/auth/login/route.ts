// app/api/auth/login/route.ts
// Handles user login

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Get email and password from request
    const { email, password } = await req.json()

    // Check if email and password provided
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create login token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    // Save token in cookie
    await setAuthCookie(token)

    // Return user data (without password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    }

    return NextResponse.json({
      message: 'Login successful',
      user: userData,
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}