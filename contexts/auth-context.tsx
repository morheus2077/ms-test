'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  plan: 'basic' | 'premium' | 'vip'
  level: 'beginner' | 'intermediate' | 'professional'
  xp: number
  streak: number
  totalLessonsWatched: number
  totalStudyTime: number // in minutes
  fluencyPercentage: number
  certificates: string[]
  achievements: string[]
  joinedAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
  addXP: (amount: number) => void
  incrementStreak: () => void
  updateFluency: (percentage: number) => void
  completeCertificate: (certificateId: string) => void
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user for demo
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '+258 84 123 4567',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  plan: 'premium',
  level: 'intermediate',
  xp: 2450,
  streak: 7,
  totalLessonsWatched: 24,
  totalStudyTime: 1840,
  fluencyPercentage: 52,
  certificates: ['beginner'],
  achievements: ['first_lesson', 'streak_7', 'fast_learner'],
  joinedAt: new Date('2024-01-15'),
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('fluencypro_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    if (email && password) {
      setUser(mockUser)
      localStorage.setItem('fluencypro_user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUser(mockUser)
    localStorage.setItem('fluencypro_user', JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const newUser: User = {
      ...mockUser,
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      xp: 0,
      streak: 0,
      totalLessonsWatched: 0,
      totalStudyTime: 0,
      fluencyPercentage: 0,
      certificates: [],
      achievements: [],
      level: 'beginner',
      plan: 'basic',
      joinedAt: new Date(),
    }
    
    setUser(newUser)
    localStorage.setItem('fluencypro_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fluencypro_user')
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('fluencypro_user', JSON.stringify(updatedUser))
    }
  }

  const addXP = (amount: number) => {
    if (user) {
      const newXP = user.xp + amount
      let newLevel = user.level
      
      if (newXP >= 5000) newLevel = 'professional'
      else if (newXP >= 2000) newLevel = 'intermediate'
      
      updateUser({ xp: newXP, level: newLevel })
    }
  }

  const incrementStreak = () => {
    if (user) {
      updateUser({ streak: user.streak + 1 })
    }
  }

  const updateFluency = (percentage: number) => {
    if (user) {
      updateUser({ fluencyPercentage: Math.min(100, percentage) })
    }
  }

  const completeCertificate = (certificateId: string) => {
    if (user && !user.certificates.includes(certificateId)) {
      updateUser({ certificates: [...user.certificates, certificateId] })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
        addXP,
        incrementStreak,
        updateFluency,
        completeCertificate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
