'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 })

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )

      // Title animation - split into words
      const titleEl = titleRef.current
      if (titleEl) {
        const words = titleEl.innerText.split(' ')
        titleEl.innerHTML = words
          .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
          .join(' ')

        tl.fromTo(
          titleEl.querySelectorAll('span span'),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        )
      }

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )

      // CTA animation
      // tl.fromTo(
      //   ctaRef.current?.children,
      //   { opacity: 0, y: 30 },
      //   { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      //   '-=0.3'
      // )

      // Decorative elements
      tl.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.5'
      )

      // Floating animation for decoration
      gsap.to(decorRef.current, {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative circles */}
      <div ref={decorRef} className="absolute top-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl" />
        <div className="absolute inset-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">Mais de 10.000 alunos já transformaram suas vidas</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Torne-se um programador em apenas 6 meses!{' '}
          {/* <span className="gradient-text">Rápida e Prática</span> */}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Domine a programação em apenas 6 meses com projectos práticos. 
          Aulas 100% práticas, suporte diário e certificado internacional.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl animate-pulse-glow"
          >
            <a href="#planos" className="flex items-center gap-2">
              Começar Agora
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 rounded-xl glass border-0"
          >
            <a href="#sobre" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Ver como funciona
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: '+10mil', label: 'Alunos' },
            { value: '+50', label: 'Projectos práticos' },
            { value: 'Nota 4.7', label: 'Avaliações' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
