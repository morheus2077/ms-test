'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Check, Star, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const plans = [
  {
    id: 'basico',
    name: 'Básico',
    price: '600',
    currency: 'MZN',
    period: '/vitalício',
    description: 'Ideal para começar a aprender lógica de programação do zero.',
    features: [
      'Acesso ao curso de Lógica de Programação',
      'Aulas de HTML & CSS básicas',
      'Exercícios práticos',
      'Certificado de conclusão',
      'Acesso vitalício ao conteúdo',
    ],
    popular: false,
    cta: 'Começar Básico',
  },
  {
    id: 'intermediario',
    name: 'Intermediário',
    price: '800',
    currency: 'MZN',
    period: '/vitalício',
    description: 'Para quem quer evoluir e dominar desenvolvimento web.',
    features: [
      'Tudo do plano Básico',
      'Curso completo de JavaScript',
      'Projetos práticos reais',
      'Suporte com instrutores',
      'Comunidade de programadores',
      'Acesso vitalício ao conteúdo',
    ],
    popular: true,
    cta: 'Escolher Intermediário',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '1200',
    currency: 'MZN',
    period: '/mês',
    description: 'Plano completo para acelerar tua carreira como dev.',
    features: [
      'Tudo dos planos anteriores',
      'Projetos avançados (portfolio real)',
      'Mentoria com instrutores',
      'Revisão de código personalizada',
      'Acesso antecipado a novos cursos',
      'Certificados avançados',
    ],
    popular: false,
    cta: 'Escolher Premium',
  },
]

export function Pricing() {
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
          },
        }
      )

      // Cards animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
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
      id="planos"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Planos e Preços
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Escolha o plano ideal para{' '}
            <span className="gradient-text">seu objetivo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investimento que transforma sua vida. Escolha o plano que mais combina com você.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 items-stretch "
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group dark:text-white relative rounded-3xl p-8 transition-all duration-500 ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground scale-105 shadow-2xl shadow-primary/25'
                  : 'bg-card border border-border hover:border-primary/30'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm dark:text-white ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 ">
                <div className="flex items-baseline gap-1">
                  <span className={`text-sm ${plan.popular ? 'dark:text-white text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {plan.currency}
                  </span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'dark:text-white text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 dark:text-white">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-accent dark:text-white' : 'text-primary'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-primary-foreground/90 dark:text-white' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className={`w-full py-6 text-lg rounded-xl transition-all duration-300 group-hover:scale-105 ${
                  plan.popular
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                <Link href={`/checkout?plan=${plan.id}`} className="flex items-center justify-center gap-2">
                  {plan.popular && <Sparkles className="h-5 w-5" />}
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm">Garantia de 30 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm">Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm">Suporte dedicado</span>
          </div>
        </div>
      </div>
    </section>
  )
}
