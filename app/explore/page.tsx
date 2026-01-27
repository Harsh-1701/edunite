// app/explore/page.tsx
// Explore Alumni Page

'use client'

import React, { useState } from 'react'
import { Search, Filter, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react'

const dummyAlumni = [
  { id: 1, name: 'Rahul Kumar', branch: 'CSE', year: 2020, company: 'Google', role: 'Software Engineer', location: 'Bangalore', domain: 'Software' },
  { id: 2, name: 'Priya Sharma', branch: 'ECE', year: 2019, company: 'Microsoft', role: 'Product Manager', location: 'Hyderabad', domain: 'Software' },
  { id: 3, name: 'Amit Patel', branch: 'ME', year: 2018, company: 'Tesla', role: 'Mechanical Engineer', location: 'USA', domain: 'Core Engineering' },
  { id: 4, name: 'Sneha Reddy', branch: 'CSE', year: 2021, company: 'Amazon', role: 'SDE', location: 'Bangalore', domain: 'Software' },
  { id: 5, name: 'Vikram Singh', branch: 'EE', year: 2017, company: 'ISRO', role: 'Scientist', location: 'Delhi', domain: 'Government' },
  { id: 6, name: 'Ananya Gupta', branch: 'CE', year: 2020, company: 'L&T', role: 'Civil Engineer', location: 'Mumbai', domain: 'Core Engineering' },
  { id: 7, name: 'Karthik Nair', branch: 'IT', year: 2019, company: 'Goldman Sachs', role: 'Analyst', location: 'Bangalore', domain: 'Finance' },
  { id: 8, name: 'Meera Joshi', branch: 'CSE', year: 2022, company: 'Startup', role: 'Founder', location: 'Pune', domain: 'Entrepreneurship' },
]

const branches = ['All', 'CSE', 'ECE', 'ME', 'EE', 'CE', 'IT']
const domains = ['All', 'Software', 'Core Engineering', 'Finance', 'Government', 'Entrepreneurship']

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('All')
  const [selectedDomain, setSelectedDomain] = useState('All')

  const filteredAlumni = dummyAlumni.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(search.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(search.toLowerCase())
    const matchesBranch = selectedBranch === 'All' || alumni.branch === selectedBranch
    const matchesDomain = selectedDomain === 'All' || alumni.domain === selectedDomain
    return matchesSearch && matchesBranch && matchesDomain
  })

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
                {alumni.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{alumni.name}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                <Building className="w-4 h-4" />
                <span>{alumni.company}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <Briefcase className="w-4 h-4" />
                <span>{alumni.role}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{alumni.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <GraduationCap className="w-4 h-4" />
                <span>{alumni.branch} • {alumni.year}</span>
              </div>

              {/* Connect Button */}
              <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
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