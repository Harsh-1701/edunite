// app/admin/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { 
  Users, GraduationCap, Briefcase, Shield, Plus, Search,
  Trash2, Edit, Check, X, Download, Upload, Eye
} from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  _id: string
  name: string
  email: string
  role: string
  branch?: string
  company?: string
  isVerified?: boolean
  createdAt: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'alumni' | 'faculty'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Add user form
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    branch: '',
    company: '',
    graduationYear: '',
    usn: '',
    designation: '',
  })

  // Fetch users
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (res.ok) {
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success('User added successfully!')
        setShowAddModal(false)
        setNewUser({
          name: '',
          email: '',
          password: '',
          role: 'student',
          branch: '',
          company: '',
          graduationYear: '',
          usn: '',
          designation: '',
        })
        fetchUsers()
      } else {
        toast.error(data.error || 'Failed to add user')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })
      
      if (res.ok) {
        toast.success('User deleted')
        fetchUsers()
      } else {
        toast.error('Failed to delete user')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleVerifyUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'PATCH',
      })
      
      if (res.ok) {
        toast.success('User verified!')
        fetchUsers()
      }
    } catch (error) {
      toast.error('Failed to verify user')
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab.slice(0, -1) || (activeTab === 'faculty' && user.role === 'faculty')
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'from-purple-500 to-indigo-500' },
    { label: 'Students', value: users.filter(u => u.role === 'student').length, icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
    { label: 'Alumni', value: users.filter(u => u.role === 'alumni').length, icon: Briefcase, color: 'from-green-500 to-emerald-500' },
    { label: 'Faculty', value: users.filter(u => u.role === 'faculty').length, icon: Shield, color: 'from-orange-500 to-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage users and platform settings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs & Search */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
              {['all', 'students', 'alumni', 'faculty'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
              <p className="text-gray-500 dark:text-gray-400">Add users to see them here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Branch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          user.role === 'student' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                          user.role === 'alumni' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                          'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {user.branch || '-'}
                      </td>
                      <td className="px-6 py-4">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!user.isVerified && (
                            <button
                              onClick={() => handleVerifyUser(user._id)}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Verify User"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-5">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="student">Student</option>
                    <option value="alumni">Alumni</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Branch
                  </label>
                  <select
                    value={newUser.branch}
                    onChange={(e) => setNewUser(prev => ({ ...prev, branch: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics (ECE)</option>
                    <option value="ME">Mechanical (ME)</option>
                    <option value="CE">Civil (CE)</option>
                    <option value="EE">Electrical (EE)</option>
                    <option value="IT">Information Technology (IT)</option>
                  </select>
                </div>

                {/* USN - for students */}
                {newUser.role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      USN
                    </label>
                    <input
                      type="text"
                      value={newUser.usn}
                      onChange={(e) => setNewUser(prev => ({ ...prev, usn: e.target.value }))}
                      placeholder="e.g., 1XX21CS001"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Company - for alumni */}
                {newUser.role === 'alumni' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={newUser.company}
                      onChange={(e) => setNewUser(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g., Google, Microsoft"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Designation - for faculty */}
                {newUser.role === 'faculty' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Designation
                    </label>
                    <select
                      value={newUser.designation}
                      onChange={(e) => setNewUser(prev => ({ ...prev, designation: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select Designation</option>
                      <option value="Professor">Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="HOD">HOD</option>
                    </select>
                  </div>
                )}

                {/* Graduation Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={newUser.graduationYear}
                    onChange={(e) => setNewUser(prev => ({ ...prev, graduationYear: e.target.value }))}
                    placeholder="e.g., 2024"
                    min="1990"
                    max="2030"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}