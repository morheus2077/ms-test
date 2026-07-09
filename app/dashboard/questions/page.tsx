'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MessageCircle, 
  Search, 
  Send,
  CheckCircle,
  Clock,
  ChevronDown,
  HelpCircle,
  BookOpen,
  Mic,
  PenTool
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const questions = [
  {
    id: '1',
    title: 'Qual a diferença entre "has been" e "have been"?',
    description: 'Estou confuso sobre quando usar cada um desses tempos verbais.',
    category: 'Gramática',
    status: 'answered',
    createdAt: '2024-01-15',
    author: {
      name: 'João Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    },
    answer: {
      content: '"Has been" é usado com terceira pessoa do singular (he, she, it), enquanto "have been" é usado com I, you, we, they. Por exemplo: "She has been studying" vs "They have been working".',
      author: {
        name: 'Prof. Maria',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      },
      answeredAt: '2024-01-16',
    },
  },
  {
    id: '2',
    title: 'Como melhorar minha pronúncia?',
    description: 'Tenho dificuldade em pronunciar algumas palavras corretamente.',
    category: 'Pronúncia',
    status: 'answered',
    createdAt: '2024-01-14',
    author: {
      name: 'Ana Costa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    },
    answer: {
      content: 'Recomendo praticar com áudios de nativos, usar aplicativos de pronúncia e gravar sua própria voz para comparar. Também é útil focar em padrões fonéticos específicos.',
      author: {
        name: 'Prof. Carlos',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      },
      answeredAt: '2024-01-15',
    },
  },
  {
    id: '3',
    title: 'Quando usar "much" e "many"?',
    description: 'Sempre confundo essas palavras.',
    category: 'Vocabulário',
    status: 'pending',
    createdAt: '2024-01-16',
    author: {
      name: 'Pedro Lima',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    },
  },
  {
    id: '4',
    title: 'Como formar frases negativas no passado?',
    description: 'Preciso de ajuda com estrutura de frases negativas.',
    category: 'Gramática',
    status: 'pending',
    createdAt: '2024-01-17',
    author: {
      name: 'Lucia Santos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia',
    },
  },
]

const categories = [
  { id: 'grammar', label: 'Gramática', icon: BookOpen },
  { id: 'pronunciation', label: 'Pronúncia', icon: Mic },
  { id: 'vocabulary', label: 'Vocabulário', icon: PenTool },
  { id: 'other', label: 'Outros', icon: HelpCircle },
]

export default function QuestionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', category: '' })
  const [showForm, setShowForm] = useState(false)
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>(['1'])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.question-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    )
  }

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || q.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSubmitQuestion = () => {
    if (newQuestion.title && newQuestion.description) {
      // In a real app, this would send to the backend
      setNewQuestion({ title: '', description: '', category: '' })
      setShowForm(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dúvidas</h1>
          <p className="text-muted-foreground">
            Tire suas dúvidas com nossos professores
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Nova Dúvida
        </Button>
      </div>

      {/* New Question Form */}
      {showForm && (
        <Card className="glass border-0 mb-8">
          <CardHeader>
            <CardTitle>Enviar Nova Dúvida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Título da sua dúvida"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <Textarea
                placeholder="Descreva sua dúvida em detalhes..."
                value={newQuestion.description}
                onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                className="min-h-24 rounded-xl"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={newQuestion.category}
                onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
              >
                <SelectTrigger className="flex-1 h-12 rounded-xl">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.label}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSubmitQuestion} className="h-12">
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar dúvidas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 h-12 rounded-xl">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.label}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48 h-12 rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="answered">Respondidas</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions List */}
      <div ref={containerRef} className="space-y-4">
        {filteredQuestions.map((question) => {
          const isExpanded = expandedQuestions.includes(question.id)

          return (
            <Card key={question.id} className="question-card glass border-0 overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => toggleQuestion(question.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={question.author.avatar} alt={question.author.name} />
                        <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold">{question.title}</h3>
                          <Badge
                            variant="outline"
                            className={question.status === 'answered' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}
                          >
                            {question.status === 'answered' ? (
                              <><CheckCircle className="h-3 w-3 mr-1" />Respondida</>
                            ) : (
                              <><Clock className="h-3 w-3 mr-1" />Pendente</>
                            )}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{question.author.name}</span>
                          <span>•</span>
                          <span>{question.category}</span>
                          <span>•</span>
                          <span>{question.createdAt}</span>
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="pl-14 border-l-2 border-border ml-5 space-y-4">
                      <p className="text-muted-foreground">{question.description}</p>
                      
                      {question.answer && (
                        <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={question.answer.author.avatar} alt={question.answer.author.name} />
                              <AvatarFallback>{question.answer.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{question.answer.author.name}</p>
                              <p className="text-xs text-muted-foreground">{question.answer.answeredAt}</p>
                            </div>
                          </div>
                          <p className="text-sm">{question.answer.content}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma dúvida encontrada</h3>
          <p className="text-muted-foreground">
            Seja o primeiro a fazer uma pergunta!
          </p>
        </div>
      )}
    </div>
  )
}
