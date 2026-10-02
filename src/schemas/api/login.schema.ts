import {z} from 'zod'

export const loginResponseSchema = z.object({
    responseCode:z.number(),
    message:z.string()
})