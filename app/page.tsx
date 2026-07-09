'use client'

import { useState, useEffect } from 'react'
import { Loader } from '@/components/loader'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Benefits } from '@/components/benefits'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { FinalCta } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Benefits />
          <Pricing />
          <Testimonials />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  )
}
