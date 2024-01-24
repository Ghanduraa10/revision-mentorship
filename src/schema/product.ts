import { z } from 'zod';

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  description: z.string(),
  image: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});
export type Product = z.infer<typeof productSchema>;

