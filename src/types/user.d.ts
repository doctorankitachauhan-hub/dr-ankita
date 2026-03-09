import z from 'zod'

export const userSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name too long"),
    email: z
        .email({ error: "Please enter a valid email address" })
        .trim()
        .min(5, { error: "Email must be at least 5 characters" })
        .max(100, { error: "Email too long" }),
    phone: z
        .string()
        .trim()
        .regex(/^[0-9]{10,15}$/, { error: "Invalid phone number" })
        .optional(),
    password: z
        .string()
        .trim()
        .min(8, { error: "Password must be at least 8 characters long" })
        .max(64, { error: "Password too long" })
        .regex(/[A-Z]/, { error: "Password must contain an uppercase letter" })
        .regex(/[a-z]/, { error: "Password must contain a lowercase letter" })
        .regex(/[0-9]/, { error: "Password must contain a number" })
        .optional(),
    address: z
        .string()
        .trim()
        .max(255, "Address too long")
        .optional(),

    dob: z
        .string()
        .datetime()
        .transform((val) => new Date(val))
        .optional(),

    role: z
        .enum(["USER", "DOCTOR",])
        .default("USER"),
}).strict()

export type UserInput = z.infer<typeof userSchema>