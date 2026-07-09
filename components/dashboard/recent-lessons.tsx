'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlayCircle, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const recentLessons = [
  {
    id: '1',
    title: 'Introdução à Lógica de Programação',
    module: 'Módulo 1 - Lógica de Programação',
    duration: 15,
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Variáveis e Tipos de Dados',
    module: 'Módulo 1 - Lógica de Programação',
    duration: 20,
    progress: 75,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Introdução ao HTML',
    module: 'Módulo 2 - HTML & CSS',
    duration: 18,
    progress: 30,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
  },
  {
    id: '4',
    title: 'Introdução ao CSS',
    module: 'Módulo 2 - HTML & CSS',
    duration: 20,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
  },
]

export function RecentLessons() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lesson-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Card className="glass border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-primary" />
          Continuar Estudando
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/lessons" className="flex items-center gap-1">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="space-y-4">
          {recentLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/dashboard/lessons/${lesson.id}`}
              className="lesson-card flex gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                {lesson.progress === 100 && (
                  <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                )}
                {lesson.progress > 0 && lesson.progress < 100 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <PlayCircle className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                  {lesson.title}
                </h4>
                <p className="text-sm text-muted-foreground">{lesson.module}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} min
                  </div>
                  {lesson.progress > 0 && (
                    <div className="flex items-center gap-2 flex-1">
                      <Progress value={lesson.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{lesson.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
