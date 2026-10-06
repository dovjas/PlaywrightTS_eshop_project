import {z} from 'zod'
import { poductSchema, productResponseSchema } from "../../schemas/api/product.schema";

export type Product = z.infer<typeof poductSchema>
export type ProductsResponse = z.infer<typeof productResponseSchema>

