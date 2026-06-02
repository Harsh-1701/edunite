'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleReset = async () => {
    if (!email) return

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          'http://localhost:3000/reset-password',
      }
    )

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(
        'Password reset email sent successfully.'
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081120] px-6">
      <div className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

        <h1 className="text-4xl font-bold text-white mb-3">
          Forgot Password
        </h1>

        <p className="text-slate-400 mb-8">
          Enter your email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full h-14 rounded-2xl bg-white/[0.05] border border-white/10 px-5 text-white outline-none"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold mt-6 hover:scale-[1.02] transition"
        >
          {loading
            ? 'Sending...'
            : 'Send Reset Link'}
        </button>

        {message && (
          <p className="text-sm text-slate-300 mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}