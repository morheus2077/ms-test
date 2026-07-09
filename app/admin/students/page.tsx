'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Ban,
  Mail,
  Clock,
  TrendingUp
} from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const students = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    plan: 'premium',
    progress: 52,
    lessonsWatched: 24,
    studyTime: 1840,
    joinedAt: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    plan: 'vip',
    progress: 78,
    lessonsWatched: 42,
    studyTime: 3200,
    joinedAt: '2023-11-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Pedro Lima',
    email: 'pedro@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    plan: 'basic',
    progress: 25,
    lessonsWatched: 10,
    studyTime: 720,
    joinedAt: '2024-02-01',
    status: 'active',
  },
  {
    id: '4',
    name: 'Maria Santos',
    email: 'maria@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    plan: 'premium',
    progress: 65,
    lessonsWatched: 32,
    studyTime: 2100,
    joinedAt: '2023-12-10',
    status: 'active',
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    plan: 'basic',
    progress: 12,
    lessonsWatched: 5,
    studyTime: 180,
    joinedAt: '2024-02-20',
    status: 'suspended',
  },
]

const planColors = {
  basic: 'bg-green-500/10 text-green-600',
  premium: 'bg-blue-500/10 text-blue-600',
  vip: 'bg-purple-500/10 text-purple-600',
}

const planLabels = {
  basic: 'Básico',
  premium: 'Premium',
  vip: 'VIP',
}

export default function AdminStudentsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.student-row',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = selectedPlan === 'all' || student.plan === selectedPlan
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus
    return matchesSearch && matchesPlan && matchesStatus
  })

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestão de Alunos</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie os alunos do curso
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{students.length}</p>
            <p className="text-sm text-muted-foreground">Total de Alunos</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">
              {students.filter((s) => s.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">
              {students.filter((s) => s.plan === 'premium' || s.plan === 'vip').length}
            </p>
            <p className="text-sm text-muted-foreground">Básico/Premium</p>
          </CardContent>
        </Card>
        <Card className="glass border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
            </p>
            <p className="text-sm text-muted-foreground">Progresso Médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
          <SelectTrigger className="w-full md:w-40 h-12 rounded-xl">
            <SelectValue placeholder="Plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos planos</SelectItem>
            <SelectItem value="basic">Básico</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-40 h-12 rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="suspended">Suspensos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="glass border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Aulas</TableHead>
                <TableHead>Tempo Estudado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="student-row">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={planColors[student.plan as keyof typeof planColors]}>
                      {planLabels[student.plan as keyof typeof planLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      {student.lessonsWatched}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatTime(student.studyTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
                      {student.status === 'active' ? 'Ativo' : 'Suspenso'}
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
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          {student.status === 'active' ? 'Suspender' : 'Reativar'}
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
