import { brandsListSchema } from '../../schemas/api/brand.schema';
import {z} from 'zod';

export type BrandsListResponse = z.infer<typeof brandsListSchema>