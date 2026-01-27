// app/api/auth/signup/route.ts
// Handles new user registration

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, email, password, role, ...rest } = body

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Name, email, password, and role are required' },
        { status: 400 }
      )
    }

    // Validate role
    if (!['student', 'alumni'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Check password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      isVerified: role === 'student', // Students are auto-verified
      ...rest,
    })

    // Create token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

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
      message: 'Account created successfully',
      user: userData,
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}