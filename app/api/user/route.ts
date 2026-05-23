// app/api/user/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { getAuthToken, verifyToken } from '@/lib/auth'

export async function PATCH(req: NextRequest) {
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
    const body = await req.json()

    const updateData: any = {
      name: body.name,
      bio: body.bio || '',
      company: body.company || '',
      jobTitle: body.jobTitle || '',
      location: body.location || '',
      linkedIn: body.linkedIn || '',
      github: body.github || '',
      discord: body.discord || '',
      skills: body.skills
        ? body.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    }

    if (body.avatar !== undefined) {
      updateData.avatar = body.avatar
    }

    const updatedUser = await User.findByIdAndUpdate(
      payload.userId,
      updateData,
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}