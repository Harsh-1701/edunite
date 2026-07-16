'use client'

import React, {
  useState,
  useEffect,
  useRef,
} from 'react'

import Link from 'next/link'
import toast from 'react-hot-toast'

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
  CheckCheck,
} from 'lucide-react'

import { useTheme } from '@/context/ThemeContext'

import { Avatar } from '@/components/ui/Avatar'

import { useAuth } from '@/components/providers/AuthProvider'

import { supabase } from '@/lib/supabase'

import {
  Notification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  subscribeNotifications,
  unsubscribeNotifications,
} from '@/lib/services/notifications'

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

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false)

  const [
    isUserMenuOpen,
    setIsUserMenuOpen,
  ] = useState(false)

  const [
    isNotificationOpen,
    setIsNotificationOpen,
  ] = useState(false)

  const [notifications, setNotifications] =
    useState<Notification[]>([])

  const [
    notificationsLoading,
    setNotificationsLoading,
  ] = useState(false)

  const notificationRef =
    useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  const { user } = useAuth()

  const { isDark, toggleTheme } =
    useTheme()

  const unreadCount = notifications.filter(
    notification => !notification.read
  ).length

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
    setIsNotificationOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setNotifications([])
      return
    }

    let channel: any
    let cancelled = false

    const loadNotifications = async () => {
      try {
        setNotificationsLoading(true)

        const data = await getNotifications(
          user.id
        )

        if (!cancelled) {
          setNotifications(data)
        }
      } catch (error) {
        console.error(
          'Failed to load notifications:',
          error
        )
      } finally {
        if (!cancelled) {
          setNotificationsLoading(false)
        }
      }
    }

    loadNotifications()

    channel = subscribeNotifications(
      user.id,
      (notification, eventType) => {
        console.log(
          'HEADER NOTIFICATION EVENT:',
          eventType,
          notification
        )

        if (eventType === 'INSERT') {
          const activeConversationId =
            sessionStorage.getItem(
              'activeConversationId'
            )

          const notificationConversationId =
            (notification as any).conversation_id

          const isCurrentlyViewingThisChat =
            pathname === '/messages' &&
            activeConversationId ===
              notificationConversationId

          if (!isCurrentlyViewingThisChat) {
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible
                      ? 'animate-enter'
                      : 'animate-leave'
                  } pointer-events-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#1f2937] shadow-2xl`}
                >
                  <div className="flex items-start gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-bold text-white">
                      {(notification.title || 'N')
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {notification.title ||
                          'New message'}
                      </p>

                      <p className="mt-0.5 truncate text-sm font-normal text-slate-300">
                        {notification.body ||
                          'You received a new message'}
                      </p>
                    </div>
                  </div>
                </div>
              ),
              {
                duration: 5000,
                position: 'top-right',
              }
            )
          }
        }

        setNotifications(prev => {
          if (eventType === 'DELETE') {
            return prev.filter(
              item =>
                item.id !== notification.id
            )
          }

          const existingIndex =
            prev.findIndex(
              item =>
                item.id === notification.id
            )

          if (existingIndex >= 0) {
            const updated = [...prev]

            updated[existingIndex] = {
              ...updated[existingIndex],
              ...notification,
            }

            return updated
          }

          if (eventType === 'INSERT') {
            return [
              notification,
              ...prev,
            ]
          }

          return prev
        })
      }
    )

    return () => {
      cancelled = true

      if (channel) {
        unsubscribeNotifications(channel)
      }
    }
  }, [user])

  const handleLogout = async () => {
    const { error } =
      await supabase.auth.signOut()

    if (!error) {
      window.location.href = '/'
    }
  }

  const handleNotificationClick = async (
    notification: Notification
  ) => {
    if (notification.read) return

    try {
      await markNotificationRead(
        notification.id
      )

      setNotifications(prev =>
        prev.map(item =>
          item.id === notification.id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      )
    } catch (error) {
      console.error(
        'Failed to mark notification as read:',
        error
      )
    }
  }

  const handleMarkAllRead = async () => {
    if (!user || unreadCount === 0) return

    try {
      await markAllNotificationsRead(
        user.id
      )

      setNotifications(prev =>
        prev.map(notification => ({
          ...notification,
          read: true,
        }))
      )
    } catch (error) {
      console.error(
        'Failed to mark all notifications as read:',
        error
      )
    }
  }

  const formatNotificationTime = (
    createdAt: string
  ) => {
    const date = new Date(createdAt)

    const now = new Date()

    const difference =
      now.getTime() - date.getTime()

    const minutes = Math.floor(
      difference / 60000
    )

    const hours = Math.floor(
      difference / 3600000
    )

    const days = Math.floor(
      difference / 86400000
    )

    if (minutes < 1) {
      return 'Just now'
    }

    if (minutes < 60) {
      return `${minutes}m ago`
    }

    if (hours < 24) {
      return `${hours}h ago`
    }

    if (days < 7) {
      return `${days}d ago`
    }

    return date.toLocaleDateString()
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

            {navLinks.map(link => (
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

            {/* MESSAGES */}

            {user && pathname !== '/' && (
              <Link href="/messages">

                <button className="relative p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">

                  <MessageCircle className="w-5 h-5" />

                </button>

              </Link>
            )}

            {/* NOTIFICATIONS */}

            {user && (
              <div
                ref={notificationRef}
                className="relative"
              >
                <button
                  onClick={() => {
                    setIsNotificationOpen(
                      !isNotificationOpen
                    )

                    setIsUserMenuOpen(false)
                  }}
                  className="relative p-2.5 rounded-xl text-slate-300 hover:bg-white/5 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />

                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-bold border-2 border-[#081120]">

                      {unreadCount > 99
                        ? '99+'
                        : unreadCount}

                    </span>
                  )}

                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-[340px] sm:w-96 max-w-[calc(100vw-2rem)] bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50">

                    {/* NOTIFICATION HEADER */}

                    <div className="flex items-center justify-between p-4 border-b border-white/10">

                      <div>
                        <h3 className="font-semibold text-white">
                          Notifications
                        </h3>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {unreadCount > 0
                            ? `${unreadCount} unread`
                            : 'You are all caught up'}
                        </p>
                      </div>

                      {unreadCount > 0 && (
                        <button
                          onClick={
                            handleMarkAllRead
                          }
                          className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <CheckCheck className="w-4 h-4" />

                          Mark all read
                        </button>
                      )}

                    </div>

                    {/* NOTIFICATION LIST */}

                    <div className="max-h-[420px] overflow-y-auto">

                      {notificationsLoading ? (
                        <div className="p-8 text-center text-slate-400 text-sm">
                          Loading notifications...
                        </div>
                      ) : notifications.length ===
                        0 ? (
                        <div className="p-10 text-center">

                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">

                            <Bell className="w-6 h-6 text-slate-500" />

                          </div>

                          <p className="text-white font-medium">
                            No notifications yet
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            New notifications will appear here.
                          </p>

                        </div>
                      ) : (
                        notifications.map(
                          notification => (
                            <button
                              key={
                                notification.id
                              }
                              onClick={() =>
                                handleNotificationClick(
                                  notification
                                )
                              }
                              className={`w-full text-left p-4 border-b border-white/5 transition-colors ${
                                notification.read
                                  ? 'bg-transparent hover:bg-white/5'
                                  : 'bg-purple-500/10 hover:bg-purple-500/15'
                              }`}
                            >
                              <div className="flex gap-3">

                                <div className="relative mt-1">

                                  <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                      notification.read
                                        ? 'bg-white/5'
                                        : 'bg-purple-500/20'
                                    }`}
                                  >
                                    <Bell
                                      className={`w-4 h-4 ${
                                        notification.read
                                          ? 'text-slate-400'
                                          : 'text-purple-400'
                                      }`}
                                    />
                                  </div>

                                  {!notification.read && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-[#111827]" />
                                  )}

                                </div>

                                <div className="flex-1 min-w-0">

                                  <div className="flex items-start justify-between gap-2">

                                    <p
                                      className={`text-sm ${
                                        notification.read
                                          ? 'font-medium text-slate-300'
                                          : 'font-semibold text-white'
                                      }`}
                                    >
                                      {notification.title ||
                                        'Notification'}
                                    </p>

                                    <span className="text-[11px] text-slate-500 whitespace-nowrap">
                                      {formatNotificationTime(
                                        notification.created_at
                                      )}
                                    </span>

                                  </div>

                                  {notification.body && (
                                    <p className="text-sm text-slate-400 mt-1 leading-5">
                                      {
                                        notification.body
                                      }
                                    </p>
                                  )}

                                </div>

                              </div>
                            </button>
                          )
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
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

                {/* USER MENU */}

                <div className="relative">

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(
                        !isUserMenuOpen
                      )

                      setIsNotificationOpen(false)
                    }}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Avatar name={userName} />
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

            {navLinks.map(link => (
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