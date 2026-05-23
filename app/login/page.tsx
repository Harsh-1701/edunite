// app/login/page.tsx

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap, Mail, Lock, ArrowLeft, Briefcase, Shield, Eye, EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

type RoleType = 'student' | 'alumni' | 'faculty' | null

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      toast.error('Please select a role first')
      return
    }
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Login successful!')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    {
      id: 'student' as RoleType,
      label: 'Student',
      icon: GraduationCap,
      description: 'Find mentors',
      gradient: 'from-purple-500 to-indigo-500',
      lightBg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-500',
      text: 'text-purple-600',
    },
    {
      id: 'alumni' as RoleType,
      label: 'Alumni',
      icon: Briefcase,
      description: 'Give back',
      gradient: 'from-blue-500 to-cyan-500',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500',
      text: 'text-blue-600',
    },
    {
      id: 'faculty' as RoleType,
      label: 'Faculty',
      icon: Shield,
      description: 'Guide & manage',
      gradient: 'from-green-500 to-emerald-500',
      lightBg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      text: 'text-green-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to your EduNite account
            </p>
          </div>

          {/* Role Selection - Colorful with gradients */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Login as
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all text-center overflow-hidden ${
                    selectedRole === role.id
                      ? `${role.border} ${role.lightBg} shadow-lg scale-[1.02]`
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                  }`}
                >
                  {selectedRole === role.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-10`} />
                  )}
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                      selectedRole === role.id
                        ? `bg-gradient-to-r ${role.gradient} shadow-md`
                        : `bg-gradient-to-r ${role.gradient} opacity-60`
                    }`}>
                      <role.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`text-sm font-semibold ${
                      selectedRole === role.id ? role.text : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {role.label}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${
                      selectedRole === role.id ? role.text + ' opacity-80' : 'text-gray-400'
                    }`}>
                      {role.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !selectedRole}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}