'use client'

import React, {
  useState,
  useEffect,
} from 'react'

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
  Bell,
  Settings,
} from 'lucide-react'

import { useTheme } from '@/context/ThemeContext'

import { Avatar } from '@/components/ui/Avatar'

import { useAuth } from '@/components/providers/AuthProvider'

import { supabase } from '@/lib/supabase'

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },

  {
    href: '/explore',
    label: 'Explore',
  },

  {
    href: '/stats',
    label: 'Stats',
  },

  {
    href: '/stories',
    label: 'Stories',
  },

  {
    href: '/faq',
    label: 'FAQ',
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] =
    useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false)

  const [isUserMenuOpen, setIsUserMenuOpen] =
    useState(false)

  const pathname = usePathname()

  const { user } = useAuth()

  const { isDark, toggleTheme } =
    useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    window.location.href = '/'
  }

  const userName =
    user?.user_metadata?.name ||
    user?.email ||
    'User'

  const userRole =
    user?.user_metadata?.role ||
    'student'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081120]/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">

              <GraduationCap className="w-6 h-6 text-white" />

            </div>

            <span className="text-xl font-bold text-white">

              Edu
              <span className="text-purple-500">
                Nite
              </span>

            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === link.href
                    ? 'text-purple-400 bg-white/10'
                    : 'text-slate-300 hover:text-purple-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* MESSAGES ONLY AFTER LOGIN */}
            {user && (
              <Link href="/messages">

                <button className="relative p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">

                  <MessageCircle className="w-5 h-5" />

                </button>

              </Link>
            )}

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <>
                {/* NOTIFICATIONS */}
                <button className="relative p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">

                  <Bell className="w-5 h-5" />

                </button>

                {/* USER MENU */}
                <div className="relative">

                  <button
                    onClick={() =>
                      setIsUserMenuOpen(
                        !isUserMenuOpen
                      )
                    }
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Avatar
                      name={userName}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50">

                      <div className="p-4 border-b border-white/10">

                        <p className="font-semibold text-white">
                          {userName}
                        </p>

                        <p className="text-sm text-slate-400">
                          {user.email}
                        </p>

                        <span className="inline-block mt-2 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full capitalize">
                          {userRole}
                        </span>

                      </div>

                      <div className="p-2">

  <Link
    href="/dashboard"
    className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 rounded-xl transition-colors"
  >
    <User className="w-4 h-4" />

    Dashboard
  </Link>

  <Link
    href="/settings"
    className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 rounded-xl transition-colors"
  >
    <Settings className="w-4 h-4" />

    Settings
  </Link>

  <button
    onClick={handleLogout}
    className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
  >
    <LogOut className="w-4 h-4" />

    Logout
  </button>

</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block"
              >
                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:scale-[1.03] transition-all">

                  Login

                </button>
              </Link>
            )}

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              className="md:hidden p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#081120] border-t border-white/10">

          <nav className="flex flex-col p-4 space-y-1">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-purple-400 bg-white/10'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <Link href="/login">

                <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl">

                  Login

                </button>

              </Link>
            )}

          </nav>
        </div>
      )}
    </header>
  )
}