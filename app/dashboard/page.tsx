'use client'

import React, {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import {
  Users,
  MessageCircle,
  Award,
  TrendingUp,
  Briefcase,
  Settings,
  ChevronRight,
  GraduationCap,
  Star,
  LogOut,
  Search,
  Bot,
} from 'lucide-react'

import { useAuth } from '@/components/providers/AuthProvider'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  const router = useRouter()

  const [stats, setStats] = useState({
    totalUsers: 5000,
    totalAlumni: 2000,
    totalStudents: 2800,
    totalFaculty: 200,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081120]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" />

          <p className="text-slate-400">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const name =
    user.user_metadata?.name ||
    user.email ||
    'User'

  const role =
    user.user_metadata?.role ||
    'student'

  const userStats = [
  {
    label: 'Profile Completion',
    value: '65%',
    icon: Users,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    label: 'Resume Score',
    value: '78',
    icon: Award,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Mentors Available',
    value: '143',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Achievements',
    value: '1',
    icon: TrendingUp,
    color: 'from-orange-500 to-yellow-500',
  },
]

  const quickActions = [
    {
      label:
        role === 'alumni' ||
        role === 'faculty'
          ? 'Find Students'
          : 'Find Mentors',

      href: '/explore',

      icon: Search,

      description:
        role === 'alumni' ||
        role === 'faculty'
          ? 'Browse student profiles'
          : 'Browse alumni profiles',
    },

    {
      label: 'Messages',

      href: '/messages',

      icon: MessageCircle,

      description:
        'Chat with connections',
    },

    {
      label: 'AI Assistant',
      href: '/ai-assistant',
      icon: Bot,
      description: 'Resume reviews, interview prep and career guidance',
    },

    {
      label: 'Settings',

      href: '/settings',

      icon: Settings,

      description:
        'Update your profile',
    },
  ]

  const gettingStarted = [
    {
      text:
        'Complete your profile for better matches',

      href: '/settings',

      icon: Star,
    },

    {
      text:
        role === 'alumni' ||
        role === 'faculty'
          ? 'Browse students from your branch'
          : 'Explore alumni from your branch',

      href: '/explore',

      icon: Search,
    },

    {
      text:
        'Try our AI career assistant',

      href:
        '/messages?tab=ai-assistant',

      icon: Bot,
    },
  ]

  return (
    <div className="min-h-screen bg-[#081120] pt-28 pb-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[32px] p-8 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome,
                {' '}
                {name.split(' ')[0]}
                ! 👋
              </h1>

              <p className="opacity-90">
                Welcome back to EduNite.
              </p>

              <div className="flex items-center gap-2 mt-3">

                <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
                  {role}
                </span>

              </div>
            </div>

            <div className="flex gap-3">

              <Link href="/settings">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>

            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {userStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <div
                className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              <div className="text-3xl font-bold text-white">
                {stat.value}
              </div>

              <div className="text-slate-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* AI RECOMMENDATIONS */}
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                🤖
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  AI Career Recommendations
                </h2>

                <p className="text-slate-400 text-sm">
                  Personalized suggestions for you
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-white/5 rounded-2xl p-4">
                <h3 className="font-medium text-white mb-2">
                  Improve LinkedIn
                </h3>

                <p className="text-slate-400 text-sm">
                  Add projects and achievements to increase visibility.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <h3 className="font-medium text-white mb-2">
                  Learn Python
                </h3>

                <p className="text-slate-400 text-sm">
                  Frequently requested skill for internships.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <h3 className="font-medium text-white mb-2">
                  Connect with Alumni
                </h3>

                <p className="text-slate-400 text-sm">
                  Reach out to alumni working in industry.
                </p>
              </div>

            </div>
          </div>

        {/* QUICK ACTIONS */}
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {quickActions.map(
                (action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                  >
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all cursor-pointer group h-full">

                      <div className="flex items-start gap-4">

                        <div className="p-3 bg-purple-500/10 rounded-xl">
                          <action.icon className="w-6 h-6 text-purple-400" />
                        </div>

                        <div className="flex-1">

                          <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                            {action.label}
                          </h3>

                          <p className="text-sm text-slate-400 mt-1">
                            {action.description}
                          </p>

                        </div>

                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />

                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div>

            <h2 className="text-xl font-semibold text-white mb-4">
              Getting Started
            </h2>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">

              <div className="space-y-3">

                {gettingStarted.map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                    >
                      <div className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl hover:bg-purple-500/10 transition-colors cursor-pointer group">

                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <item.icon className="w-4 h-4 text-purple-400" />
                        </div>

                        <div className="flex-1">

                          <p className="text-sm text-white group-hover:text-purple-400 transition-colors">
                            {item.text}
                          </p>

                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />

                      </div>
                    </Link>
                  )
                )}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl border border-white/10">

                <h4 className="font-medium text-white mb-2">
                  💡 Pro Tip
                </h4>

                <p className="text-sm text-slate-400">
                  Complete your profile to
                  get better mentor
                  recommendations.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

