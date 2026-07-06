import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const { userId } = await req.json()

  await supabaseAdmin
    .from('profiles')
    .update({
      is_online: false,
      last_seen: new Date().toISOString(),
    })
    .eq('id', userId)

  return NextResponse.json({
    success: true,
  })
}