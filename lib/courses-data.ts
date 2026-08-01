export interface Course {
  id: string
  name: string
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  totalLessons: number
  hours: number
  description?: string
  createdAt?: Date
}

export const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Fundamentos de Programação',
    level: 'Iniciante',
    totalLessons: 24,
    hours: 12,
    description: 'Aprenda os conceitos básicos de programação',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'JavaScript Intermediário',
    level: 'Intermediário',
    totalLessons: 32,
    hours: 18,
    description: 'Aprofunde seus conhecimentos em JavaScript',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'React Avançado',
    level: 'Avançado',
    totalLessons: 28,
    hours: 20,
    description: 'Domine React com padrões avançados',
    createdAt: new Date('2024-02-01'),
  },
]
