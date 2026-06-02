// app/settings/page.tsx

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  User, Mail, Building, MapPin, Briefcase, Save, ArrowLeft,
  Camera, Trash2, X, Github, MessageSquare
} from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

// Indian cities for autocomplete
const CITIES = [
  'Bengaluru, India', 'Mumbai, India', 'Delhi, India', 'Hyderabad, India',
  'Chennai, India', 'Kolkata, India', 'Pune, India', 'Ahmedabad, India',
  'Jaipur, India', 'Lucknow, India', 'Chandigarh, India', 'Bhopal, India',
  'Kochi, India', 'Indore, India', 'Nagpur, India', 'Visakhapatnam, India',
  'Coimbatore, India', 'Thiruvananthapuram, India', 'Gurgaon, India',
  'Noida, India', 'Guwahati, India', 'Mysuru, India', 'Mangaluru, India',
  'Hubballi, India', 'Belagavi, India', 'Dharwad, India', 'Davangere, India',
  'Shimoga, India', 'Tumkur, India', 'Raichur, India', 'Bellary, India',
  'New York, USA', 'San Francisco, USA', 'Seattle, USA', 'Austin, USA',
  'Chicago, USA', 'Boston, USA', 'Los Angeles, USA', 'London, UK',
  'Berlin, Germany', 'Toronto, Canada', 'Sydney, Australia', 'Singapore',
  'Dubai, UAE', 'Tokyo, Japan', 'Amsterdam, Netherlands',
]

export default function SettingsPage() {
  const { user, loading, refreshUser } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showEmailChange, setShowEmailChange] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailPassword, setEmailPassword] = useState('')
  const locationRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    company: '',
    jobTitle: '',
    location: '',
    linkedIn: '',
    github: '',
    discord: '',
    skills: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || '',
        email: user.email || '',
        bio: (user as any).bio || '',
        company: (user as any).company || '',
        jobTitle: (user as any).jobTitle || '',
        location: (user as any).location || '',
        linkedIn: (user as any).linkedIn || '',
        github: (user as any).github || '',
        discord: (user as any).discord || '',
        skills: Array.isArray((user as any).skills) ? (user as any).skills.join(', ') : '',
      })
      if (user.avatar) {
        setAvatarPreview(user.avatar)
      }
    }
  }, [user])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Close location dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'location') {
      if (value.length >= 1) {
        const filtered = CITIES.filter(city =>
          city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 6)
        setLocationSuggestions(filtered)
        setShowLocationDropdown(filtered.length > 0)
      } else {
        setShowLocationDropdown(false)
      }
    }
  }

  const selectLocation = (city: string) => {
    setFormData(prev => ({ ...prev, location: city }))
    setShowLocationDropdown(false)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleEmailChange = async () => {
    if (!newEmail || !emailPassword) {
      toast.error('Please fill in both fields')
      return
    }
    try {
      const res = await fetch('/api/user/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail, password: emailPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Email updated successfully! Please login again.')
        setShowEmailChange(false)
        setNewEmail('')
        setEmailPassword('')
        await refreshUser()
      } else {
        toast.error(data.error || 'Failed to update email')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          avatar: avatarPreview || '',
        }),
      })
      if (res.ok) {
        toast.success('Profile updated successfully!')
        await refreshUser()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to update profile')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your account and profile</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
            <div className="relative group">
              {avatarPreview ? (
                <img src={avatarPreview} alt={user.user_metadata?.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100 dark:ring-purple-900/30" />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold ring-4 ring-purple-100 dark:ring-purple-900/30">
                  {(user.user_metadata?.name || user.email || 'U')
  .split(' ')
  .map((n: string) => n[0])
  .join('')
  .toUpperCase()}
                </div>
              )}
              <button type="button" onClick={handleAvatarClick}
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </button>
              {avatarPreview && (
                <button type="button" onClick={handleRemoveAvatar}
                  className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.user_metadata?.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-sm rounded-full capitalize">{user.user_metadata?.role}</span>
              <p className="text-xs text-gray-400 mt-2">Click photo to change • Max 2MB</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
              </div>
            </div>

            {/* Email with change option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={formData.email} disabled
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
              </div>
              <button type="button" onClick={() => setShowEmailChange(!showEmailChange)}
                className="text-xs text-purple-600 hover:underline mt-1">
                {showEmailChange ? 'Cancel' : 'Change email address'}
              </button>

              {showEmailChange && (
                <div className="mt-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl space-y-3">
                  <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New email address"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none text-sm" />
                  <input type="password" value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="Current password (to confirm)"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none text-sm" />
                  <button type="button" onClick={handleEmailChange}
                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                    Update Email
                  </button>
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none resize-none" />
            </div>

            {/* Company & Job Title */}
            {(user.user_metadata?.role === 'alumni' || user.user_metadata?.role === 'faculty') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company / Organization</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Where do you work?"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Your role"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Location with autocomplete */}
            <div ref={locationRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                  onFocus={() => { if (formData.location.length >= 1) setShowLocationDropdown(true) }}
                  placeholder="Start typing city name..."
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
              </div>
              {showLocationDropdown && locationSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-xl shadow-xl overflow-hidden">
                  {locationSuggestions.map((city, index) => (
                    <button key={index} type="button" onClick={() => selectLocation(city)}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900/30 flex items-center gap-2 transition-colors">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn Profile</label>
              <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub Profile</label>
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="url" name="github" value={formData.github} onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
              </div>
            </div>

            {/* Discord */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discord Username</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="discord" value={formData.discord} onChange={handleChange}
                  placeholder="username#1234"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills (comma separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                placeholder="Python, JavaScript, Machine Learning..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none" />
            </div>

            <button type="submit" disabled={saving}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>
              ) : (
                <><Save className="w-5 h-5" />Save Changes</>
              )}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Delete Account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}