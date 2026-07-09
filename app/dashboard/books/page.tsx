'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const books = [
  {
    id: '1',
    title: 'Lógica de Programação para Iniciantes',
    author: 'Paulo Silveira',
    category: 'Lógica',
    level: 'beginner',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviews: 1542,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    description: 'Aprenda algoritmos, fluxogramas e resolução de problemas do zero.',
  },
  {
    id: '2',
    title: 'HTML & CSS: Desenvolvimento Web Moderno',
    author: 'Matheus Battisti',
    category: 'HTML & CSS',
    level: 'beginner',
    price: 399,
    originalPrice: 549,
    rating: 4.8,
    reviews: 1267,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    description: 'Construa páginas modernas, responsivas e acessíveis.',
  },
  {
    id: '3',
    title: 'JavaScript Moderno',
    author: 'Jonas Schmedtmann',
    category: 'JavaScript',
    level: 'intermediate',
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviews: 2315,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    description: 'Domine ES6+, DOM, APIs e programação assíncrona.',
  },
  {
    id: '4',
    title: 'React na Prática',
    author: 'Diego Fernandes',
    category: 'React',
    level: 'advanced',
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 986,
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop',
    description: 'Aprenda React desenvolvendo projetos completos.',
  },
  {
    id: '5',
    title: 'Node.js e APIs REST',
    author: 'Rodrigo Branas',
    category: 'Back-end',
    level: 'advanced',
    price: 749,
    originalPrice: 949,
    rating: 4.9,
    reviews: 742,
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=400&fit=crop',
    description: 'Desenvolva APIs escaláveis utilizando Node.js e Express.',
  },
  {
    id: '6',
    title: 'Git & GitHub Essencial',
    author: 'Fernando Daciuk',
    category: 'Ferramentas',
    level: 'intermediate',
    price: 299,
    originalPrice: 449,
    rating: 4.7,
    reviews: 1138,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    description: 'Controle versões dos seus projetos como um desenvolvedor profissional.',
  },
]

const levelColors = {
  beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediate: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  advanced: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}
export default function BooksPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [cart, setCart] = useState<string[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.book-card',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [searchQuery, selectedCategory, selectedLevel])

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const categories = [...new Set(books.map((b) => b.category))]

  const addToCart = (bookId: string) => {
    if (!cart.includes(bookId)) {
      setCart([...cart, bookId])
    }
  }

  const formatPrice = (price: number) => {
    return `${price} MT`
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Books</h1>
          <p className="text-muted-foreground">
            Materiais complementares para acelerar seu aprendizado
          </p>
        </div>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Carrinho
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar books..."
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
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full md:w-48 h-12 rounded-xl">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos níveis</SelectItem>
            <SelectItem value="beginner">Iniciante</SelectItem>
            <SelectItem value="intermediate">Intermediário</SelectItem>
            <SelectItem value="professional">Profissional</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-xl p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Books Grid/List */}
      <div
        ref={containerRef}
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredBooks.map((book) => (
          <Card
            key={book.id}
            className={`book-card glass border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
              viewMode === 'list' ? 'flex flex-row' : ''
            }`}
          >
            {/* Cover */}
            <div
              className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-32 h-40 flex-shrink-0' : 'aspect-[3/4]'
              }`}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {book.originalPrice > book.price && (
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                  -{Math.round((1 - book.price / book.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Content */}
            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
              <div>
                <Badge variant="outline" className={levelColors[book.level as keyof typeof levelColors]}>
                  {levelLabels[book.level as keyof typeof levelLabels]}
                </Badge>
                <h3 className="font-semibold mt-2 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                {viewMode === 'list' && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{book.description}</p>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">{book.rating}</span>
                  <span className="text-sm text-muted-foreground">({book.reviews})</span>
                </div>
              </div>
              <div className={`flex items-center justify-between ${viewMode === 'list' ? '' : 'mt-4'}`}>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">{formatPrice(book.price)}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(book.originalPrice)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => addToCart(book.id)}
                  disabled={cart.includes(book.id)}
                >
                  {cart.includes(book.id) ? 'No carrinho' : 'Comprar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum book encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}
    </div>
  )
}
