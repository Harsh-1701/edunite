// app/messages/page.tsx

'use client'

import React, { useState } from 'react'
import { 
  MessageCircle, Search, Send, Phone, Video, MoreVertical,
  Users, Megaphone, Bot, ArrowLeft, Heart, ThumbsUp, Smile,
  Briefcase, GraduationCap, Shield, Clock, Check, CheckCheck,
  Plus, Image, Paperclip, Mic
} from 'lucide-react'
import Link from 'next/link'

// Dummy data for conversations
const conversations = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'alumni',
    avatar: null,
    lastMessage: 'Sure, I can help you with the interview prep!',
    time: '2m ago',
    unread: 2,
    online: true,
    company: 'Google'
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    role: 'faculty',
    avatar: null,
    lastMessage: 'The project deadline has been extended.',
    time: '1h ago',
    unread: 0,
    online: true,
    company: null
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'alumni',
    avatar: null,
    lastMessage: 'Check out this job opening at Microsoft!',
    time: '3h ago',
    unread: 1,
    online: false,
    company: 'Microsoft'
  },
]

// Dummy announcements
const announcements = [
  {
    id: 1,
    author: 'Sneha Reddy',
    role: 'alumni',
    company: 'Amazon',
    content: '🚀 We are hiring! Amazon is looking for SDE interns. DM me for referral!',
    time: '30m ago',
    reactions: { likes: 45, hearts: 12 },
    type: 'job'
  },
  {
    id: 2,
    author: 'Prof. Vikram Singh',
    role: 'faculty',
    content: '📢 Research internship opportunity at IISc Bangalore. Interested students please contact the department.',
    time: '2h ago',
    reactions: { likes: 28, hearts: 5 },
    type: 'research'
  },
  {
    id: 3,
    author: 'Karthik Nair',
    role: 'alumni',
    company: 'Goldman Sachs',
    content: '💼 Goldman Sachs summer internship applications are open! Last date: March 15. Happy to refer deserving candidates.',
    time: '5h ago',
    reactions: { likes: 67, hearts: 23 },
    type: 'internship'
  },
]

// Dummy messages for a conversation
const dummyMessages = [
  { id: 1, sender: 'other', text: 'Hi! I saw your profile. I am interested in learning about product management.', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Hello! Sure, I would be happy to help. What specific areas are you interested in?', time: '10:32 AM' },
  { id: 3, sender: 'other', text: 'I want to transition from engineering to PM. Can you guide me on how to prepare?', time: '10:35 AM' },
  { id: 4, sender: 'me', text: 'Absolutely! First, I would recommend understanding the basics of product thinking. Have you read any PM books?', time: '10:38 AM' },
  { id: 5, sender: 'other', text: 'I have started reading "Cracking the PM Interview". Is that a good start?', time: '10:40 AM' },
  { id: 6, sender: 'me', text: 'That is an excellent choice! Also focus on case studies and practice product sense questions.', time: '10:42 AM' },
]

type TabType = 'chats' | 'announcements' | 'ai-assistant'

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('chats')
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [aiMessage, setAiMessage] = useState('')
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Hello! I am EduNite AI Assistant. I can help you with:\n\n• Resume and CV building\n• Interview preparation tips\n• Career guidance\n• Finding the right mentor\n• Job search strategies\n\nHow can I assist you today?' }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    // In real app, send to backend
    setMessage('')
  }

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiMessage.trim()) return
    
    setAiMessages(prev => [...prev, { role: 'user', content: aiMessage }])
    
    // Simulate AI response
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thank you for your question! Based on your query, here are some suggestions:\n\n1. Focus on highlighting your key achievements\n2. Tailor your resume for each application\n3. Use action verbs and quantify results\n\nWould you like me to elaborate on any of these points?'
      }])
    }, 1000)
    
    setAiMessage('')
  }

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto h-[calc(100vh-80px)]">
        <div className="flex h-full bg-white dark:bg-slate-800 rounded-t-3xl overflow-hidden shadow-xl">
          
          {/* Sidebar */}
          <div className={`w-full md:w-96 border-r border-gray-200 dark:border-slate-700 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Tabs */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex gap-2">
                {[
                  { id: 'chats', label: 'Chats', icon: MessageCircle },
                  { id: 'announcements', label: 'Feed', icon: Megaphone },
                  { id: 'ai-assistant', label: 'AI', icon: Bot },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setSelectedChat(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Content based on tab */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Chats List */}
              {activeTab === 'chats' && (
                <div className="space-y-1 p-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedChat(conv.id)}
                      className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                        selectedChat === conv.id
                          ? 'bg-purple-50 dark:bg-purple-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {conv.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">{conv.name}</span>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {conv.role === 'alumni' && <Briefcase className="w-3 h-3 text-blue-500" />}
                          {conv.role === 'faculty' && <Shield className="w-3 h-3 text-green-500" />}
                          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conv.company && `${conv.company} • `}{conv.lastMessage}
                          </span>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <div className="w-5 h-5 bg-purple-600 rounded-full text-xs text-white flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Announcements Feed */}
              {activeTab === 'announcements' && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Opportunity Feed</h3>
                    <span className="text-xs text-gray-500">Alumni & Faculty posts</span>
                  </div>
                  
                  {announcements.map((post) => (
                    <div key={post.id} className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                            {post.role === 'alumni' && (
                              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs rounded-full">
                                {post.company}
                              </span>
                            )}
                            {post.role === 'faculty' && (
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs rounded-full">
                                Faculty
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-xs">{post.reactions.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">{post.reactions.hearts}</span>
                            </button>
                            <span className="text-xs text-gray-400 ml-auto">{post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    💡 Students can react to posts. Alumni & Faculty can post opportunities.
                  </p>
                </div>
              )}

              {/* AI Assistant */}
              {activeTab === 'ai-assistant' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {aiMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-4 ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                              : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2 mb-2">
                              <Bot className="w-4 h-4 text-purple-500" />
                              <span className="text-xs font-medium text-purple-500">EduNite AI</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleAiSend} className="p-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiMessage}
                        onChange={(e) => setAiMessage(e.target.value)}
                        placeholder="Ask about resume, interviews, careers..."
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedChat && activeTab === 'chats' ? 'hidden md:flex' : ''} ${activeTab !== 'chats' ? 'hidden' : ''}`}>
            {selectedChat && selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.online ? 'Online' : 'Offline'} • {selectedConversation.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Encryption Notice */}
                  <div className="flex justify-center">
                    <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs rounded-full flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      Messages are end-to-end encrypted
                    </div>
                  </div>

                  {dummyMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 ${
                          msg.sender === 'me'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${
                          msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">{msg.time}</span>
                          {msg.sender === 'me' && <CheckCheck className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <button type="button" className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button type="button" className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Image className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                    />
                    <button type="button" className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      type="submit"
                      className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : activeTab === 'chats' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex p-6 bg-gray-100 dark:bg-slate-700 rounded-full mb-4">
                    <MessageCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Your Messages
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}