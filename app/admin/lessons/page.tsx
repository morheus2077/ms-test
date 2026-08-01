'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { initialCourses } from '@/lib/courses-data'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  PlayCircle,
  Clock,
  Eye,
  MoreHorizontal
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const lessons = [
  {
    id: '1',
    title: 'Introdução à Lógica de Programação',
    module: 'Módulo 1 - Lógica de Programação',
    duration: 15,
    level: 'beginner',
    views: 2340,
    status: 'published',
  },
  {
    id: '2',
    title: 'Variáveis e Tipos de Dados',
    module: 'Módulo 1 - Lógica de Programação',
    duration: 22,
    level: 'beginner',
    views: 1756,
    status: 'published',
  },
  {
    id: '3',
    title: 'Introdução ao HTML',
    module: 'Módulo 2 - HTML & CSS',
    duration: 18,
    level: 'beginner',
    views: 1980,
    status: 'published',
  },
  {
    id: '4',
    title: 'Introdução ao CSS',
    module: 'Módulo 2 - HTML & CSS',
    duration: 20,
    level: 'intermediate',
    views: 1543,
    status: 'draft',
  },
  {
    id: '5',
    title: 'Fundamentos de JavaScript',
    module: 'Módulo 3 - JavaScript',
    duration: 30,
    level: 'advanced',
    views: 876,
    status: 'published',
  },
]

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  professional: 'Profissional',
}

const levelColors = {
  beginner: 'bg-green-500/10 text-green-600',
  intermediate: 'bg-blue-500/10 text-blue-600',
  professional: 'bg-purple-500/10 text-purple-600',
}

export default function AdminLessonsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    course: '',
    module: '',
    level: '',
    duration: '',
  })

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lesson-row',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddLesson = () => {
    // In a real app, this would send to the backend
    setIsDialogOpen(false)
    setNewLesson({
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      course: '',
      module: '',
      level: '',
      duration: '',
    })
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão de Aulas</h1>
          <p className="text-muted-foreground">
            Adicione, edite e remova aulas do curso
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Aula
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Aula</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova aula
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Curso</Label>
                <Select
                  value={newLesson.course}
                  onValueChange={(value) => setNewLesson({ ...newLesson, course: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Título da Aula</Label>
                <Input
                  id="title"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="Ex: Introdução ao Past Tense"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  placeholder="Descreva o conteúdo da aula"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
                  <Input
                    id="videoUrl"
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">URL da Thumbnail</Label>
                  <Input
                    id="thumbnail"
                    value={newLesson.thumbnail}
                    onChange={(e) => setNewLesson({ ...newLesson, thumbnail: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Módulo</Label>
                  <Select
                    value={newLesson.module}
                    onValueChange={(value) => setNewLesson({ ...newLesson, module: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="module-1">Módulo 1</SelectItem>
                      <SelectItem value="module-2">Módulo 2</SelectItem>
                      <SelectItem value="module-3">Módulo 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Nível</Label>
                  <Select
                    value={newLesson.level}
                    onValueChange={(value) => setNewLesson({ ...newLesson, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">Intermediário</SelectItem>
                      <SelectItem value="professional">Profissional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newLesson.duration}
                    onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                    placeholder="15"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddLesson}>
                Adicionar Aula
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar aulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{lessons.length}</p>
            <p className="text-sm text-muted-foreground">Total de Aulas</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">
              {lessons.filter((l) => l.status === 'published').length}
            </p>
            <p className="text-sm text-muted-foreground">Publicadas</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {lessons.filter((l) => l.status === 'draft').length}
            </p>
            <p className="text-sm text-muted-foreground">Rascunhos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aula</TableHead>
                <TableHead>Módulo</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id} className="lesson-row">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lesson.module}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={levelColors[lesson.level as keyof typeof levelColors]}>
                      {levelLabels[lesson.level as keyof typeof levelLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {lesson.duration} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {lesson.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lesson.status === 'published' ? 'default' : 'secondary'}>
                      {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
