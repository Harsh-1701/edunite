// components/home/Features.tsx
// Features section showing what EduNite offers

'use client'

import React from 'react'
import { 
  Users, FileText, Briefcase, Globe, 
  GraduationCap, Heart, MessageCircle, Award 
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

const studentFeatures = [
  {
    icon: Users,
    title: 'Find Mentors',
    description: 'Connect with verified alumni who can guide your career path',
  },
  {
    icon: FileText,
    title: 'Resume Help',
    description: 'Get AI-powered feedback and tips to improve your resume',
  },
  {
    icon: Briefcase,
    title: 'Job Referrals',
    description: 'Access exclusive job opportunities through alumni networks',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Build connections with professionals worldwide',
  },
]

const alumniFeatures = [
  {
    icon: Heart,
    title: 'Give Back',
    description: 'Make a difference by guiding the next generation',
  },
  {
    icon: GraduationCap,
    title: 'Hire Talent',
    description: 'Find and recruit talented students from your alma mater',
  },
  {
    icon: MessageCircle,
    title: 'Share Knowledge',
    description: 'Share your experience and expertise with eager learners',
  },
  {
    icon: Award,
    title: 'Build Legacy',
    description: 'Create lasting impact through meaningful mentorship',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you're a student seeking guidance or an alumni looking to give back, 
            we've got you covered.
          </p>
        </div>

        {/* For Students */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-500" />
            For Students
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl inline-block mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* For Alumni */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-500" />
            For Alumni
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl inline-block mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}