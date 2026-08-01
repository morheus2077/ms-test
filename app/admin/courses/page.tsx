'use client'

import { useState } from 'react'
import { Course, initialCourses } from '@/lib/courses-data'
import { AddCourseDialog } from '@/components/admin/add-course-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>()
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)

  const handleAddCourse = (newCourse: Course) => {
    if (selectedCourse) {
      // Update existing course
      setCourses(
        courses.map((c) =>
          c.id === newCourse.id ? newCourse : c
        )
      )
      toast.success('Curso atualizado com sucesso!')
    } else {
      // Add new course
      setCourses([...courses, newCourse])
      toast.success('Curso adicionado com sucesso!')
    }
    setSelectedCourse(undefined)
  }

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter((c) => c.id !== courseToDelete.id))
      toast.success('Curso excluído com sucesso!')
      setCourseToDelete(null)
    }
  }

  const handleOpenDialog = () => {
    setSelectedCourse(undefined)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedCourse(undefined)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciamento de Cursos</h1>
          <p className="text-muted-foreground">
            Adicione, edite ou exclua cursos da plataforma
          </p>
        </div>
        <Button onClick={handleOpenDialog} className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Curso
        </Button>
      </div>

      {/* Courses Table */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Cursos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhum curso cadastrado ainda
              </p>
              <Button onClick={handleOpenDialog} className="flex items-center gap-2 mx-auto">
                <Plus className="h-5 w-5" />
                Criar Primeiro Curso
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Curso</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Aulas</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.level === 'Iniciante'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : course.level === 'Intermediário'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {course.level}
                        </span>
                      </TableCell>
                      <TableCell>{course.totalLessons}</TableCell>
                      <TableCell>{course.hours}h</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditCourse(course)}
                            className="hover:bg-primary/10"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCourse(course)}
                            className="hover:bg-destructive/10 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Course Dialog */}
      <AddCourseDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        onSubmit={handleAddCourse}
        course={selectedCourse}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!courseToDelete} onOpenChange={(open) => {
        if (!open) setCourseToDelete(null)
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Curso</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o curso &quot;{courseToDelete?.name}&quot;? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
