// app/api/admin/users/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, email, password, role, branch, company, usn, designation, graduationYear } = body

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

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
      isVerified: true,
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
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}