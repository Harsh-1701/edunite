// app/faq/page.tsx
// FAQ Page

'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What is EduNite?', a: 'EduNite is a digital alumni-student mentorship platform that connects current students with verified alumni for mentorship, career guidance, internships, and job referrals.' },
      { q: 'Is EduNite free to use?', a: 'Yes! EduNite is completely free for students. Alumni volunteer their time to give back to the community. There are no hidden charges.' },
      { q: 'Who can join EduNite?', a: 'Any current student or alumni of participating colleges can join. Students can sign up to find mentors, while alumni can register to become mentors.' },
    ]
  },
  {
    category: 'For Students',
    questions: [
      { q: 'How do I find the right mentor?', a: 'Our AI-powered recommendation system matches you with alumni based on your interests, career goals, branch, and background. You can also manually search and filter alumni.' },
      { q: 'How do I connect with an alumni?', a: 'Send a mentorship request with a brief message explaining your goals. Once the alumni accepts, you can start chatting directly on the platform.' },
      { q: 'What is the AI Resume Review feature?', a: 'Upload your resume and our AI will analyze it, providing feedback on content, structure, keywords, and areas for improvement to help you stand out.' },
      { q: 'Can I have multiple mentors?', a: 'Yes! You can connect with multiple alumni based on different needs - one for technical guidance, another for career advice, etc.' },
    ]
  },
  {
    category: 'For Alumni',
    questions: [
      { q: 'How do I become a verified mentor?', a: 'Sign up as an alumni, complete your profile with your graduation details and current work information. Our admin team will verify your credentials within 24-48 hours.' },
      { q: 'How much time commitment is required?', a: 'Its completely flexible! You can mentor as little or as much as you want. Even 30 minutes a week can make a huge difference.' },
      { q: 'Can I refer students to my company?', a: 'Absolutely! Many alumni use EduNite to find talented students from their alma mater for internships and full-time positions.' },
    ]
  },
  {
    category: 'Privacy & Safety',
    questions: [
      { q: 'How is my data protected?', a: 'We take privacy seriously. Your personal information is encrypted and never shared with third parties. You control what information is visible on your profile.' },
      { q: 'Are all alumni verified?', a: 'Yes, every alumni goes through a verification process where our admin team validates their graduation records and current employment status.' },
      { q: 'How do I report inappropriate behavior?', a: 'You can report any concerning behavior through the platform. Our team investigates all reports within 24 hours and takes appropriate action.' },
    ]
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find answers to common questions about EduNite
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`
                  const isOpen = openItems.includes(itemId)
                  
                  return (
                    <div 
                      key={qIndex} 
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <a 
            href="mailto:support@edunite.com"
            className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}