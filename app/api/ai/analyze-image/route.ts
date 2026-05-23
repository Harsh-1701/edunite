// app/api/ai/analyze-image/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken, verifyToken } from '@/lib/auth'
import Tesseract from 'tesseract.js'

export async function POST(req: NextRequest) {
  try {
    // AUTH
    const token = await getAuthToken()

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // BODY
    const { image, prompt } = await req.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // OCR TEXT EXTRACTION
    const result = await Tesseract.recognize(
      image,
      'eng'
    )

    const extractedText =
      result.data.text

    console.log(
      'EXTRACTED TEXT:',
      extractedText
    )

    // SEND TO OPENROUTER
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'Content-Type': 'application/json',

          'HTTP-Referer':
            'http://localhost:3000',

          'X-Title': 'EduNite',
        },

        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',

          messages: [
            {
              role: 'system',

              content: `
You are EduNite AI Assistant.

Analyze extracted text from certificates, resumes, educational screenshots, or career-related documents.

Provide:
- achievement explanation
- suggestions
- resume improvements
- LinkedIn caption if relevant
- professional guidance

Keep response concise and intelligent.
`,
            },

            {
              role: 'user',

              content: `
Prompt:
${prompt || 'Analyze this content professionally.'}

Extracted Text:
${extractedText}
`,
            },
          ],
        }),
      }
    )

    const data = await response.json()

    console.log(
      'OCR AI RESPONSE:',
      data
    )

    const aiResponse =
      data?.choices?.[0]?.message
        ?.content

    if (!aiResponse) {
      throw new Error(
        'No AI response received'
      )
    }

    return NextResponse.json({
      response: aiResponse,
    })
  } catch (error: any) {
    console.error(
      'OCR IMAGE ANALYSIS ERROR:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Failed to analyze image',
      },
      { status: 500 }
    )
  }
}