'use client'

import { useState, useEffect } from 'react'
import { Course } from '@/lib/courses-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const courseFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  level: z.enum(['Iniciante', 'Intermediário', 'Avançado'], {
    errorMap: () => ({ message: 'Selecione um nível válido' }),
  }),
  totalLessons: z.number().min(1, 'Deve ter pelo menos 1 aula'),
  hours: z.number().min(0.5, 'Deve ter pelo menos 0.5 horas'),
})

type CourseFormValues = z.infer<typeof courseFormSchema>

interface AddCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (course: Course) => void
  course?: Course
}

export function AddCourseDialog({
  open,
  onOpenChange,
  onSubmit,
  course,
}: AddCourseDialogProps) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: '',
      level: 'Iniciante',
      totalLessons: 10,
      hours: 5,
    },
  })

  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name,
        level: course.level,
        totalLessons: course.totalLessons,
        hours: course.hours,
      })
    } else {
      form.reset({
        name: '',
        level: 'Iniciante',
        totalLessons: 10,
        hours: 5,
      })
    }
  }, [course, form, open])

  const handleSubmit = (values: CourseFormValues) => {
    const newCourse: Course = {
      id: course?.id || Date.now().toString(),
      name: values.name,
      level: values.level,
      totalLessons: values.totalLessons,
      hours: values.hours,
      description: course?.description || '',
      createdAt: course?.createdAt || new Date(),
    }
    onSubmit(newCourse)
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {course ? 'Editar Curso' : 'Adicionar Novo Curso'}
          </DialogTitle>
          <DialogDescription>
            {course
              ? 'Atualize as informações do curso'
              : 'Preencha os detalhes do novo curso'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Course Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Curso</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Fundamentos de JavaScript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Level */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Iniciante">Iniciante</SelectItem>
                      <SelectItem value="Intermediário">Intermediário</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Lessons */}
            <FormField
              control={form.control}
              name="totalLessons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Aulas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="ex: 24"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hours */}
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de Conteúdo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0.5"
                      step="0.5"
                      placeholder="ex: 12"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {course ? 'Atualizar' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
