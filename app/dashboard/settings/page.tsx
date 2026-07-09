'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Moon,
  Sun,
  Globe,
  Mail,
  Smartphone,
  Camera,
  Save,
  Loader2
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SettingsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { user, updateUser } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.settings-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    updateUser(formData)
    setIsSaving(false)
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const planLabels = {
    basic: 'Básico',
    premium: 'Premium',
    vip: 'VIP',
  }

  return (
    <div className="max-w-3xl mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e conta
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="settings-card glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Perfil
            </CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-primary mt-1">Plano {planLabels[user?.plan ?? 'basic']}</p>
              </div>
            </div>

            <Separator />

            {/* Form */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto">
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="settings-card glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {mounted && theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              Aparência
            </CardTitle>
            <CardDescription>
              Personalize a aparência do aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  {mounted && theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-muted-foreground">
                    Escolha entre claro e escuro
                  </p>
                </div>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-muted-foreground">
                    Idioma da interface
                  </p>
                </div>
              </div>
              <Select defaultValue="pt">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="settings-card glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como você recebe alertas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações por email
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Notificações Push</p>
                  <p className="text-sm text-muted-foreground">
                    Notificações no navegador
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">SMS</p>
                  <p className="text-sm text-muted-foreground">
                    Lembretes por SMS
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, sms: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="settings-card glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Assinatura
            </CardTitle>
            <CardDescription>
              Gerencie seu plano e pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Plano {planLabels[user?.plan ?? 'basic']}</p>
                  <p className="text-sm text-muted-foreground">Renovação: 15 de Fevereiro, 2024</p>
                </div>
                <Button variant="outline">Gerenciar Plano</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Ver Histórico de Pagamentos
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="settings-card glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Segurança
            </CardTitle>
            <CardDescription>
              Proteja sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Autenticação de Dois Fatores
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Excluir Conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
