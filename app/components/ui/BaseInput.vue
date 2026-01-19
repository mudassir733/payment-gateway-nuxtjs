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
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
    return [
        'w-full',
        props.width ?? '',
    ]
})
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <UInput :ui="{
            base: 'bg-gray-100 ring-0! border-none rounded-none focus:ring-gray-0 py-2.5 text-gray-700'
        }" :type="type || 'text'" :size="size || 'md'" :placeholder="placeholder" :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event)" :class="inputClasses" />

        <p v-if="error" class="text-xs text-red-500">
            {{ error }}
        </p>
    </div>
</template>
