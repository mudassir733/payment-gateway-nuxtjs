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

            <form class="space-y-4" @submit.prevent="submit">
                <BaseInput v-model="form.name" label="Full Name" placeholder="John Doe" :error="errors.name"
                    type="text" />

                <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com"
                    :error="errors.email" />

                <BaseInput v-model="form.password" label="Password" :type="show ? 'text' : 'password'"
                    placeholder="••••••••" :error="errors.password" :showPassword="true" />

                <BaseInput v-model="form.confirmPassword" label="Confirm Password" type="password"
                    placeholder="••••••••" :error="errors.confirmPassword" :showPassword="true" />

                <BaseButton label="Create Account" block :loading="loading" />
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
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

const form = reactive<RegisterSchema>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const show = ref(false)


const submit = async () => {
    Object.keys(errors).forEach(k => delete errors[k])

    try {
        registerSchema.parse(form)
        loading.value = true


        console.log('Register payload', form)

        loading.value = false
    } catch (err) {
        if (err instanceof ZodError) {
            return err.message
        }
    }
}
</script>
