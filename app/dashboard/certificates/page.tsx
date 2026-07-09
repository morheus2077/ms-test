'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Award, 
  Download, 
  Share2, 
  Lock, 
  CheckCircle,
  Star,
  Trophy,
  Crown
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

const certificates = [
  {
    id: 'logic-programming',
    title: 'Certificado de Conclusão',
    description: 'Curso de Lógica de Programação',
    level: 'course',
    icon: Star,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    requirements: {
      lessonsCompleted: 15,
      progressRequired: 100,
      currentLessons: 15,
      currentProgress: 100,
    },
  },
  {
    id: 'html-css',
    title: 'Certificado de Conclusão',
    description: 'Curso de HTML & CSS',
    level: 'course',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    requirements: {
      lessonsCompleted: 20,
      progressRequired: 100,
      currentLessons: 20,
      currentProgress: 100,
    },
  },
  {
    id: 'javascript',
    title: 'Certificado de Conclusão',
    description: 'Curso de JavaScript',
    level: 'course',
    icon: Crown,
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
    requirements: {
      lessonsCompleted: 30,
      progressRequired: 100,
      currentLessons: 30,
      currentProgress: 100,
    },
  },
]

export default function CertificatesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.certificate-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const getCertificateStatus = (cert: typeof certificates[0]): 'completed' | 'available' | 'locked' => {
    if (user?.certificates.includes(cert.id)) return 'completed'

    const lessonsCompleted = cert.requirements.currentLessons >= cert.requirements.lessonsCompleted
    const progressCompleted = cert.requirements.currentProgress >= cert.requirements.progressRequired

    if (lessonsCompleted && progressCompleted) return 'available'

    return 'locked'
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificados</h1>
        <p className="text-muted-foreground">
          Complete os requisitos e conquiste seus certificados oficiais
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{user?.certificates.length ?? 0}</p>
            <p className="text-sm text-muted-foreground">Conquistados</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">1</p>
            <p className="text-sm text-muted-foreground">Em progresso</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">2</p>
            <p className="text-sm text-muted-foreground">Bloqueados</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      <div ref={containerRef} className="space-y-6">
        {certificates.map((cert) => {
          const Icon = cert.icon
          const status = getCertificateStatus(cert)
          const lessonsProgress = Math.min(100, (cert.requirements.currentLessons / cert.requirements.lessonsCompleted) * 100)
          

          return (
            <Card
              key={cert.id}
              className={`certificate-card glass border-0 overflow-hidden transition-all duration-300 ${
                status === 'completed' ? 'ring-2 ring-green-500/50' : ''
              }`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Certificate Preview */}
                  <div
                    className={`relative w-full md:w-72 h-48 md:h-auto bg-gradient-to-br ${cert.color} p-6 flex flex-col items-center justify-center text-white`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id={`pattern-${cert.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                          <circle cx="5" cy="5" r="1" fill="currentColor" />
                        </pattern>
                        <rect width="100" height="100" fill={`url(#pattern-${cert.id})`} />
                      </svg>
                    </div>
                    <Icon className="h-16 w-16 mb-3 relative z-10" />
                    <p className="text-lg font-bold relative z-10 text-center">{cert.title}</p>
                    {status === 'completed' && (
                      <Badge className="mt-2 bg-white/20 text-white border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Conquistado
                      </Badge>
                    )}
                    {status === 'locked' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-white/80" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{cert.title}</h3>
                        <p className="text-muted-foreground">{cert.description}</p>
                      </div>
                      <Badge variant="outline" className={cert.bgColor}>
                        {cert.level === 'beginner' && 'Iniciante'}
                        {cert.level === 'intermediate' && 'Intermediário'}
                        {cert.level === 'professional' && 'Profissional'}
                      </Badge>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Aulas completadas</span>
                          <span className="font-medium">
                            {cert.requirements.currentLessons} / {cert.requirements.lessonsCompleted}
                          </span>
                        </div>
                        <Progress value={lessonsProgress} className="h-2" />
                      </div>
                      {/* <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Fluência necessária</span>
                          <span className="font-medium">
                            {cert.requirements.currentFluency}% / {cert.requirements.fluencyRequired}%
                          </span>
                        </div>
                        <Progress value={fluencyProgress} className="h-2" />
                      </div> */}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {status === 'completed' ? (
                        <>
                          <Button className={`bg-gradient-to-r ${cert.color}`}>
                            <Download className="h-4 w-4 mr-2" />
                            Baixar PDF
                          </Button>
                          <Button variant="outline">
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                          </Button>
                        </>
                      ) : status === 'available' ? (
                        <Button className={`bg-gradient-to-r ${cert.color}`}>
                          <Award className="h-4 w-4 mr-2" />
                          Resgatar Certificado
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Complete os requisitos
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
