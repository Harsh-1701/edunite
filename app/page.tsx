'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import {
  ArrowRight,
  Users,
  GraduationCap,
  Handshake,
  Globe,
  Briefcase,
  MapPin,
  MessageCircle,
  FileText,
  TrendingUp,
  Award,
  Heart,
} from 'lucide-react'

const AlumniMap = dynamic(
  () => import('@/components/home/AlumniMap'),
  {
    ssr: false,
  }
)

const overallStats = [
  {
    icon: GraduationCap,
    value: '5,000+',
    label: 'Verified Alumni',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Students',
  },
  {
    icon: Handshake,
    value: '2,500+',
    label: 'Mentorships',
  },
  {
    icon: Globe,
    value: '25+',
    label: 'Countries',
  },
]

const studentFeatures = [
  {
    icon: Users,
    title: 'Find Mentors',
    description:
      'Connect with verified alumni for guidance',
  },
  {
    icon: FileText,
    title: 'AI Resume Review',
    description:
      'Get intelligent resume feedback instantly',
  },
  {
    icon: Briefcase,
    title: 'Internship Access',
    description:
      'Discover exclusive opportunities',
  },
  {
    icon: MessageCircle,
    title: 'Direct Messaging',
    description:
      'Chat directly with mentors and alumni',
  },
]

const alumniFeatures = [
  {
    icon: Heart,
    title: 'Give Back',
    description:
      'Help students navigate their careers',
  },
  {
    icon: TrendingUp,
    title: 'Build Network',
    description:
      'Connect with alumni worldwide',
  },
  {
    icon: Award,
    title: 'Create Impact',
    description:
      'Guide future professionals',
  },
  {
    icon: GraduationCap,
    title: 'Hire Talent',
    description:
      'Recruit skilled students easily',
  },
]

const testimonials = [
  {
    quote:
      'EduNite helped me connect with amazing mentors and improve my resume significantly.',
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
  },
  {
    quote:
      'This platform creates meaningful alumni-student connections in a very professional way.',
    name: 'Rahul Verma',
    role: 'Senior Product Manager at Microsoft',
  },
  {
    quote:
      'The AI mentorship and resume guidance features are genuinely useful.',
    name: 'Ananya Patel',
    role: 'ECE Student',
  },
]

export default function HomePage() {

  const router = useRouter()

  const { user } = useAuth()

  const handleJoin = (role: string) => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push(`/signup?role=${role}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />

          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
        </div>

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">

          {/* BADGE */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-purple-200">
              <GraduationCap className="w-4 h-4" />

              AI Powered Alumni Mentorship Platform
            </div>
          </div>

          {/* HEADING */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">

              Connect Students
              <br />

              <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                With Global Alumni
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-8">
              EduNite bridges the gap between students and alumni through mentorship,
              internships, AI tools, networking, and career guidance.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link href="/signup?role=student">
              <button className="group w-64 sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">

                Join as Student

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/signup?role=alumni">
              <button className="w-64 sm:w-auto px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold hover:bg-white/10 transition-all duration-300">

                Join as Alumni
              </button>
            </Link>

            <Link href="/signup?role=faculty">
              <button className="w-64 sm:w-auto px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold hover:bg-white/10 transition-all duration-300">

                Join as Faculty
              </button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">

            {overallStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-5">
                  <stat.icon className="w-6 h-6 text-purple-300" />
                </div>

                <div className="text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>

                <div className="mt-2 text-slate-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="py-24 px-6 border-t border-white/5">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">
              Global Alumni Network
            </h2>

            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Explore where EduNite alumni are working around the world.
            </p>
          </div>

          <AlumniMap />
        </div>
      </section>

            {/* AI ASSISTANT SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4">
              🤖 EduNite AI
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Personal Career Assistant
            </h2>

            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Get resume reviews, interview preparation, career guidance,
              internship roadmaps and personalized suggestions instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Try asking:
              </h3>

              <div className="space-y-3">

                <div className="p-4 rounded-2xl bg-white/5 text-slate-300">
                  Build my ECE resume
                </div>

                <div className="p-4 rounded-2xl bg-white/5 text-slate-300">
                  Prepare me for technical interviews
                </div>

                <div className="p-4 rounded-2xl bg-white/5 text-slate-300">
                  Suggest skills for VLSI jobs
                </div>

                <div className="p-4 rounded-2xl bg-white/5 text-slate-300">
                  Review my resume
                </div>

              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">

              <h3 className="text-2xl font-bold text-white mb-4">
                Start Using EduNite AI
              </h3>

              <p className="text-slate-300 mb-8">
                Get instant career guidance powered by AI.
              </p>

              <Link href="/messages?tab=ai-assistant">
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition-all">
                  Open AI Assistant
                </button>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Built For Students & Alumni
            </h2>

            <p className="mt-4 text-slate-400">
              Features designed to create meaningful mentorship.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* STUDENTS */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-purple-400" />

                For Students
              </h3>

              <div className="space-y-5">
                {studentFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-start gap-4">

                      <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                        <feature.icon className="w-6 h-6 text-purple-300" />
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold">
                          {feature.title}
                        </h4>

                        <p className="mt-2 text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ALUMNI */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-indigo-400" />

                For Alumni
              </h3>

              <div className="space-y-5">
                {alumniFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-start gap-4">

                      <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <feature.icon className="w-6 h-6 text-indigo-300" />
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold">
                          {feature.title}
                        </h4>

                        <p className="mt-2 text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 border-t border-white/5">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Success Stories
            </h2>

            <p className="mt-4 text-slate-400">
              Hear from our growing community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {testimonials.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <div className="text-purple-400 text-5xl mb-4">
                  "
                </div>

                <p className="text-slate-300 leading-8">
                  {item.quote}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="font-semibold text-lg">
                    {item.name}
                  </div>

                  <div className="text-slate-400 mt-1">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">

        <div className="max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-xl p-12 text-center">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Start Building
            <br />

            Meaningful Connections
          </h2>

          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
            Join EduNite and become part of a growing global alumni network.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <Link href="/signup">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold hover:scale-[1.02] transition-all">
                Get Started
              </button>
            </Link>

            <Link href="/explore">
              <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl font-semibold hover:bg-white/10 transition-all">
                Explore Alumni
              </button>
            </Link>

          </div>
        </div>
      </section>
    </div>
  )
}