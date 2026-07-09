'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp,
  Users,
  Clock,
  Target,
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
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts'

const engagementData = [
  { day: 'Seg', users: 1200, lessons: 3400 },
  { day: 'Ter', users: 1400, lessons: 3800 },
  { day: 'Qua', users: 1100, lessons: 2900 },
  { day: 'Qui', users: 1600, lessons: 4200 },
  { day: 'Sex', users: 1300, lessons: 3600 },
  { day: 'Sáb', users: 800, lessons: 2100 },
  { day: 'Dom', users: 600, lessons: 1800 },
]

const retentionData = [
  { week: 'Sem 1', rate: 100 },
  { week: 'Sem 2', rate: 85 },
  { week: 'Sem 3', rate: 72 },
  { week: 'Sem 4', rate: 68 },
  { week: 'Sem 5', rate: 62 },
  { week: 'Sem 6', rate: 58 },
  { week: 'Sem 7', rate: 55 },
  { week: 'Sem 8', rate: 52 },
]

const progressDistribution = [
  { range: '0-20%', count: 450 },
  { range: '21-40%', count: 680 },
  { range: '41-60%', count: 920 },
  { range: '61-80%', count: 540 },
  { range: '81-100%', count: 257 },
]

const completionRates = [
  { module: 'Módulo 1', rate: 87 },
  { module: 'Módulo 2', rate: 72 },
  { module: 'Módulo 3', rate: 58 },
  { module: 'Módulo 4', rate: 45 },
  { module: 'Módulo 5', rate: 32 },
]

const metrics = [
  { label: 'Usuários Ativos Diários', value: '1,247', change: '+8%', trend: 'up', icon: Users },
  { label: 'Tempo Médio por Sessão', value: '28 min', change: '+12%', trend: 'up', icon: Clock },
  { label: 'Taxa de Conclusão', value: '67%', change: '-3%', trend: 'down', icon: Target },
  { label: 'Engajamento Semanal', value: '4.2 dias', change: '+5%', trend: 'up', icon: TrendingUp },
]

export default function AdminAnalyticsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.metric-card',
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
      {}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Métricas detalhadas do desempenho do curso
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label} className="metric-card glass border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <p className="text-3xl font-bold mt-4">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Engajamento Diário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="lessons"
                    stackId="2"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-muted-foreground">Aulas assistidas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${value}%`, 'Retenção']}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <div className="grid lg:grid-cols-2 gap-6">
        {}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Distribuição de Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="chart-card glass border-0">
          <CardHeader>
            <CardTitle>Taxa de Conclusão por Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {completionRates.map((module) => (
                <div key={module.module}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{module.module}</span>
                    <span className="text-muted-foreground">{module.rate}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all"
                      style={{ width: `${module.rate}%` }}
                    />
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
