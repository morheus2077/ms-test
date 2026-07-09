'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, ArrowRight, Check, X } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  }

  const strengthPercentage =
    (Object.values(passwordStrength).filter(Boolean).length / 4) * 100

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.auth-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.form-element',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (strengthPercentage < 75) {
      setError('Sua senha precisa ser mais forte')
      return
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    })

    if (success) {
      router.push('/dashboard')
    } else {
      setError('Erro ao criar conta. Tente novamente.')
    }
  }

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle()
    if (success) {
      router.push('/dashboard')
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

      <div className="auth-card w-full max-w-md relative z-10">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="form-element text-center mb-6">
            <Link href="/" className="text-3xl font-bold text-primary">
              Morse Student
            </Link>
            <p className="text-muted-foreground mt-2">Crie sua conta gratuita</p>
          </div>

          {/* Google Login */}
          <div className="form-element">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-2 hover:bg-secondary/50 transition-all duration-300"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Cadastrar com Google
            </Button>
          </div>

          {/* Divider */}
          <div className="form-element flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="form-element bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-3 text-sm text-center">
                {error}
              </div>
            )}

            <div className="form-element space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="form-element space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="form-element space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefone
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+258 84 000 0000"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="form-element space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha forte"
                  value={formData.password}
                  onChange={handleChange('password')}
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

              {/* Password Strength */}
              {formData.password && (
                <div className="space-y-2 mt-3">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${strengthPercentage}%`,
                        backgroundColor:
                          strengthPercentage < 50
                            ? '#ef4444'
                            : strengthPercentage < 75
                            ? '#f59e0b'
                            : '#22c55e',
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {passwordStrength.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      8+ caracteres
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {passwordStrength.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      Maiúscula
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {passwordStrength.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      Minúscula
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {passwordStrength.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      Número
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-element space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repita sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className="pl-12 pr-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive">As senhas não coincidem</p>
              )}
            </div>

            <div className="form-element pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Criar conta
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <p className="form-element text-center text-muted-foreground mt-6">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
