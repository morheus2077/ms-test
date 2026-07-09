'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Clock, HeadphonesIcon, Globe, Award, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Clock,
    title: 'Aprenda no Seu Ritmo',
    description: 'Estude quando e onde quiser, com acesso ilimitado às aulas e materiais.',
  },
  {
    icon: BookOpen,
    title: 'Conteúdo Prático',
    description: 'Aprenda programação desenvolvendo projetos reais em vez de apenas assistir aulas teóricas.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Especializado',
    description: 'Tire dúvidas com mentores e conte com o auxílio de IA durante seus estudos.',
  },
  {
    icon: Globe,
    title: 'Tecnologias do Mercado',
    description: 'Domine linguagens e ferramentas utilizadas pelas principais empresas de tecnologia.',
  },
  {
    icon: Award,
    title: 'Certificado de Conclusão',
    description: 'Receba um certificado ao concluir cada curso e fortaleça seu currículo e portfólio.',
  },
  {
    icon: Users,
    title: 'Comunidade de Desenvolvedores',
    description: 'Compartilhe conhecimento, participe de desafios e evolua junto com outros programadores.',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Cards animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
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
      id="sobre"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Por que nos escolher?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tudo que você precisa para{' '}
            <span className="gradient-text">aprender a programar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos tecnologia de ponta com metodologias comprovadas para garantir 
            seu sucesso no aprendizado do inglês.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl glass hover:bg-primary/5 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
