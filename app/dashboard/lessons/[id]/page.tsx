'use client'

import { useRef, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Download,
  Share2,
  ThumbsUp,
  MessageSquare
} from 'lucide-react'
import { getLessonById, getNextLesson, modules, lessonProgress } from '@/lib/lessons-data'

const levelColors = {
  beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  professional: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  professional: 'Profissional',
}

export default function LessonPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const lesson = getLessonById(lessonId)
  const nextLesson = lesson ? getNextLesson(lessonId) : undefined
  const progress = lessonProgress[lessonId]

  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lesson-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isVideoEnded && !progress?.completed) {
      setShowCongrats(true)
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowCongrats(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isVideoEnded, progress?.completed])

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Aula não encontrada</h2>
        <Button asChild>
          <Link href="/dashboard/lessons">Voltar para aulas</Link>
        </Button>
      </div>
    )
  }

  // Find current module
  const currentModule = modules.find((m) => m.id === lesson.moduleId)
  const currentLessonIndex = currentModule?.lessons.findIndex((l) => l.id === lessonId) ?? 0
  const prevLesson = currentModule?.lessons[currentLessonIndex - 1]

  const handleCompleteLesson = () => {
    setIsVideoEnded(true)
    // In a real app, this would update the database
  }

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/dashboard/lessons/${nextLesson.id}`)
    }
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto">
      {/* Congrats Modal */}
      {showCongrats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card rounded-3xl p-8 text-center max-w-md mx-4 animate-in zoom-in-50 duration-300">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-muted-foreground mb-4">
              Você completou a aula &quot;{lesson.title}&quot;
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">+25</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">+1</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCongrats(false)}
              >
                Fechar
              </Button>
              {nextLesson && (
                <Button className="flex-1" onClick={handleNextLesson}>
                  Próxima Aula
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/lessons" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar para aulas
          </Link>
        </Button>
      </div>

      <div className="lesson-content grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Container */}
          <Card className="glass border-0 overflow-hidden">
            <div className="relative aspect-video bg-black">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Progress Bar */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progresso da aula</span>
                <span className="text-sm font-medium">{progress?.progress ?? 0}%</span>
              </div>
              <Progress value={progress?.progress ?? 0} className="h-2" />
            </div>
          </Card>

          {/* Lesson Info */}
          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Badge variant="outline" className={levelColors[lesson.level]}>
                    {levelLabels[lesson.level]}
                  </Badge>
                  <h1 className="text-2xl font-bold mt-2">{lesson.title}</h1>
                  <p className="text-muted-foreground mt-1">{currentModule?.title}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{lesson.duration} min</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{lesson.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Gostei
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Material
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Dúvidas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {prevLesson ? (
              <Button variant="outline" asChild>
                <Link href={`/dashboard/lessons/${prevLesson.id}`}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Aula Anterior
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {!progress?.completed && (
              <Button onClick={handleCompleteLesson}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluída
              </Button>
            )}

            {nextLesson ? (
              <Button asChild>
                <Link href={`/dashboard/lessons/${nextLesson.id}`}>
                  Próxima Aula
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar - Module Content */}
        <div className="space-y-4">
          <Card className="glass border-0">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {currentModule?.title}
              </h3>
              <div className="space-y-2">
                {currentModule?.lessons.map((l, index) => {
                  const isActive = l.id === lessonId
                  const lProgress = lessonProgress[l.id]
                  const isCompleted = lProgress?.completed

                  return (
                    <Link
                      key={l.id}
                      href={`/dashboard/lessons/${l.id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-primary/10 border border-primary/30'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-primary text-white'
                            : 'bg-secondary'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : isActive ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? 'text-primary' : ''
                          }`}
                        >
                          {l.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {l.duration} min
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* XP Info */}
          <Card className="glass border-0 bg-gradient-to-br from-primary/10 to-purple-500/10">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Complete esta aula e ganhe
              </p>
              <p className="text-3xl font-bold text-primary">+25 XP</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
