import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { hashPassword } from '@/lib/password'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      users: data,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to fetch users',
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const password = await hashPassword(
      body.password
    )

    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: {
          name: body.name,
          role: body.role,
          branch: body.branch,
          company: body.company,
          jobTitle: body.jobTitle,
        },
      })

    if (authError) throw authError

    const { error: profileError } =
      await supabaseAdmin
        .from('profiles')
        .update({
          name: body.name,
          role: body.role,
          branch: body.branch,
          company: body.company,
          job_title: body.jobTitle,
        })
        .eq('id', authUser.user.id)

    if (profileError) throw profileError

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to create user',
      },
      {
        status: 500,
      }
    )
  }
}