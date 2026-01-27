// app/stories/page.tsx
// Success Stories Page

'use client'

import React from 'react'
import { Quote, GraduationCap, Briefcase, MapPin } from 'lucide-react'

const stories = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    branch: 'CSE 2022',
    location: 'Bangalore',
    image: null,
    story: 'When I was in my final year, I had no idea how to crack product-based companies. Through EduNite, I connected with Rahul, a Google engineer and our alumni. He mentored me for 3 months, helped with my DSA preparation, and even referred me. Today, I am living my dream at Google!',
    mentorName: 'Rahul Verma',
    mentorRole: 'Senior SWE at Google'
  },
  {
    id: 2,
    name: 'Amit Patel',
    role: 'Product Manager at Microsoft',
    branch: 'ECE 2021',
    location: 'Hyderabad',
    image: null,
    story: 'Transitioning from ECE to Product Management seemed impossible. My mentor on EduNite, Sneha, guided me through the entire process - from building my profile to preparing for PM interviews. Her insights from the industry were invaluable.',
    mentorName: 'Sneha Reddy',
    mentorRole: 'Senior PM at Amazon'
  },
  {
    id: 3,
    name: 'Kavya Singh',
    role: 'Founder, TechStartup',
    branch: 'CSE 2020',
    location: 'Pune',
    image: null,
    story: 'I always wanted to start my own company but didnt know where to begin. Through EduNite, I connected with multiple alumni entrepreneurs who shared their journeys. Their advice on fundraising and building a team was crucial for my startups success.',
    mentorName: 'Multiple Mentors',
    mentorRole: 'Alumni Entrepreneurs'
  },
  {
    id: 4,
    name: 'Rajesh Kumar',
    role: 'Research Scientist at ISRO',
    branch: 'ME 2019',
    location: 'Bangalore',
    image: null,
    story: 'Getting into ISRO was my childhood dream. My EduNite mentor, who was already at ISRO, helped me understand the recruitment process, guided my research focus, and motivated me throughout my preparation journey.',
    mentorName: 'Dr. Vijay Sharma',
    mentorRole: 'Scientist at ISRO'
  },
  {
    id: 5,
    name: 'Ananya Gupta',
    role: 'Investment Banker at Goldman Sachs',
    branch: 'CSE 2021',
    location: 'Mumbai',
    image: null,
    story: 'Breaking into investment banking from an engineering background is tough. My mentor from Goldman Sachs helped me understand the finance world, prepare for interviews, and even reviewed my resume multiple times.',
    mentorName: 'Vikram Malhotra',
    mentorRole: 'VP at Goldman Sachs'
  },
  {
    id: 6,
    name: 'Deepak Joshi',
    role: 'ML Engineer at OpenAI',
    branch: 'CSE 2020',
    location: 'San Francisco',
    image: null,
    story: 'Moving to the US for my dream job at OpenAI would not have been possible without my EduNite mentor. From visa guidance to interview prep for AI roles, the mentorship I received was life-changing.',
    mentorName: 'Arjun Krishnan',
    mentorRole: 'Research Scientist at DeepMind'
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Real stories from students whose lives were transformed through EduNite mentorship
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              
              {/* Story Content */}
              <div className="p-6">
                <Quote className="w-10 h-10 text-purple-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  "{story.story}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{story.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Briefcase className="w-4 h-4" />
                      {story.role}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <GraduationCap className="w-4 h-4" />
                      {story.branch}
                    </div>
                  </div>
                </div>

                {/* Mentor Info */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mentored by</p>
                  <p className="font-medium text-purple-600">{story.mentorName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{story.mentorRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Want to be the next success story?</p>
          <a 
            href="/signup" 
            className="inline-flex px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Join EduNite Today
          </a>
        </div>
      </div>
    </div>
  )
}