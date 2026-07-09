'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  DollarSign, 
  PlayCircle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const stats = [
  { label: 'Total de Alunos', value: '2,847', change: '+12%', trend: 'up', icon: Users },
  { label: 'Receita Mensal', value: '156,420 MT', change: '+8%', trend: 'up', icon: DollarSign },
  { label: 'Aulas Assistidas', value: '12,459', change: '+23%', trend: 'up', icon: PlayCircle },
  { label: 'Taxa de Engajamento', value: '78%', change: '-2%', trend: 'down', icon: TrendingUp },
]

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Fev', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Abr', revenue: 61000 },
  { month: 'Mai', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Ago', revenue: 85000 },
  { month: 'Set', revenue: 92000 },
  { month: 'Out', revenue: 98000 },
  { month: 'Nov', revenue: 112000 },
  { month: 'Dez', revenue: 156420 },
]

const studentsData = [
  { month: 'Jan', students: 1200 },
  { month: 'Fev', students: 1450 },
  { month: 'Mar', students: 1600 },
  { month: 'Abr', students: 1800 },
  { month: 'Mai', students: 2000 },
  { month: 'Jun', students: 2200 },
  { month: 'Jul', students: 2400 },
  { month: 'Ago', students: 2550 },
  { month: 'Set', students: 2650 },
  { month: 'Out', students: 2720 },
  { month: 'Nov', students: 2800 },
  { month: 'Dez', students: 2847 },
]

const planDistribution = [
  { name: 'Básico', value: 1200, color: '#22c55e' },
  { name: 'Premium', value: 1147, color: '#3b82f6' },
  { name: 'VIP', value: 500, color: '#8b5cf6' },
]

const topLessons = [
  { title: 'Introdução à Lógica de Programação', views: 2340 },
  { title: 'Variáveis e Tipos de Dados', views: 1980 },
  { title: 'Introdução ao HTML', views: 1756 },
  { title: 'Introdução ao CSS', views: 1543 },
  { title: 'Funções em JavaScript', views: 1234 },
]

export default function AdminDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.chart-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard do Admin</h1>
        <p className="text-muted-foreground">
          Visão geral dos cursos da plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="stat-card glass border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-4">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Students Growth Chart */}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Crescimento de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Distribuição de Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                  <span className="text-sm text-muted-foreground">{plan.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Lessons */}
        <Card className="chart-card glass border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Aulas Mais Assistidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLessons.map((lesson, index) => (
                <div key={lesson.title} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{lesson.title}</p>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(lesson.views / topLessons[0].views) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.views.toLocaleString()} views
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
