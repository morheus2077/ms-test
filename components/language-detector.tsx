'use client'

import { useEffect } from 'react'

export function LanguageDetector({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Check if language preference is already stored
    const storedLang = localStorage.getItem('app-language')
    if (storedLang) {
      // Update html lang attribute if needed
      document.documentElement.lang = storedLang
      return
    }

    // Get browser/device language
    const browserLang = navigator.language || 'pt-BR'
    
    // Map browser language to supported language (only pt-BR is currently supported)
    const supportedLanguages = ['pt-BR', 'pt']
    let detectedLang = 'pt-BR' // default language

    if (supportedLanguages.some(lang => browserLang.startsWith(lang))) {
      detectedLang = 'pt-BR'
    }

    // Store the detected language
    localStorage.setItem('app-language', detectedLang)
    
    // Update html lang attribute
    document.documentElement.lang = detectedLang
  }, [])

  return <>{children}</>
}
