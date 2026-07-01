// app/api/admin/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    // Delete profile
    const { error: profileError } =
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', id)

    if (profileError) throw profileError

    // Delete auth user
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(id)

    if (authError) throw authError

    return NextResponse.json({
      message: 'User deleted',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to delete user',
      },
      {
        status: 500,
      }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    const { data, error } =
      await supabaseAdmin
        .from('profiles')
        .update({
          name: body.name,
          role: body.role,
          branch: body.branch,
          company: body.company,
          job_title: body.jobTitle,
          verified: body.verified,
        })
        .eq('id', id)
        .select()
        .single()

    if (error) throw error

    return NextResponse.json({
      user: data,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to update user',
      },
      {
        status: 500,
      }
    )
  }
}