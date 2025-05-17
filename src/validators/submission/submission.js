import z from 'zod';
import { isValidObjectId } from 'mongoose';

const submissionSchema = z.object({
    formId: z.string()
        .refine((val) => isValidObjectId(val), { message: "Invalid formId" }),
    userId: z.string()
        .refine((val) => isValidObjectId(val), { message: "Invalid userId" }).optional(),
    data: z.array(
        z.object({
            name: z.string(),
            value: z.any()
        })
    )
});
export default submissionSchema;
