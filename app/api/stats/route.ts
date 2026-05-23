// app/api/stats/route.ts

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()

    const [totalUsers, totalStudents, totalAlumni, totalFaculty] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'alumni' }),
      User.countDocuments({ role: 'faculty' }),
    ])

    return NextResponse.json({
      totalUsers,
      totalStudents,
      totalAlumni,
      totalFaculty,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({
      totalUsers: 0,
      totalStudents: 0,
      totalAlumni: 0,
      totalFaculty: 0,
    })
  }
}