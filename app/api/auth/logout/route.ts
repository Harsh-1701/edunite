// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export async function POST() {
  try {
    await clearAuthCookie()
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch {
    return NextResponse.json({ message: 'Logged out' })
  }
}