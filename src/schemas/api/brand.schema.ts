import { z } from 'zod';

export const brandsListSchema = z.object({
  responseCode: z.number(),
  brands: z.array(
    z.object({
      id: z.number(),
      brand: z.string(),
    }),
  ),
});
