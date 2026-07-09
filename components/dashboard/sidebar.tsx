'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PlayCircle, 
  Award, 
  BookOpen, 
  MessageCircle, 
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/lessons', label: 'Minhas Aulas', icon: PlayCircle },
  { href: '/dashboard/certificates', label: 'Certificados', icon: Award },
  { href: '/dashboard/books', label: 'Books', icon: BookOpen },
  // { href: '/dashboard/questions', label: 'Dúvidas', icon: MessageCircle },
  // { href: '/dashboard/settings', label: 'Configurações', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl glass"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text mb-8">
            Morse Student
          </Link>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent mb-6">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>{user.streak} dias</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'hover:bg-sidebar-accent text-sidebar-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-sidebar-border">
            {mounted && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5" />
                    Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    Modo Escuro
                  </>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
