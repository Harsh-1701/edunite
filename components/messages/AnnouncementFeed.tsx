'use client'

import { useState } from 'react'

import {
  Heart,
  ThumbsUp,
} from 'lucide-react'

import { Announcement } from './types'

type Props = {
  announcements: Announcement[]
  canPost: boolean
}

export default function AnnouncementFeed({
  announcements,
  canPost,
}: Props) {
  const [feedPost, setFeedPost] =
    useState('')

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!feedPost.trim()) return

    // TODO:
    // Save to Supabase later

    setFeedPost('')
  }

  return (
    <div className="space-y-4">

      {canPost && (
        <form onSubmit={handleSubmit}>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-4">

            <textarea
              rows={3}
              value={feedPost}
              onChange={(e) =>
                setFeedPost(e.target.value)
              }
              placeholder="Share something..."
              className="w-full bg-transparent text-white placeholder:text-slate-500 resize-none focus:outline-none"
            />

            <div className="flex justify-end mt-3">

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              >
                Post
              </button>

            </div>

          </div>

        </form>
      )}

      {announcements.map((post) => (

        <div
          key={post.id}
          className="bg-white/5 border border-white/10 rounded-3xl p-5"
        >

          <div className="flex gap-3">

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">

              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}

            </div>

            <div className="flex-1">

              <h3 className="text-white font-medium">
                {post.author}
              </h3>

              <p className="text-sm text-slate-300 mt-2">
                {post.content}
              </p>

              <div className="flex items-center gap-5 mt-4">

                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400">

                  <ThumbsUp className="w-4 h-4" />

                  <span className="text-xs">
                    {post.reactions.likes}
                  </span>

                </button>

                <button className="flex items-center gap-2 text-slate-400 hover:text-red-400">

                  <Heart className="w-4 h-4" />

                  <span className="text-xs">
                    {post.reactions.hearts}
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      ))}

      {announcements.length === 0 && (

        <div className="text-center text-slate-400 py-10">
          No announcements yet.
        </div>

      )}

    </div>
  )
}