// components/home/Hero.tsx
// Main hero section on homepage

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute w-80 h-80 top-1/4 right-0 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute w-72 h-72 bottom-0 left-1/4 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">AI-Powered Mentorship Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Bridge Generations.
          </span>
          <br />
          <span>Build Futures.</span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in">
          Connect with verified alumni for mentorship, careers, internships, and growth. 
          Your future starts with the right guidance.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link href="/signup?role=student">
            <Button size="lg" className="group w-full sm:w-auto">
              Join as Student
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/signup?role=alumni">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Join as Alumni
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in">
          {[
            { value: '5000+', label: 'Alumni' },
            { value: '10000+', label: 'Students' },
            { value: '2500+', label: 'Mentorships' },
            { value: '25+', label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}