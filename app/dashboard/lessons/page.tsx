'use client'



import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  Lock, 
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'
import { modules, lessonProgress, type Module, type Lesson } from '@/lib/lessons-data'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const levelColors = {
  beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  advanced: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}


export default function LessonsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [openModules, setOpenModules] = useState<string[]>(['module-1', 'module-2'])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.module-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getModuleProgress = (module: Module) => {
    const totalLessons = module.lessons.length
    const completedLessons = module.lessons.filter(
      (lesson) => lessonProgress[lesson.id]?.completed
    ).length
    return (completedLessons / totalLessons) * 100
  }

  const filteredModules = modules.map((module) => ({
    ...module,
    lessons: module.lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((module) => module.lessons.length > 0)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Minhas Aulas</h1>
        <p className="text-muted-foreground">
          Continue sua jornada de aprendizado
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar aulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
        <Button variant="outline" className="h-12 px-4 rounded-xl">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Modules */}
      <div ref={containerRef} className="space-y-6">
        {filteredModules.map((module) => {
          const moduleProgress = getModuleProgress(module)
          const isOpen = openModules.includes(module.id)

          return (
            <Card key={module.id} className="module-card glass border-0 overflow-hidden">
              <Collapsible open={isOpen} onOpenChange={() => toggleModule(module.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-3">
                          {module.title}
                          <Badge variant="outline" className="text-xs">
                            {module.lessons.length} aulas
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <Progress value={moduleProgress} className="h-2 flex-1 max-w-xs" />
                          <span className="text-sm text-muted-foreground">
                            {Math.round(moduleProgress)}% completo
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {module.lessons.map((lesson, index) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          index={index}
                          progress={lessonProgress[lesson.id]}
                          isLocked={index > 0 && !lessonProgress[module.lessons[index - 1].id]?.completed}
                        />
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function LessonCard({
  lesson,
  index,
  progress,
  isLocked,
}: {
  lesson: Lesson
  index: number
  progress?: { progress: number; completed: boolean }
  isLocked: boolean
}) {
  const isCompleted = progress?.completed
  const hasProgress = progress && progress.progress > 0

  return (
    <Link
      href={isLocked ? '#' : `/dashboard/lessons/${lesson.id}`}
      className={`flex gap-4 p-4 rounded-xl transition-all ${
        isLocked
          ? 'opacity-50 cursor-not-allowed bg-secondary/30'
          : 'hover:bg-secondary/50 cursor-pointer'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
        )}
        {!isCompleted && !isLocked && hasProgress && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <PlayCircle className="h-10 w-10 text-white" />
          </div>
        )}
        {/* Lesson Number */}
        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center">
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium">{lesson.title}</h4>
          <Badge variant="outline" className={levelColors[lesson.level]}>
            {levelLabels[lesson.level]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {lesson.description}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {lesson.duration} min
          </div>
          {hasProgress && !isCompleted && (
            <div className="flex items-center gap-2 flex-1">
              <Progress value={progress.progress} className="h-1.5 max-w-32" />
              <span className="text-xs text-muted-foreground">
                {progress.progress}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
