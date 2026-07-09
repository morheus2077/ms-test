'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Target, Flame, BookOpen, Headphones, PenTool, Code2 } from 'lucide-react'

const dailyGoals = [
  { id: 'lesson', label: 'Assistir 1 aula de programação', icon: BookOpen, completed: true },
  { id: 'practice', label: '15 min de prática de código', icon: Code2, completed: true },
  { id: 'exercise', label: 'Resolver 3 exercícios de lógica', icon: PenTool, completed: false },
  { id: 'review', label: 'Revisar aula anterior', icon: Target, completed: false },
]

export function DailyGoals() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [goals, setGoals] = useState(dailyGoals)

  const completedCount = goals.filter(g => g.completed).length
  const progressPercentage = (completedCount / goals.length) * 100

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.goal-item',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  return (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Metas Diárias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{completedCount}/{goals.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div ref={containerRef} className="space-y-3">
          {goals.map((goal) => {
            const Icon = goal.icon
            return (
              <div
                key={goal.id}
                className={`goal-item flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  goal.completed ? 'bg-green-500/10' : 'bg-secondary/50 hover:bg-secondary'
                }`}
                onClick={() => toggleGoal(goal.id)}
              >
                <Checkbox
                  checked={goal.completed}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Icon className={`h-4 w-4 ${goal.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                <span className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {goal.label}
                </span>
              </div>
            )
          })}
        </div>

        {completedCount === goals.length && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-center">
            <p className="font-semibold text-green-600 dark:text-green-400">
              Parabéns! Você completou todas as metas de hoje!
            </p>
            <p className="text-sm text-muted-foreground mt-1">+50 XP bônus</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
