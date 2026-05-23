// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, email, password, role, collegeId, ...rest } = body

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Name, email, password, and role are required' },
        { status: 400 }
      )
    }

    if (!['student', 'alumni', 'faculty'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Check duplicate USN for students
    if (role === 'student' && collegeId) {
      const existingUSN = await User.findOne({ collegeId: collegeId.toUpperCase() })
      if (existingUSN) {
        return NextResponse.json(
          { error: 'This USN is already registered. If this is your USN, please login instead.' },
          { status: 400 }
        )
      }
    }

    // Check duplicate name + role combination (optional extra check)
    const existingNameRole = await User.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      role: role
    })
    if (existingNameRole) {
      return NextResponse.json(
        { error: `A ${role} with this exact name already exists. Please use your full name or contact support.` },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      collegeId: collegeId ? collegeId.toUpperCase() : undefined,
      isVerified: role === 'student',
      ...rest,
    })

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)

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
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}