// app/api/admin/users/[id]/verify/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        verified: true,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      message: 'User verified',
      user: data,
    })
  } catch (error) {
    console.error('Error verifying user:', error)

    return NextResponse.json(
      {
        error: 'Failed to verify user',
      },
      {
        status: 500,
      }
    )
  }
}