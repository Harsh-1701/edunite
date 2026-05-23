// app/dashboard/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  Users, MessageCircle, Calendar, Award, TrendingUp,
  Briefcase, Settings, ChevronRight,
  GraduationCap, Star, LogOut, Search, Bot, Send
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAlumni: 0,
    totalStudents: 0,
    totalFaculty: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const isAlumniOrFaculty = user.role === 'alumni' || user.role === 'faculty'

  const userStats = [
    { label: 'Mentorship Sessions', value: '0', icon: Users, color: 'from-purple-500 to-indigo-500' },
    { label: 'Messages', value: '0', icon: MessageCircle, color: 'from-blue-500 to-cyan-500' },
    { label: 'Connections', value: '0', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Achievements', value: '1', icon: Award, color: 'from-orange-500 to-yellow-500' },
  ]

  const quickActions = [
    {
      label: isAlumniOrFaculty ? 'Find Students' : 'Find Mentors',
      href: '/explore',
      icon: Search,
      description: isAlumniOrFaculty ? 'Browse student profiles' : 'Browse alumni profiles'
    },
    { label: 'Messages', href: '/messages', icon: MessageCircle, description: 'Chat with connections' },
    { label: 'AI Assistant', href: '/messages?tab=ai-assistant', icon: Bot, description: 'Get career guidance' },
    { label: 'Settings', href: '/settings', icon: Settings, description: 'Update your profile' },
  ]

  const gettingStarted = [
    { text: 'Complete your profile for better matches', href: '/settings', icon: Star },
    { text: isAlumniOrFaculty ? 'Browse students from your branch' : 'Explore alumni from your branch', href: '/explore', icon: Search },
    { text: 'Try our AI career assistant', href: '/messages?tab=ai-assistant', icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user.name?.split(' ')[0]}! 👋
              </h1>
              <p className="opacity-90">
                {user.role === 'student' && 'Find mentors and kickstart your career journey.'}
                {user.role === 'alumni' && 'Help students and give back to your alma mater.'}
                {user.role === 'faculty' && 'Guide students and manage the platform.'}
                {user.role === 'admin' && 'Manage the platform and oversee operations.'}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">{user.role}</span>
                {(user as any).branch && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{(user as any).branch}</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/settings">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />Settings
                </button>
              </Link>
              <button onClick={logout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" />Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                        <action.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{action.label}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{action.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Platform Stats */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Platform Overview</h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Students</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAlumni || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Alumni</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFaculty || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Faculty</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started - Working links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <div className="space-y-3">
                {gettingStarted.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer group">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                        <item.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{item.text}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete your profile to get better mentor recommendations!
                </p>
                <Link href="/settings">
                  <button className="mt-3 text-sm text-purple-600 font-medium hover:underline">
                    Complete Profile →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}