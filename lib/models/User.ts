// lib/models/User.ts
// Defines what user data looks like in database

import mongoose, { Schema, Model } from 'mongoose'

// User type definition
export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: 'student' | 'alumni' | 'admin'
  avatar?: string
  bio?: string
  collegeId?: string
  branch?: string
  yearOfStudy?: number
  interests?: string[]
  graduationYear?: number
  company?: string
  jobTitle?: string
  location?: string
  country?: string
  city?: string
  sector?: 'private' | 'public'
  domain?: string
  mentorshipAreas?: string[]
  isVerified?: boolean
  linkedIn?: string
  skills?: string[]
  createdAt: Date
  updatedAt: Date
}

// Database schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { 
      type: String, 
      enum: ['student', 'alumni', 'admin'], 
      required: true 
    },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    collegeId: { type: String },
    branch: { 
      type: String,
      enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT', 'Other']
    },
    yearOfStudy: { type: Number, min: 1, max: 5 },
    interests: [{ type: String }],
    graduationYear: { type: Number },
    company: { type: String },
    jobTitle: { type: String },
    location: { type: String },
    country: { type: String },
    city: { type: String },
    sector: { type: String, enum: ['private', 'public'] },
    domain: { 
      type: String,
      enum: ['Software', 'Core Engineering', 'Finance', 'Government', 'Research', 'Entrepreneurship', 'Other']
    },
    mentorshipAreas: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    linkedIn: { type: String },
    skills: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

// Create and export the model
export const User = mongoose.models.User || mongoose.model('User', UserSchema)