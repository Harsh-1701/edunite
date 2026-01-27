// components/layout/Header.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  GraduationCap, 
  MessageCircle, 
  Moon, 
  Sun, 
  Menu, 
  X,
  User,
  LogOut,
  Bell
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { Avatar } from '@/components/ui/Avatar'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/stats', label: 'Stats' },
  { href: '/stories', label: 'Stories' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Edu<span className="text-purple-600">Nite</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === link.href
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            
            {/* Messages Icon */}
            <Link href="/messages">
              <button className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                  3
                </span>
              </button>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                    5
                  </span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs font-medium rounded-full capitalize">
                            {user.role}
                          </span>
                        </div>
                        <div className="p-2">
                          <Link
                            href={`/dashboard`}
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              logout()
                              setIsUserMenuOpen(false)
                            }}
                            className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <nav className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link href="/login">
                <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl">
                  Login / Signup
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}