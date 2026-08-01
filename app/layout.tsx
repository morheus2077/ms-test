import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageDetector } from '@/components/language-detector'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: 'Morse Student - Aprenda Programação de Forma Eficiente e Prática',
  description: 'Domine a programação em 6 meses com nosso método comprovado. Aulas práticas, suporte diário e certificado internacional.',
  keywords: ['curso de programação', 'aprender programação', 'programação online', 'fluência em programação'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageDetector>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LanguageDetector>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
