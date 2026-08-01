'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PlayCircle, 
  Users, 
  Award, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  FolderOpen,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Cursos', icon: BookOpen },
  { href: '/admin/lessons', label: 'Aulas', icon: PlayCircle },
  { href: '/admin/modules', label: 'Módulos', icon: FolderOpen },
  { href: '/admin/students', label: 'Alunos', icon: Users },
  // { href: '/admin/certificates', label: 'Certificados', icon: Award },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  // { href: '/admin/settings', label: 'Configurações', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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
          <div className="mb-8">
            <Link href="/admin" className="text-2xl font-bold gradient-text">
              Morse Student
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Painel do Admin</p>
          </div>

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
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              asChild
            >
              <Link href="/">
                Voltar ao Site
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              asChild
            >
              <Link href="/">
                <LogOut className="h-5 w-5" />
                Sair
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
