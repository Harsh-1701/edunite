// lib/models/User.ts

import mongoose, { Schema } from 'mongoose'

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: 'student' | 'alumni' | 'faculty' | 'admin'
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
  profession?: string
  designation?: string
  yearsOfExperience?: number
  specialization?: string
  otherProfession?: string
  mentorshipAreas?: string[]
  isVerified?: boolean
  linkedIn?: string
  github?: string
  discord?: string
  skills?: string[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['student', 'alumni', 'faculty', 'admin'],
      required: true,
    },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    collegeId: { type: String },
    branch: {
      type: String,
      enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT', 'Other', ''],
    },
    yearOfStudy: { type: Number, min: 1, max: 5 },
    interests: [{ type: String }],
    graduationYear: { type: Number },
    company: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    location: { type: String, default: '' },
    country: { type: String },
    city: { type: String },
    sector: { type: String, enum: ['private', 'public', ''] },
    domain: {
      type: String,
      enum: ['Software', 'Core Engineering', 'Finance', 'Government', 'Research', 'Entrepreneurship', 'Other', ''],
    },
    profession: { type: String, default: '' },
    designation: { type: String, default: '' },
    yearsOfExperience: { type: Number },
    specialization: { type: String, default: '' },
    otherProfession: { type: String, default: '' },
    mentorshipAreas: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    linkedIn: { type: String, default: '' },
    github: { type: String, default: '' },
    discord: { type: String, default: '' },
    skills: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema)