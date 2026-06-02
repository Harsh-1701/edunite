'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleReset = async () => {
    if (!password) return

    setLoading(true)

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    if (error) {
      alert(error.message)
    } else {
      alert('Password updated successfully')

      router.push('/login')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081120] px-6">
      <div className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

        <h1 className="text-4xl font-bold text-white mb-3">
          Reset Password
        </h1>

        <p className="text-slate-400 mb-8">
          Enter your new password.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full h-14 rounded-2xl bg-white/[0.05] border border-white/10 px-5 text-white outline-none"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold mt-6 hover:scale-[1.02] transition"
        >
          {loading
            ? 'Updating...'
            : 'Update Password'}
        </button>
      </div>
    </div>
  )
}