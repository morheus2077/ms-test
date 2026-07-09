'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Emília Cossa',
    role: 'Desenvolvedora Front-end',
    content: 'Comecei sem saber programar e, após concluir os cursos, consegui meu primeiro estágio como desenvolvedora. A plataforma fez toda a diferença!',
    rating: 5,
    avatar: 'EM',
  },
  {
    id: 2,
    name: 'Carlos Nhantumbo',
    role: 'Estudante Universitário',
    content: 'Os projetos práticos me ajudaram a entender conceitos que eu nunca conseguia aprender apenas com teoria. Recomendo muito!',
    rating: 5,
    avatar: 'CN',
  },
  {
    id: 3,
    name: 'Celina Matavele',
    role: 'Analista de Sistemas',
    content: 'O conteúdo é muito bem organizado e atualizado. Consegui aprender React e Node.js de forma simples e objetiva.',
    rating: 5,
    avatar: 'CM',
  },
  {
    id: 4,
    name: 'Nelson Macamo',
    role: 'Desenvolvedor Full Stack',
    content: 'A assistência da IA e os desafios de programação aceleraram muito minha evolução. Hoje consigo desenvolver aplicações completas.',
    rating: 5,
    avatar: 'NM',
  },
  {
    id: 5,
    name: 'Fátima Chauque',
    role: 'Engenheira Informática',
    content: 'Além das aulas excelentes, a comunidade é muito ativa. Sempre encontro ajuda e compartilho conhecimento com outros programadores.',
    rating: 5,
    avatar: 'FC',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

      // Slider animation
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            O que nossos{' '}
            <span className="gradient-text">alunos dizem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de histórias de sucesso. Veja como o FluencyPro transformou vidas.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">
                    {/* Quote icon */}
                    <Quote className="h-12 w-12 text-primary/20 mb-6" />

                    {/* Content */}
                    <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>

                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>

                      {/* Rating */}
                      <div className="ml-auto flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
