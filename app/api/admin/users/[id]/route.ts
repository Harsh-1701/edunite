// app/api/admin/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await connectDB()

    const { id } = await context.params
    await User.findByIdAndDelete(id)

    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await connectDB()

    const { id } = await context.params
    const body = await req.json()

    const user = await User.findByIdAndUpdate(id, body, { new: true })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}