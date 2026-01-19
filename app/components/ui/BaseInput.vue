<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: string
    label?: string
    placeholder?: string
    type?: string
    size?: 'sm' | 'md' | 'lg'
    width?: string
    error?: string
    showPassword?: boolean
}


const props = withDefaults(defineProps<Props>(), {
    type: 'password',
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()


const showPassword = ref(props.showPassword || false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const inputClasses = computed(() => {
    return [
        'w-full',
        props.width ?? '',
    ]
})
// Only show the eye icon if the input type is password
const shouldShowEyeIcon = computed(() => props.type === 'password')
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <div class="relative">
            <UInput :ui="{
                base: 'bg-gray-100 ring-0! border-none rounded-none focus:ring-gray-0 py-2.5 text-gray-700'
            }" :type="showPassword && shouldShowEyeIcon ? 'text' : props.type" :model-value="props.modelValue"
                @update:model-value="emit('update:modelValue', $event)" :placeholder="props.placeholder"
                :size="props.size || 'md'" :error="props.error" :class="inputClasses" />


            <div v-if="shouldShowEyeIcon" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                @click="togglePasswordVisibility">
                <UIcon :name="showPassword ? 'i-iconoir-eye' : 'i-fluent-eye-off-20-regular'" class="text-gray-600" />
            </div>
        </div>

        <p v-if="error" class="text-xs text-red-500">
            {{ error }}
        </p>
    </div>
</template>
