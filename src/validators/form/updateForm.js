import { z } from "zod";

// optional validators
const optionSchema = z.object({
    value: z.string().max(30, "option max 30 characters allow"),
    checked: z.boolean().optional()
})

export const fieldsSchema = z.object({
    label: z
        .string()
        .min(3, "Label must be at least 3 characters long")
        .max(60, "Label can't be more than 60 characters"),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long"),
    type: z
        .enum(["text", "textarea", "email", "number", "radio", "checkbox", "select", "date", "file", "password", "url"]),
    placeholder: z
        .string()
        .min(3, "Placeholder must be at least 3 characters long")
        .max(60, "Placeholder can't be more than 60 characters")
        .optional(),
    required: z.boolean().optional(),
    options: z.array(optionSchema).optional()
});


const updateFormSchema = z.object({
    title: z
        .string()
        .min(6, "Title must be at least 6 characters long")
        .max(60, "Title can't be more than 60 characters")
        .optional(),
    description: z
        .string()
        .max(500, "Description can't be more than 500 characters")
        .optional(),
    fields: z
        .array(fieldsSchema)
        .min(1, "At least one field is required")
        .optional(),
    authUser: z.boolean().optional(),
    proForm: z.boolean().optional(),
    isDraft: z.boolean().optional(),
    branding: z.string().max(60, "custom branding only support under 60 characters").optional(),
})
export default updateFormSchema;
