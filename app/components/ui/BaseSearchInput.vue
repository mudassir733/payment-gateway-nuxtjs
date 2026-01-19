<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: string
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
    width?: string
    icon?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'lg',
    icon: 'i-heroicons-magnifying-glass-20-solid',
    disabled: false,
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'search', value: string): void
}>()

const wrapperClass = computed(() =>
    ['w-full', props.width ?? ''].join(' ').trim()
)

const onInput = (value: string) => {
    emit('update:modelValue', value)
    emit('search', value)
}
</script>

<template>
    <div :class="wrapperClass">
        <UInput :ui="{
            base: 'bg-gray-100 ring-0! py-2.5 text-gray-700'
        }" :model-value="modelValue" @update:model-value="onInput" :placeholder="placeholder || 'Search...'"
            :size="size" :disabled="disabled" trailing>
            <template #trailing>
                <UIcon :name="icon" class="text-gray-700 text-lg" />
            </template>
        </UInput>
    </div>
</template>
