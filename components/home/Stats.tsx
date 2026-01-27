// components/home/Stats.tsx
// Animated statistics section

'use client'

import React from 'react'
import { Users, GraduationCap, Handshake, Globe } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useCountUp } from '@/hooks/useCountUp'

const stats = [
  { icon: GraduationCap, value: 5000, label: 'Verified Alumni', suffix: '+' },
  { icon: Users, value: 10000, label: 'Active Students', suffix: '+' },
  { icon: Handshake, value: 2500, label: 'Mentorships', suffix: '+' },
  { icon: Globe, value: 25, label: 'Countries', suffix: '+' },
]

function StatCard({ icon: Icon, value, label, suffix, isVisible }: {
  icon: any
  value: number
  label: string
  suffix: string
  isVisible: boolean
}) {
  const count = useCountUp({ end: value, enabled: isVisible })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">{label}</p>
    </div>
  )
}

export function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Trusted by Thousands
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join our growing community of students and alumni
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}