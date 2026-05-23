// app/api/user/change-email/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { getAuthToken, verifyToken, comparePassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken()
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await connectDB()
    const { newEmail, password } = await req.json()

    if (!newEmail || !password) {
      return NextResponse.json({ error: 'New email and password are required' }, { status: 400 })
    }

    // Get current user with password
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify password
    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    // Check if new email already taken
    const existing = await User.findOne({ email: newEmail.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'This email is already registered' }, { status: 400 })
    }

    // Update email
    user.email = newEmail.toLowerCase()
    await user.save()

    return NextResponse.json({ message: 'Email updated successfully' })
  } catch (error) {
    console.error('Change email error:', error)
    return NextResponse.json({ error: 'Failed to update email' }, { status: 500 })
  }
}