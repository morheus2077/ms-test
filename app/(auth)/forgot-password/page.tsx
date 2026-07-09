'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Mail, Lock, Loader2, ArrowRight, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react'

type Step = 'email' | 'code' | 'newPassword' | 'success'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.auth-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate step change
    gsap.fromTo(
      '.step-content',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [step])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Por favor, insira seu email')
      return
    }
    setIsLoading(true)
    setError('')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep('code')
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) {
      setError('Por favor, insira o código completo')
      return
    }
    setIsLoading(true)
    setError('')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep('newPassword')
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      setError('Por favor, preencha todos os campos')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      return
    }
    setIsLoading(true)
    setError('')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep('success')
  }

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleEmailSubmit} className="step-content space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Esqueceu sua senha?</h2>
              <p className="text-muted-foreground mt-2">
                Insira seu email para receber um código de recuperação
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-3 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Enviar código
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <Link href="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Link>
          </form>
        )

      case 'code':
        return (
          <form onSubmit={handleCodeSubmit} className="step-content space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Verifique seu email</h2>
              <p className="text-muted-foreground mt-2">
                Enviamos um código de 6 dígitos para <span className="text-primary">{email}</span>
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-3 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-14 text-lg rounded-xl border-2"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Verificar código
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Usar outro email
            </button>
          </form>
        )

      case 'newPassword':
        return (
          <form onSubmit={handlePasswordSubmit} className="step-content space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Criar nova senha</h2>
              <p className="text-muted-foreground mt-2">
                Escolha uma senha forte para sua conta
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-3 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Redefinir senha
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        )

      case 'success':
        return (
          <div className="step-content text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center animate-success">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Senha redefinida!</h2>
              <p className="text-muted-foreground mt-2">
                Sua senha foi alterada com sucesso. Agora você pode fazer login.
              </p>
            </div>
            <Button
              onClick={() => router.push('/login')}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 group"
            >
              Ir para login
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

      <div className="auth-card w-full max-w-md relative z-10">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="text-3xl font-bold gradient-text">
              Egoíst Academy
            </Link>
          </div>

          {/* Progress Steps */}
          {step !== 'success' && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {['email', 'code', 'newPassword'].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step === s
                        ? 'bg-primary text-white'
                        : ['email', 'code', 'newPassword'].indexOf(step) > i
                        ? 'bg-green-500 text-white'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {['email', 'code', 'newPassword'].indexOf(step) > i ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-8 h-1 mx-1 rounded transition-all duration-300 ${
                        ['email', 'code', 'newPassword'].indexOf(step) > i
                          ? 'bg-green-500'
                          : 'bg-secondary'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {renderStep()}
        </div>
      </div>

      <style jsx global>{`
        @keyframes success {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-success {
          animation: success 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
