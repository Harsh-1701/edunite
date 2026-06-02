'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      const { error } =
        await supabase.auth.signInWithPassword(
          {
            email,
            password,
          }
        )

      if (error) {
        alert(error.message)
        return
      }

      router.push('/dashboard')

      router.refresh()
    } catch (error) {
      console.error(error)

      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081120] px-6">

      <div className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

        <h1 className="text-4xl font-bold text-white mb-3">
          Login
        </h1>

        <p className="text-slate-400 mb-8">
          Welcome back to EduNite
        </p>

        <div className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-14 rounded-2xl bg-white/[0.05] border border-white/10 pl-12 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full h-14 rounded-2xl bg-white/[0.05] border border-white/10 pl-12 pr-12 text-white outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() =>
                  router.push(
                    '/forgot-password'
                  )
                }
                className="text-sm text-violet-400 hover:text-violet-300 transition"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>

          {/* SIGNUP */}
          <p className="text-center text-slate-400">
            Don&apos;t have an account?{' '}

            <button
              onClick={() =>
                router.push('/signup')
              }
              className="text-violet-400 hover:text-violet-300"
            >
              Sign up
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}