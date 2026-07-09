'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useAuth } from '@/contexts/auth-context'
import { 
  PlayCircle, 
  Clock, 
  TrendingUp, 
  Flame, 
  Award, 
  Trophy,
  Target,
  Zap,
  Star,
  BookOpen,
  Medal,
  Crown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const levelConfig = {
  beginner: { label: 'Iniciante', color: 'text-green-500', bgColor: 'bg-green-500', icon: Star, xpMax: 2000 },
  intermediate: { label: 'Intermediário', color: 'text-blue-500', bgColor: 'bg-blue-500', icon: Trophy, xpMax: 5000 },
  professional: { label: 'Profissional', color: 'text-purple-500', bgColor: 'bg-purple-500', icon: Crown, xpMax: 10000 },
}

const achievements = [
  { id: 'first_lesson', label: 'Primeira Aula', icon: PlayCircle, description: 'Assistiu sua primeira aula' },
  { id: 'streak_7', label: '7 Dias Seguidos', icon: Flame, description: 'Estudou por 7 dias consecutivos' },
  { id: 'fast_learner', label: 'Aprendiz Rápido', icon: Zap, description: 'Completou 10 aulas em uma semana' },
  { id: 'bookworm', label: 'Leitor Ávido', icon: BookOpen, description: 'Leu 5 books complementares' },
  { id: 'perfect_week', label: 'Semana Perfeita', icon: Target, description: 'Completou todas as metas semanais' },
  { id: 'certificate', label: 'Certificado', icon: Award, description: 'Obteve seu primeiro certificado' },
]

export function StatsCards() {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power3.out' 
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!user) return null

  const stats = [
    { 
      label: 'Aulas Assistidas', 
      value: user.totalLessonsWatched, 
      icon: PlayCircle, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10' 
    },
    { 
      label: 'Tempo Estudado', 
      value: `${Math.floor(user.totalStudyTime / 60)}h ${user.totalStudyTime % 60}m`, 
      icon: Clock, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10' 
    },
    { 
      label: 'Fluência', 
      value: `${user.fluencyPercentage}%`, 
      icon: TrendingUp, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10' 
    },
    { 
      label: 'Sequência', 
      value: `${user.streak} dias`, 
      icon: Flame, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10' 
    },
    { 
      label: 'XP Total', 
      value: user.xp.toLocaleString(), 
      icon: Zap, 
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10' 
    },
    { 
      label: 'Certificados', 
      value: user.certificates.length, 
      icon: Award, 
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10' 
    },
  ]

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="stat-card glass border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function ProgressSection() {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.progress-card',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!user) return null

  const levelData = levelConfig[user.level]
  const LevelIcon = levelData.icon
  const xpProgress = (user.xp / levelData.xpMax) * 100

  return (
    <div ref={containerRef} className="grid md:grid-cols-2 gap-6">
      {/* Fluency Progress */}
      <Card className="progress-card glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Progresso de Fluência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pt-4">
            {/* Circular Progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-secondary"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${user.fluencyPercentage * 2.83} 283`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{user.fluencyPercentage}%</span>
                <span className="text-sm text-muted-foreground">Fluência</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground">
              Você está a <span className="text-primary font-semibold">{100 - user.fluencyPercentage}%</span> de alcançar a fluência total!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Level Progress */}
      <Card className="progress-card glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LevelIcon className={`h-5 w-5 ${levelData.color}`} />
            Seu Nível
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${levelData.bgColor}/10`}>
              <LevelIcon className={`h-6 w-6 ${levelData.color}`} />
              <span className={`text-lg font-bold ${levelData.color}`}>{levelData.label}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">XP Atual</span>
              <span className="font-semibold">{user.xp.toLocaleString()} / {levelData.xpMax.toLocaleString()}</span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <p className="text-center text-sm text-muted-foreground">
              Faltam <span className="text-primary font-semibold">{(levelData.xpMax - user.xp).toLocaleString()} XP</span> para o próximo nível
            </p>
          </div>

          {/* Level Badges */}
          <div className="flex justify-center gap-4 mt-6">
            {Object.entries(levelConfig).map(([key, config]) => {
              const Icon = config.icon
              const isUnlocked = ['beginner', 'intermediate', 'professional'].indexOf(user.level) >= ['beginner', 'intermediate', 'professional'].indexOf(key)
              return (
                <div
                  key={key}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isUnlocked ? `${config.bgColor}/20` : 'bg-secondary opacity-50'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isUnlocked ? config.color : 'text-muted-foreground'}`} />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AchievementsSection() {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-item',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.5 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!user) return null

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-yellow-500" />
          Conquistas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            const isUnlocked = user.achievements.includes(achievement.id)
            return (
              <div
                key={achievement.id}
                className={`achievement-item flex flex-col items-center p-4 rounded-xl transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:scale-105' 
                    : 'bg-secondary/50 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isUnlocked ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-muted'
                }`}>
                  <Icon className={`h-6 w-6 ${isUnlocked ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-xs font-medium text-center">{achievement.label}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function WelcomeSection() {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.welcome-content',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!user) return null

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div ref={containerRef} className="welcome-content mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {getGreeting()}, <span className="gradient-text">{user.name.split(' ')[0]}</span>!
      </h1>
      <p className="text-muted-foreground text-lg">
        Continue sua jornada rumo à fluência. Você está indo muito bem!
      </p>
    </div>
  )
}
