import { z } from 'zod';

export const productSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  description: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Product = z.infer<typeof productSchema>;

