import { z } from 'zod'

export const animeStatusOptions = ['En emisión', 'Finalizado', 'Próximamente'] as const

export const animeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'El título debe tener al menos 2 caracteres')
    .max(120, 'Máximo 120 caracteres'),
  synopsis: z
    .string()
    .trim()
    .max(1200, 'Máximo 1200 caracteres')
    .optional()
    .or(z.literal('')),
  genre: z
    .string()
    .trim()
    .min(2, 'Indica al menos un género')
    .max(80, 'Máximo 80 caracteres'),
  studio: z
    .string()
    .trim()
    .min(2, 'Indica el estudio')
    .max(80, 'Máximo 80 caracteres'),
  episodes: z.coerce
    .number()
    .int('Debe ser un número entero')
    .min(1, 'Debe tener al menos 1 episodio')
    .max(5000, 'Valor demasiado alto'),
  year: z.coerce
    .number()
    .int('Debe ser un año válido')
    .min(1950, 'Introduce un año posterior a 1950')
    .max(2100, 'Introduce un año razonable'),
  status: z.enum(animeStatusOptions, {
    errorMap: () => ({ message: 'Selecciona un estado válido' })
  }),
  rating: z.coerce
    .number()
    .int('Usa un número entero')
    .min(1, 'La puntuación mínima es 1')
    .max(10, 'La puntuación máxima es 10'),
  imageUrl: z
    .string()
    .trim()
    .url('Introduce una URL válida')
    .optional()
    .or(z.literal('')),
  favorite: z.boolean().default(false)
})

export type AnimeInput = z.output<typeof animeSchema>