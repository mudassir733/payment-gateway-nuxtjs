import { ref } from 'vue'
import type { RegisterSchema } from '../schemas/register.schema'
import { useState } from 'nuxt/app'

interface User {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

interface RegisterResponse {
    success: boolean
    message: string
    data: {
        user: User
    }
}

interface ErrorResponse {
    statusCode: number
    statusMessage: string
    message: string
    data?: {
        errors: Array<{
            field: string
            message: string
        }>
    }
}

export const useAuth = () => {
    const user = useState<User | null>('auth-user', () => null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const register = async (data: RegisterSchema) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch<RegisterResponse>('/api/auth/register', {
                method: 'POST',
                body: data,
            })

            if (response.success) {
                user.value = response.data.user
                return { success: true, data: response }
            }

            return { success: false, error: response.message }
        } catch (err: any) {
            const errorResponse = err.data as ErrorResponse

            // Handle validation errors
            if (errorResponse?.data?.errors) {
                const validationErrors: Record<string, string> = {}
                errorResponse.data.errors.forEach((error) => {
                    validationErrors[error.field] = error.message
                })
                return { success: false, validationErrors, error: errorResponse.message }
            }

            // Handle other errors
            const errorMessage = errorResponse?.message || err.message || 'Registration failed'
            error.value = errorMessage
            return { success: false, error: errorMessage }
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        user.value = null
    }

    return {
        user,
        loading,
        error,
        register,
        logout,
    }
}
