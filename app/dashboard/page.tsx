// app/dashboard/page.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { 
  Users, MessageCircle, Calendar, Award, TrendingUp, 
  Briefcase, FileText, Bell, Settings, ChevronRight,
  GraduationCap, Star, Clock, CheckCircle
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <GraduationCap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Please Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to login to access your dashboard.
            </p>
            <Link href="/login">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Mentorship Sessions', value: '12', icon: Users, color: 'from-purple-500 to-indigo-500' },
    { label: 'Messages', value: '48', icon: MessageCircle, color: 'from-blue-500 to-cyan-500' },
    { label: 'Upcoming Events', value: '3', icon: Calendar, color: 'from-green-500 to-emerald-500' },
    { label: 'Achievements', value: '5', icon: Award, color: 'from-orange-500 to-yellow-500' },
  ]

  const recentActivities = [
    { text: 'New message from Rahul Kumar', time: '5 min ago', icon: MessageCircle },
    { text: 'Mentorship session completed', time: '2 hours ago', icon: CheckCircle },
    { text: 'New job opportunity posted', time: '1 day ago', icon: Briefcase },
    { text: 'Profile viewed 15 times', time: '2 days ago', icon: TrendingUp },
  ]

  const quickActions = [
    { label: 'Find Mentors', href: '/explore', icon: Users },
    { label: 'Messages', href: '/messages', icon: MessageCircle },
    { label: 'AI Resume Review', href: '/resume-review', icon: FileText },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name?.split(' ')[0]}! 👋
              </h1>
              <p className="opacity-90">
                Here is what is happening with your account today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
          
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                          <action.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{action.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                      <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-purple-600 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}