import { z } from 'zod'

// Define the schema for the registration form using Zod
export const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'), // Name validation
    email: z.string().email('Invalid email address'), // Email must be in correct format
    password: z.string().min(6, 'Password must be at least 6 characters'), // Password validation
    confirmPassword: z.string(), // Confirm password (to match with password)
}).refine(
    (data) => data.password === data.confirmPassword, // Ensures both passwords match
    {
        message: 'Passwords do not match', // Error message for mismatched passwords
        path: ['confirmPassword'], // Attach error to confirmPassword field
    }
)

// Export the type based on the schema (for TypeScript type inference)
export type RegisterSchema = z.infer<typeof registerSchema>
