<!-- components/ui/BaseTextarea.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: string
    label?: string
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
    width?: string
    rows?: number
    resize?: 'none' | 'y' | 'x' | 'both'
    error?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    rows: 4,
    resize: 'y',
    disabled: false,
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const wrapperClass = computed(() => ['w-full', props.width ?? ''].join(' ').trim())

const textareaClass = computed(() => {
    const resizeMap: Record<NonNullable<Props['resize']>, string> = {
        none: 'resize-none',
        y: 'resize-y',
        x: 'resize-x',
        both: 'resize',
    }
    return resizeMap[props.resize]
})
</script>

<template>
    <div :class="wrapperClass" class="space-y-1 flex flex-col">
        <label v-if="label" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <!-- Nuxt UI -->
        <UTextarea :ui="{
            base: 'bg-gray-100 ring-0! text-gray-700'
        }" autoresize :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)"
            :placeholder="placeholder" :size="size" :rows="rows" :disabled="disabled" :class="textareaClass" />

        <p v-if="error" class="text-xs text-red-500">
            {{ error }}
        </p>
    </div>
</template>
