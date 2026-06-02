import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    alumni: 5000,
    students: 10000,
    mentorships: 2500,
    countries: 25,
  })
}