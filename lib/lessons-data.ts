export interface Lesson {
  id: string
  title: string
  description: string
  duration: number // in minutes
  videoUrl: string
  thumbnail: string
  moduleId: string
  order: number
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface Module {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

export interface LessonProgress {
  lessonId: string
  progress: number // 0-100
  completed: boolean
  lastWatched: Date
}

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Módulo 1 - Lógica de Programação',
    description: 'Aprenda os fundamentos da programação e pensamento lógico',
    order: 1,
    lessons: [
      {
        id: '1',
        title: 'O que é Programação?',
        description: 'Entenda como funcionam os programas e o papel da lógica na programação.',
        duration: 15,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=225&fit=crop',
        moduleId: 'module-1',
        order: 1,
        level: 'beginner',
      },
      {
        id: '2',
        title: 'Variáveis e Tipos de Dados',
        description: 'Aprenda a armazenar informações em variáveis e entender seus tipos.',
        duration: 20,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        moduleId: 'module-1',
        order: 2,
        level: 'beginner',
      },
      {
        id: '3',
        title: 'Estruturas Condicionais',
        description: 'Aprenda a tomar decisões com if, else e switch.',
        duration: 22,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
        moduleId: 'module-1',
        order: 3,
        level: 'beginner',
      },
    ],
  },

  {
    id: 'module-2',
    title: 'Módulo 2 - HTML & CSS',
    description: 'Crie páginas web modernas e responsivas',
    order: 2,
    lessons: [
      {
        id: '4',
        title: 'Introdução ao HTML',
        description: 'Aprenda a estrutura básica de uma página web.',
        duration: 18,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
        moduleId: 'module-2',
        order: 1,
        level: 'beginner',
      },
      {
        id: '5',
        title: 'Introdução ao CSS',
        description: 'Aprenda a estilizar páginas com CSS moderno.',
        duration: 20,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
        moduleId: 'module-2',
        order: 2,
        level: 'intermediate',
      },
      {
        id: '6',
        title: 'Flexbox e Layout Responsivo',
        description: 'Crie layouts modernos com Flexbox e responsividade.',
        duration: 28,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop',
        moduleId: 'module-2',
        order: 3,
        level: 'intermediate',
      },
    ],
  },

  {
    id: 'module-3',
    title: 'Módulo 3 - JavaScript',
    description: 'Adicione interatividade às suas aplicações web',
    order: 3,
    lessons: [
      {
        id: '7',
        title: 'Introdução ao JavaScript',
        description: 'Aprenda a linguagem que dá vida às páginas web.',
        duration: 25,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
        moduleId: 'module-3',
        order: 1,
        level: 'intermediate',
      },
      {
        id: '8',
        title: 'Arrays e Objetos',
        description: 'Aprenda estruturas de dados fundamentais em JavaScript.',
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop',
        moduleId: 'module-3',
        order: 2,
        level: 'advanced',
      },
      {
        id: '9',
        title: 'DOM e Eventos',
        description: 'Manipule elementos HTML e responda a ações do usuário.',
        duration: 35,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
        moduleId: 'module-3',
        order: 3,
        level: 'advanced',
      },
    ],
  },
]

export const lessonProgress: Record<string, LessonProgress> = {
  '1': { lessonId: '1', progress: 100, completed: true, lastWatched: new Date() },
  '2': { lessonId: '2', progress: 75, completed: false, lastWatched: new Date() },
  '3': { lessonId: '3', progress: 30, completed: false, lastWatched: new Date() },
  '4': { lessonId: '4', progress: 0, completed: false, lastWatched: new Date() },
  '5': { lessonId: '5', progress: 0, completed: false, lastWatched: new Date() },
  '6': { lessonId: '6', progress: 0, completed: false, lastWatched: new Date() },
  '7': { lessonId: '7', progress: 0, completed: false, lastWatched: new Date() },
  '8': { lessonId: '8', progress: 0, completed: false, lastWatched: new Date() },
  '9': { lessonId: '9', progress: 0, completed: false, lastWatched: new Date() },
}

export function getLessonById(id: string): Lesson | undefined {
  for (const module of modules) {
    const lesson = module.lessons.find((l) => l.id === id)
    if (lesson) return lesson
  }
  return undefined
}

export function getNextLesson(currentId: string): Lesson | undefined {
  let found = false
  for (const module of modules) {
    for (const lesson of module.lessons) {
      if (found) return lesson
      if (lesson.id === currentId) found = true
    }
  }
  return undefined
}