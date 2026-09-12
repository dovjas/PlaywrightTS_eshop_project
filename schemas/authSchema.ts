import {z} from 'zod';


const loginRequestSchema = z.object({
    emai: z.string().email({message:'Invalid email address format'}),
    password: z.string().min(1,{message:'Password cannot be empty'}),
})

const loginSuccessResponseSchema = z.object({
    responseCode: z.literal(200),
    message:z.string(),
})

const loginFailedResponseSchema = z.object({
  responseCode: z.number().refine((statusCode) => statusCode !== 200, {
    message: 'Expected non-200 error response code',
  }),
  message:z.string()
});
