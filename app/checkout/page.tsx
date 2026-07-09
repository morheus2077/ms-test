'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  Check, 
  Shield, 
  Smartphone, 
  CreditCard, 
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { plans } from '@/components/pricing'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan') || 'premium'
  const plan = plans.find((p) => p.id === planId) || plans[1]

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola'>('mpesa')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [holderName, setHolderName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page animation
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.2 }
      )

      // Summary animation
      gsap.fromTo(
        summaryRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3 }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Success animation
  useEffect(() => {
    if (isSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [isSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!phoneNumber || phoneNumber.length < 9) {
      setError('Por favor, insira um número de telefone válido.')
      return
    }
    if (!holderName || holderName.length < 3) {
      setError('Por favor, insira o nome do titular.')
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div ref={pageRef} className="min-h-screen bg-background flex items-center justify-center p-4">
        <div
          ref={successRef}
          className="max-w-md w-full text-center"
        >
          {/* Success checkmark */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Pagamento Confirmado!</h1>
          <p className="text-muted-foreground mb-8">
            Parabéns! Seu acesso ao plano {plan.name} foi ativado com sucesso. 
            Você receberá um email com as instruções de acesso.
          </p>

          <div className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/">Ir para o Início</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Você será redirecionado automaticamente em alguns segundos...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Link>
          <Link href="/" className="text-xl font-bold gradient-text">
            FluencyPro
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Pagamento Seguro</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Payment form */}
          <div ref={formRef}>
            <h1 className="text-2xl font-bold mb-2">Finalizar Compra</h1>
            <p className="text-muted-foreground mb-8">
              Complete os dados abaixo para ativar seu acesso ao FluencyPro.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment method selection */}
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Método de Pagamento
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      paymentMethod === 'mpesa'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {paymentMethod === 'mpesa' && (
                      <div className="absolute top-3 right-3">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <Smartphone className="h-8 w-8 text-red-500 mb-3" />
                    <div className="font-semibold">M-Pesa</div>
                    <div className="text-sm text-muted-foreground">Vodacom</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('emola')}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      paymentMethod === 'emola'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {paymentMethod === 'emola' && (
                      <div className="absolute top-3 right-3">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <CreditCard className="h-8 w-8 text-orange-500 mb-3" />
                    <div className="font-semibold">E-Mola</div>
                    <div className="text-sm text-muted-foreground">Movitel</div>
                  </button>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                  Número de Telefone
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +258
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="84 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="pl-16 py-6 text-lg rounded-xl"
                    maxLength={9}
                  />
                </div>
              </div>

              {/* Holder name */}
              <div>
                <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                  Nome do Titular
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome completo"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="py-6 text-lg rounded-xl"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Confirmar Pagamento
                  </span>
                )}
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Dados protegidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Garantia 30 dias</span>
                </div>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div ref={summaryRef}>
            <div className="sticky top-8">
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

                {/* Plan info */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Plano {plan.name}</span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      {plan.id === 'premium' ? 'Mais Popular' : plan.id === 'vip' ? 'Completo' : 'Iniciante'}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {plan.currency} {plan.price}
                    <span className="text-base font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold">O que está incluído:</h3>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{plan.currency} {plan.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="gradient-text">{plan.currency} {plan.price}</span>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="mt-6 p-4 rounded-xl bg-green-500/10 flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-500">Garantia de 30 dias</div>
                    <p className="text-sm text-muted-foreground">
                      Se não estiver satisfeito, devolvemos 100% do seu dinheiro.
                    </p>
                  </div>
                </div>
              </div>

              {/* Change plan link */}
              <div className="mt-4 text-center">
                <Link
                  href="/#planos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Deseja trocar de plano?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
