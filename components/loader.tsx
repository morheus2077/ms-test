'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    tl.to({}, {
      duration: 1.8,
      onUpdate: function () {
        const prog = Math.round(this.progress() * 100)
        setProgress(prog)
      },
    })

    gsap.to(progressRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    })

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">

        {/* LOGO */}
        <div className="relative">
          <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
            Morse Student
          </div>

          <div className="absolute -inset-6 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
        </div>

        {/* PROGRESS BAR */}
        <div className="w-72 h-1 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        {/* TEXT */}
        <span
          ref={textRef}
          className="text-sm text-blue-600 dark:text-blue-300"
        >
          Carregando... {progress}%
        </span>
      </div>
    </div>
  )
}