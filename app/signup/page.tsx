// app/signup/page.tsx

'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  GraduationCap, Mail, Lock, User, Building, ArrowLeft, Hash,
  Briefcase, Shield, ChevronRight, Check, Eye, EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'

type RoleType = 'student' | 'alumni' | 'faculty'
type AlumniProfession = 'employee' | 'employer' | 'freelancer' | 'government' | 'entrepreneur' | 'other'

const branches = [
  { value: 'CSE', label: 'Computer Science (CSE)' },
  { value: 'ECE', label: 'Electronics & Communication (ECE)' },
  { value: 'ME', label: 'Mechanical Engineering (ME)' },
  { value: 'CE', label: 'Civil Engineering (CE)' },
  { value: 'EE', label: 'Electrical Engineering (EE)' },
  { value: 'IT', label: 'Information Technology (IT)' },
  { value: 'Other', label: 'Other' },
]

const designations = [
  { value: 'Professor', label: 'Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'HOD', label: 'HOD (Head of Department)' },
  { value: 'Dean', label: 'Dean' },
  { value: 'Lab Instructor', label: 'Lab Instructor' },
  { value: 'Other', label: 'Other' },
]

const professions = [
  { id: 'employee', label: 'Employee', description: 'Working at a company' },
  { id: 'employer', label: 'Employer / Founder', description: 'Running own business' },
  { id: 'freelancer', label: 'Freelancer', description: 'Self-employed / Consultant' },
  { id: 'government', label: 'Government Job', description: 'Public sector employee' },
  { id: 'entrepreneur', label: 'Entrepreneur', description: 'Building a startup' },
  { id: 'other', label: 'Something Else', description: 'Describe your profession' },
]

function SignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    role: '' as RoleType | '',
    name: '',
    email: '',
    password: '',
    branch: '',
    usn: '',
    graduationYear: '',
    yearOfGraduation: '',
    profession: '' as AlumniProfession | '',
    companyName: '',
    jobTitle: '',
    otherProfession: '',
    designation: '',
    yearsOfExperience: '',
    specialization: '',
  })

  // Auto-set role from URL and skip to step 2
  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam && ['student', 'alumni', 'faculty'].includes(roleParam)) {
      setFormData(prev => ({ ...prev, role: roleParam as RoleType }))
      setStep(2)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const setRole = (role: RoleType) => {
    setFormData(prev => ({ ...prev, role }))
    setStep(2)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          branch: formData.branch,
          collegeId: formData.usn,
          graduationYear: formData.role === 'student' ? formData.graduationYear : formData.yearOfGraduation,
          profession: formData.profession,
          company: formData.companyName,
          jobTitle: formData.jobTitle,
          designation: formData.designation,
          yearsOfExperience: formData.yearsOfExperience,
          specialization: formData.specialization,
          otherProfession: formData.otherProfession,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    {
      id: 'student' as RoleType,
      label: 'Student',
      icon: GraduationCap,
      description: 'Find mentors, get career guidance & job referrals',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'alumni' as RoleType,
      label: 'Alumni',
      icon: Briefcase,
      description: 'Give back, mentor students & hire talent',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'faculty' as RoleType,
      label: 'Faculty',
      icon: Shield,
      description: 'Guide students & manage platform',
      color: 'from-green-500 to-emerald-500'
    },
  ]

  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + 4 - i)
  const alumniYears = Array.from({ length: 40 }, (_, i) => currentYear - i)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 py-24">
      <div className="w-full max-w-lg">

        {/* Back Button */}
        <button
          onClick={() => step > 1 ? setStep(step - 1) : router.push('/')}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? 'Back' : 'Back to Home'}
        </button>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-500'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 rounded ${step > s ? 'bg-purple-600' : 'bg-gray-200 dark:bg-slate-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Join EduNite
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Select how you want to join
                </p>
              </div>

              <div className="space-y-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setRole(role.id)}
                    className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-slate-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-r ${role.color} rounded-xl`}>
                        <role.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          {role.label}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {role.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Tell us about yourself
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* USN - Only for Students */}
                {formData.role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      USN (Unique Serial Number) *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="usn"
                        value={formData.usn}
                        onChange={handleChange}
                        placeholder="e.g., 1XX21CS001"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password with eye toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Create a Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Branch / Department *
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch.value} value={branch.value}>{branch.label}</option>
                    ))}
                  </select>
                </div>

                {/* Graduation Year - For Students */}
                {formData.role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Graduation Year *
                    </label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select Year</option>
                      {graduationYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Year of Graduation - For Alumni */}
                {formData.role === 'alumni' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year of Graduation *
                    </label>
                    <select
                      name="yearOfGraduation"
                      value={formData.yearOfGraduation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select Year</option>
                      {alumniYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Designation - For Faculty */}
                {formData.role === 'faculty' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Designation *
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select Designation</option>
                        {designations.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                        min="0"
                        max="50"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g., Machine Learning, Data Structures"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </form>
            </>
          )}

          {/* Step 3: Final Step */}
          {step === 3 && (
            <>
              {formData.role === 'alumni' ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Professional Details
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Tell us about your current profession
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        What do you do? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {professions.map((prof) => (
                          <button
                            key={prof.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, profession: prof.id as AlumniProfession }))}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              formData.profession === prof.id
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                                : 'border-gray-200 dark:border-slate-600 hover:border-purple-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {prof.label}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {prof.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {(formData.profession === 'employee' || formData.profession === 'employer' || formData.profession === 'government') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Organization Name *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="e.g., Google, Microsoft, ISRO"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {formData.profession && formData.profession !== 'other' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Job Title / Role *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g., Software Engineer, Product Manager"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {formData.profession === 'other' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Describe your profession *
                        </label>
                        <textarea
                          name="otherProfession"
                          value={formData.otherProfession}
                          onChange={handleChange}
                          placeholder="Tell us about what you do..."
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !formData.profession}
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Almost Done!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Review your details and create your account
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-5 mb-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Name</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Role</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Branch</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.branch}</span>
                    </div>
                    {formData.role === 'student' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">USN</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formData.usn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Graduation Year</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formData.graduationYear}</span>
                        </div>
                      </>
                    )}
                    {formData.role === 'faculty' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Designation</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formData.designation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Experience</span>
                          <span className="font-medium text-gray-900 dark:text-white">{formData.yearsOfExperience} years</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}