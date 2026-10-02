import  {loginResponseSchema}  from "../../schemas/api/login.schema"
import {z} from 'zod';


export type LoginResponse = z.infer<typeof loginResponseSchema>
