'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Zap, Shield, BarChart3, Heart, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: Target,
    title: 'Aprendizado Direcionado',
    description: 'Siga uma trilha de estudos estruturada, do básico ao avançado, sem perder tempo.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Projetos Reais',
    description: 'Construa aplicações completas para desenvolver experiência prática e montar seu portfólio.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Conteúdo Atualizado',
    description: 'Aprenda as tecnologias mais utilizadas pelo mercado com aulas constantemente revisadas.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Acompanhe seu Progresso',
    description: 'Visualize sua evolução, cursos concluídos e habilidades adquiridas em um único painel.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Heart,
    title: 'Pratique Codificando',
    description: 'Resolva desafios e exercícios práticos para fixar o conteúdo e ganhar confiança.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Lightbulb,
    title: 'Assistente com IA',
    description: 'Receba explicações, dicas e ajuda para resolver dúvidas de programação em tempo real.',
    color: 'from-cyan-500 to-teal-500',
  },
]

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      )

      // Grid items animation
      const items = gridRef.current?.children
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50), y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px),
                             linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Benefícios Exclusivos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            O que você ganha com a{' '}
            <span className="gradient-text">Morse Student</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Muito mais do que uma plataforma de ensino. Uma experiência completa de aprendizado na melhor didáctica possível.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
              
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <benefit.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* Bottom line */}
                <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r ${benefit.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
