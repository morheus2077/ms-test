'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      )

      // Button pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div ref={contentRef}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Oferta por tempo limitado</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Pronto para transformar seu inglês?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto text-pretty">
            Junte-se a mais de 10.000 alunos que já mudaram suas vidas. 
            Comece sua jornada hoje mesmo com 30 dias de garantia total.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef} className="inline-block">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 rounded-2xl shadow-2xl"
            >
              <a href="#planos" className="flex items-center gap-3">
                Quero Começar Agora
                <ArrowRight className="h-6 w-6" />
              </a>
            </Button>
          </div>

          {/* Trust text */}
          <p className="mt-8 text-white/60 text-sm">
            Sem compromisso. Cancele quando quiser. Garantia de 30 dias.
          </p>
        </div>
      </div>
    </section>
  )
}
