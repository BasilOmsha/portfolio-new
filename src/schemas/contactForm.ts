import { z } from 'zod'

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .trim(),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .max(100, 'Email must be less than 100 characters')
        .toLowerCase()
        .trim(),
    message: z
        .string()
        .min(1, 'Message is required')
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters')
        .trim(),
    recaptchaToken: z.string().min(1, 'Recaptcha is required')
})

export type ContactFormData = z.infer<typeof contactFormSchema>
