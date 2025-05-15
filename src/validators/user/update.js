import z from 'zod';
import { usernameSchema } from '../auth/register.js'

const linkSchema = z.object({
    url: z.string().optional(),
    title: z.string().optional()
})

const updateSchema = z.object({
    name: z.string().optional(),
    username: usernameSchema().optional(),
    age: z.number(),
    address: z.string().optional(),
    tagline: z.string().optional(),
    links: z.array(linkSchema).optional(),
})
export default updateSchema;
