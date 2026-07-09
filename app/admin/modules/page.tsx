'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  FolderOpen,
  MoreHorizontal,
  GripVertical,
  PlayCircle
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select'

const modules = [
  {
    id: '1',
    course: 'Lógica de Programação',
    title: 'Módulo 1 - Fundamentos',
    description: 'Aprenda as bases da lógica de programação',
    lessonsCount: 8,
    order: 1,
    status: 'published',
  },
  {
    id: '2',
    course: 'HTML & CSS',
    title: 'Módulo 1 - HTML Básico',
    description: 'Estrutura e estilização de páginas web',
    lessonsCount: 10,
    order: 1,
    status: 'published',
  },
  {
    id: '3',
    course: 'JavaScript',
    title: 'Módulo 1 - Fundamentos JS',
    description: 'Introdução à linguagem JavaScript',
    lessonsCount: 12,
    order: 1,
    status: 'published',
  },
  {
    id: '4',
    course: 'JavaScript',
    title: 'Módulo 2 - Avançado',
    description: 'Conceitos avançados de JavaScript',
    lessonsCount: 6,
    order: 2,
    status: 'draft',
  },
]

export default function AdminModulesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newModule, setNewModule] = useState({ title: '', description: '', course: '' })

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.module-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddModule = () => {
    setIsDialogOpen(false)
    setNewModule({ title: '', description: '', course: '' })
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Módulos</h1>
          <p className="text-muted-foreground">
            Organize os módulos do curso
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Módulo</DialogTitle>
              <DialogDescription>
                Crie um novo módulo para organizar as aulas
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título do Módulo</Label>
                <Input
                  id="title"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  placeholder="Ex: Módulo 5 - Conversação Avançada"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  placeholder="Descreva o conteúdo do módulo"
                />
              </div>
              <div className="grid gap-2">
  <Label>Curso</Label>
  <Select
    value={newModule.course}
    onValueChange={(value) =>
      setNewModule({ ...newModule, course: value })
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Selecione o curso" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="logic">Lógica de Programação</SelectItem>
      <SelectItem value="htmlcss">HTML & CSS</SelectItem>
      <SelectItem value="javascript">JavaScript</SelectItem>
    </SelectContent>
  </Select>
</div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddModule}>
                Criar Módulo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar módulos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
{filteredModules.map((module) => (
  <Card key={module.id} className="module-card glass border-0">
    <CardContent className="p-4">
      <div className="flex items-center gap-4">

        {/* Drag handle */}
        <div className="cursor-move p-2 hover:bg-secondary rounded-lg transition-colors">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <FolderOpen className="h-6 w-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1">

          {/* Title + Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{module.title}</h3>

            <Badge
              variant={module.status === 'published' ? 'default' : 'secondary'}
            >
              {module.status === 'published' ? 'Publicado' : 'Rascunho'}
            </Badge>

            {/* COURSE BADGE (novo) */}
            {module.course && (
              <Badge variant="outline" className="text-xs">
                {module.course}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            {module.description}
          </p>

          {/* Lessons count */}
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <PlayCircle className="h-4 w-4" />
            {module.lessonsCount} aulas
          </div>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </CardContent>
  </Card>
))}
      </div>
    </div>
  )
}
