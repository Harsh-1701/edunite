// app/explore/page.tsx
// Explore Alumni Page
'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'


import { Search, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react'

const branches = ['All', 'CSE', 'ECE', 'ME', 'EE', 'CE', 'IT']
const domains = ['All', 'Software', 'Core Engineering', 'Finance', 'Government', 'Entrepreneurship']

export default function ExplorePage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('All')
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [alumni, setAlumni] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const loadAlumni = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'alumni')
        .order('name')

      if (!error && data) {
        setAlumni(data)
      }

      setLoading(false)
    }

    loadAlumni()
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user)
    })
  }, [])

  const filteredAlumni = alumni.filter(alumni => {
    const matchesSearch =
      (alumni.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (alumni.company ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesBranch = selectedBranch === 'All' || alumni.branch === selectedBranch
    const matchesDomain = selectedDomain === 'All' || (alumni.profession ?? '') === selectedDomain
    return matchesSearch && matchesBranch && matchesDomain
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081120]">
        <div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const connectWithAlumni = async (alumni: any) => {
  if (!currentUser) return

  // Don't create duplicate conversations
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .or(
      `and(user_one.eq.${currentUser.id},user_two.eq.${alumni.id}),and(user_one.eq.${alumni.id},user_two.eq.${currentUser.id})`
    )
    .single()

  if (existing) {
    router.push('/messages')
    return
  }

  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_one: currentUser.id,
      user_two: alumni.id,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  router.push('/messages')
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Alumni
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find and connect with verified alumni mentors
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch === 'All' ? 'All Branches' : branch}</option>
              ))}
            </select>

            {/* Domain Filter */}
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain === 'All' ? 'All Domains' : domain}</option>
              ))}
            </select>
          </div>
        </div>



        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                {alumni.name?.charAt(0) || '?'}
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{alumni.name}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                <Building className="w-4 h-4" />
                <span>{alumni.company}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <Briefcase className="w-4 h-4" />
                <span>{alumni.job_title}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{alumni.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <GraduationCap className="w-4 h-4" />
                <span>{alumni.branch} • {alumni.graduation_year}</span>
              </div>

              {/* Connect Button */}
              <button
                onClick={() => connectWithAlumni(alumni)}
                className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                Connect
              </button>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No alumni found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}