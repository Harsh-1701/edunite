// app/login/page.tsx
// Login page with role selection

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { GraduationCap, Mail, Lock, ArrowLeft, User, Briefcase, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

type RoleType = 'student' | 'alumni' | 'faculty' | null

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
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
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'purple', description: 'Find mentors & guidance' },
    { id: 'alumni', label: 'Alumni', icon: Briefcase, color: 'indigo', description: 'Give back & mentor' },
    { id: 'faculty', label: 'Faculty (Admin)', icon: Shield, color: 'green', description: 'Manage platform' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to your EduNite account
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Login as
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id as RoleType)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedRole === role.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  }`}
                >
                  <role.icon className={`w-6 h-6 mx-auto mb-2 ${
                    selectedRole === role.id ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm font-medium ${
                    selectedRole === role.id ? 'text-purple-600' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {role.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !selectedRole}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}