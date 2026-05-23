// app/page.tsx
// Homepage - Complete Design

'use client'

import { Footer } from '@/components/layout/Footer'
import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Users, 
  GraduationCap, 
  Handshake, 
  Globe,
  Building,
  MapPin,
  Briefcase,
  Code,
  TrendingUp,
  Award,
  MessageCircle,
  FileText,
  Heart
} from 'lucide-react'

// Stats Data
const overallStats = [
  { icon: GraduationCap, value: '5,000+', label: 'Verified Alumni' },
  { icon: Users, value: '10,000+', label: 'Active Students' },
  { icon: Handshake, value: '2,500+', label: 'Mentorships' },
  { icon: Globe, value: '25+', label: 'Countries' },
]

const alumniByCountry = [
  { country: 'India', count: 3200, percentage: 64 },
  { country: 'USA', count: 850, percentage: 17 },
  { country: 'UAE', count: 320, percentage: 6 },
  { country: 'UK', count: 280, percentage: 6 },
  { country: 'Germany', count: 180, percentage: 4 },
  { country: 'Others', count: 170, percentage: 3 },
]

const alumniByCity = [
  { city: 'Bangalore', count: 1200 },
  { city: 'Delhi NCR', count: 800 },
  { city: 'Mumbai', count: 650 },
  { city: 'Hyderabad', count: 550 },
  { city: 'Pune', count: 400 },
  { city: 'Chennai', count: 350 },
]

const alumniByDomain = [
  { domain: 'Software & IT', count: 2100, color: 'bg-purple-500' },
  { domain: 'Core Engineering', count: 900, color: 'bg-blue-500' },
  { domain: 'Finance & Banking', count: 600, color: 'bg-green-500' },
  { domain: 'Government', count: 400, color: 'bg-yellow-500' },
  { domain: 'Research & Academia', count: 500, color: 'bg-pink-500' },
  { domain: 'Entrepreneurship', count: 500, color: 'bg-orange-500' },
]

const alumniByBranch = [
  { branch: 'CSE', count: 1800, percentage: 36 },
  { branch: 'ECE', count: 1000, percentage: 20 },
  { branch: 'ME', count: 750, percentage: 15 },
  { branch: 'EE', count: 600, percentage: 12 },
  { branch: 'CE', count: 500, percentage: 10 },
  { branch: 'Others', count: 350, percentage: 7 },
]

const studentFeatures = [
  { icon: Users, title: 'Find Mentors', description: 'Connect with verified alumni for guidance' },
  { icon: FileText, title: 'Resume Help', description: 'Get AI-powered resume feedback' },
  { icon: Briefcase, title: 'Job Referrals', description: 'Access exclusive opportunities' },
  { icon: MessageCircle, title: 'Direct Chat', description: 'Message mentors directly' },
]

const alumniFeatures = [
  { icon: Heart, title: 'Give Back', description: 'Guide the next generation' },
  { icon: GraduationCap, title: 'Hire Talent', description: 'Recruit from your alma mater' },
  { icon: Award, title: 'Build Legacy', description: 'Create lasting impact' },
  { icon: TrendingUp, title: 'Stay Connected', description: 'Network with fellow alumni' },
]

const testimonials = [
  {
    quote: "EduNite helped me land my dream job at Google. My mentor guided me through every step!",
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    branch: "CSE 2022"
  },
  {
    quote: "As an alumni, giving back to students has been incredibly rewarding. Great platform!",
    name: "Rahul Verma", 
    role: "Senior PM at Microsoft",
    branch: "CSE 2018"
  },
  {
    quote: "The AI resume review feature helped me improve my resume significantly.",
    name: "Ananya Patel",
    role: "Student, ECE 4th Year",
    branch: "ECE 2024"
  }
]

const faqs = [
  { q: "How do I find the right mentor?", a: "Our AI matches you with alumni based on your interests, career goals, and background." },
  { q: "Is EduNite free to use?", a: "Yes! EduNite is completely free for students. Alumni volunteer their time." },
  { q: "How are alumni verified?", a: "Our admin team verifies all alumni through their graduation records and employment." },
  { q: "Can I message alumni directly?", a: "Yes, once your mentorship request is accepted, you can chat freely." },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white pt-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium">AI-Powered Mentorship Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bridge Generations.
            <br />
            Build Futures.
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            Connect with verified alumni for mentorship, career guidance, internships, and professional growth.
          </p>

          {/* CTA Buttons */}
                    {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/signup?role=student">
              <button className="w-64 sm:w-auto px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2">
                Join as Student
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/signup?role=alumni">
              <button className="w-64 sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                Join as Alumni
              </button>
            </Link>
            <Link href="/signup?role=faculty">
              <button className="w-64 sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                Join as Faculty
              </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {overallStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Alumni Network
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover where our alumni are making an impact
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Alumni by Country */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Country</h3>
              </div>
              <div className="space-y-4">
                {alumniByCountry.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.country}</span>
                      <span className="text-gray-500 dark:text-gray-400">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni by City */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Top Cities in India</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {alumniByCity.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.count}</div>
                    <div className="text-gray-600 dark:text-gray-400">{item.city}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni by Domain */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Domain</h3>
              </div>
              <div className="space-y-3">
                {alumniByDomain.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{item.domain}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni by Branch */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Code className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Branch</h3>
              </div>
              <div className="space-y-4">
                {alumniByBranch.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{item.branch}</span>
                      <span className="text-gray-500 dark:text-gray-400">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose EduNite?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Features designed for students and alumni
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* For Students */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <GraduationCap className="w-8 h-8 text-purple-600" />
                For Students
              </h3>
              <div className="grid gap-4">
                {studentFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Alumni */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <Briefcase className="w-8 h-8 text-indigo-600" />
                For Alumni
              </h3>
              <div className="grid gap-4">
                {alumniFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Success Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hear from our community members
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="text-purple-500 text-4xl mb-4">"</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{item.quote}</p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.role}</div>
                  <div className="text-sm text-purple-600">{item.branch}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students and alumni building meaningful connections.
          </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <button className="w-64 sm:w-auto px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link href="/explore">
              <button className="w-64 sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                Explore Alumni
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
<Footer />