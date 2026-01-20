<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="w-full max-w-md bg-white rounded-xl shadow-sm p-8 space-y-6">

            <div class="text-center space-y-1">
                <h1 class="text-2xl font-semibold text-gray-900">
                    Create Account
                </h1>
                <p class="text-sm text-gray-500">
                    Buy and sell products with ease
                </p>
            </div>

            <!-- Error Message -->
            <div v-if="generalError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-800 text-center">{{ generalError }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="text-center text-green-500 mt-4">
                {{ successMessage }}
            </div>


            <form class="space-y-4" @submit.prevent="submit">


                <BaseInput v-model="form.name" label="Full Name" placeholder="John Doe" :error="errors.name"
                    type="text" />

                <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com"
                    :error="errors.email" />

                <BaseInput v-model="form.password" label="Password" :type="show ? 'text' : 'password'"
                    placeholder="••••••••" :error="errors.password" :showPassword="true" />

                <BaseInput v-model="form.confirmPassword" label="Confirm Password" type="password"
                    placeholder="••••••••" :error="errors.confirmPassword" :showPassword="true" />

                <BaseButton type="submit" label="Create Account" block :loading="loading" />
            </form>

            <p class="text-center text-sm text-gray-500">
                Already have an account?
                <NuxtLink to="/login" class="text-primary font-medium">
                    Sign in
                </NuxtLink>
            </p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import { registerSchema, type RegisterSchema } from '../../../schemas/register.schema'
import { ZodError } from 'zod'
import BaseInput from '../../ui/BaseInput.vue'
import BaseButton from '../../ui/BaseButton.vue'
import { useAuth } from '../../../composables/useAuth'
import { useRouter } from 'vue-router'




const form = reactive<RegisterSchema>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const show = ref(false)
const generalError = ref('')
const successMessage = ref('')
const { register } = useAuth()
const router = useRouter()

const submit = async () => {
    Object.keys(errors).forEach(k => delete errors[k])
    generalError.value = ''
    successMessage.value = ''

    try {
        registerSchema.parse(form)
        loading.value = true

        const result = await register(form)

        if (result.success) {
            form.name = ''
            form.email = ''
            form.password = ''
            form.confirmPassword = ''
            successMessage.value = 'Registration successful!'

            router.push('/')
        } else {
            if (result.validationErrors) {
                Object.assign(errors, result.validationErrors)
            }

            if (result.error) {
                generalError.value = result.error
            }
        }
    } catch (err) {
        if (err instanceof ZodError) {
            err.issues.forEach((error: any) => {
                const field = error.path[0] as string
                errors[field] = error.message
            })
        } else {
            generalError.value = 'An unexpected error occurred. Please try again.'
        }
    } finally {
        loading.value = false
    }
}
</script>
