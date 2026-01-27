// app/api/admin/users/[id]/verify/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    
    const user = await User.findByIdAndUpdate(
      id, 
      { isVerified: true }, 
      { new: true }
    )
    
    return NextResponse.json({ 
      message: 'User verified',
      user 
    })
  } catch (error) {
    console.error('Error verifying user:', error)
    return NextResponse.json(
      { error: 'Failed to verify user' },
      { status: 500 }
    )
  }
}