// app/api/ai/chat/route.ts

import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `
You are EduNite AI Assistant.

You help students and alumni with:
- Resume building
- Career guidance
- Interview preparation
- Internships
- Research opportunities
- Skill development
- Networking advice

Rules:
- Be professional but friendly
- Keep responses concise and practical
- Use markdown formatting when useful
- Encourage students positively
- Give actionable advice
`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'EduNite',
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      }
    )

    const data = await response.json()

    console.log('OPENROUTER RESPONSE:', data)

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || 'AI request failed',
        },
        { status: 500 }
      )
    }

    const aiResponse =
      data.choices?.[0]?.message?.content ||
      'No response generated.'

    return NextResponse.json({
      response: aiResponse,
    })
  } catch (error: any) {
    console.error('AI CHAT ERROR:', error)

    return NextResponse.json(
      {
        error: error.message || 'Something went wrong',
      },
      { status: 500 }
    )
  }
}