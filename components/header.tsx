'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#planos', label: 'Planos' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '/login', label: 'Login' },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
    )

    // Scroll effect
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(header, { y: -100, duration: 0.3 })
      } else {
        gsap.to(header, { y: 0, duration: 0.3 })
      }
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <nav className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary">
            Morse Student
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90">
              <a href="#planos">Começar Agora</a>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass rounded-2xl mt-2 p-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <a href="#planos">Começar Agora</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
