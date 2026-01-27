// app/stats/page.tsx
// Statistics Page

'use client'

import React from 'react'
import { Globe, MapPin, Briefcase, GraduationCap, Users, Building, TrendingUp, Award } from 'lucide-react'

const stats = {
  overview: [
    { label: 'Total Alumni', value: '5,000+', icon: Users },
    { label: 'Total Students', value: '10,000+', icon: GraduationCap },
    { label: 'Mentorships', value: '2,500+', icon: TrendingUp },
    { label: 'Countries', value: '25+', icon: Globe },
  ],
  byCountry: [
    { name: 'India', count: 3200, percentage: 64 },
    { name: 'USA', count: 850, percentage: 17 },
    { name: 'UAE', count: 320, percentage: 6 },
    { name: 'UK', count: 280, percentage: 6 },
    { name: 'Germany', count: 180, percentage: 4 },
    { name: 'Others', count: 170, percentage: 3 },
  ],
  byCity: [
    { name: 'Bangalore', count: 1200 },
    { name: 'Delhi NCR', count: 800 },
    { name: 'Mumbai', count: 650 },
    { name: 'Hyderabad', count: 550 },
    { name: 'Pune', count: 400 },
    { name: 'Chennai', count: 350 },
    { name: 'Kolkata', count: 200 },
    { name: 'Jaipur', count: 150 },
  ],
  byDomain: [
    { name: 'Software & IT', count: 2100, percentage: 42, color: 'bg-purple-500' },
    { name: 'Core Engineering', count: 900, percentage: 18, color: 'bg-blue-500' },
    { name: 'Finance & Banking', count: 600, percentage: 12, color: 'bg-green-500' },
    { name: 'Research & Academia', count: 500, percentage: 10, color: 'bg-yellow-500' },
    { name: 'Entrepreneurship', count: 500, percentage: 10, color: 'bg-orange-500' },
    { name: 'Government', count: 400, percentage: 8, color: 'bg-red-500' },
  ],
  byBranch: [
    { name: 'CSE', count: 1800, percentage: 36 },
    { name: 'ECE', count: 1000, percentage: 20 },
    { name: 'ME', count: 750, percentage: 15 },
    { name: 'EE', count: 600, percentage: 12 },
    { name: 'CE', count: 500, percentage: 10 },
    { name: 'IT', count: 350, percentage: 7 },
  ],
  topCompanies: [
    { name: 'Google', count: 120 },
    { name: 'Microsoft', count: 95 },
    { name: 'Amazon', count: 88 },
    { name: 'Apple', count: 45 },
    { name: 'Meta', count: 40 },
    { name: 'Goldman Sachs', count: 35 },
  ],
}

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Platform Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real-time insights about our alumni network
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.overview.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* By Country */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Country</h2>
            </div>
            <div className="space-y-4">
              {stats.byCountry.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-gray-500">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By City */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Cities</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.byCity.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.count}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* By Domain */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Domain</h2>
            </div>
            <div className="space-y-3">
              {stats.byDomain.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="text-gray-500">{item.count}</span>
                  <span className="text-gray-400 text-sm">({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* By Branch */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni by Branch</h2>
            </div>
            <div className="space-y-4">
              {stats.byBranch.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-gray-500">{item.count} ({item.percentage}%)</span>
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

          {/* Top Companies */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <Building className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Companies</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.topCompanies.map((company, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{company.count}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{company.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}