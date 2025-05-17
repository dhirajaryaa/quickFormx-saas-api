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
            value: z.any().refine((val) => !isNaN(val) && val !== null && val !== undefined, {
                message: "Value must be valid (not NaN, null, or undefined)",
            })
        })
    )
});
export default submissionSchema;
