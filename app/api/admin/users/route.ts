// app/api/admin/users/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword } from '@/lib/auth'

// GET - Fetch all users
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({ users })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Add new user
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { name, email, password, role, branch, company, usn, designation, graduationYear } = body

    // Check if email exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      branch,
      company,
      collegeId: usn,
      designation,
      graduationYear: graduationYear ? parseInt(graduationYear) : undefined,
      isVerified: true, // Admin-added users are auto-verified
    })

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch,
      isVerified: user.isVerified,
    }

    return NextResponse.json({
      message: 'User created successfully',
      user: userData,
    })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    )
  }
}