// app/api/admin/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
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

// PATCH - Update user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
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