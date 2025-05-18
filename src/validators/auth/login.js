import z from 'zod';
import { passwordSchema, usernameSchema } from "./register.js"

const loginSchema = z.object({
    identifier: z.union([z.string().email(), usernameSchema]),
    password: passwordSchema
})
export default loginSchema
