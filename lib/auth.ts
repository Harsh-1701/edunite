// lib/auth.ts
// Handles password hashing and login tokens

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!

export interface TokenPayload {
  userId: string
  email: string
  role: 'student' | 'alumni' | 'admin'
}

// Encrypts password before saving to database
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

// Checks if entered password matches stored password
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Creates a login token for user
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verifies if token is valid
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch {
    return null
  }
}

// Saves login token in browser cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

// Removes login token (logout)
export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}