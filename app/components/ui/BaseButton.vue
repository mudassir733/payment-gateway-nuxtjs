<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    label: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

    // Nuxt UI props passthrough
    color?: 'success' | 'info' | 'secondary'
    block?: boolean
    loading?: boolean
    disabled?: boolean

    // Customization
    variant?: 'solid' | 'outline' | 'ghost' | 'soft' // you can extend later
    bg?: string | false // e.g. "bg-[#db4444]" OR false to remove bg classes
    hoverBg?: string | false
    activeBg?: string | false

    text?: string // e.g. "text-white"
    rounded?: string // e.g. "rounded-sm"
    padding?: string // e.g. "py-3 px-4"

    border?: boolean
    borderClass?: string // e.g. "border border-gray-200"

    ring?: boolean
    ringClass?: string // e.g. "focus-visible:ring-2 focus-visible:ring-[#db4444]/40"

    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'success',
    variant: 'solid',

    bg: 'bg-[#db4444]',
    hoverBg: 'hover:bg-[#db4444e8]',
    activeBg: 'active:bg-[#db4444]',

    text: 'text-white',
    rounded: 'rounded-sm',
    padding: 'py-3',

    border: false,
    borderClass: 'border border-gray-200',

    ring: false,
    ringClass: 'focus-visible:ring-2 focus-visible:ring-[#db4444]/40 focus-visible:ring-offset-2',

    disabled: false,
    className: '',
})

const classes = computed(() => {
    const parts: string[] = [
        'cursor-pointer',
        props.text,
        props.rounded,
        props.padding,
        props.className,
    ]

    // Background controls
    if (props.bg !== false) parts.push(props.bg)
    if (props.hoverBg !== false) parts.push(props.hoverBg)
    if (props.activeBg !== false) parts.push(props.activeBg)

    // Border controls
    if (props.border) parts.push(props.borderClass)

    // Ring controls
    if (props.ring) parts.push(props.ringClass)


    if (props.variant === 'outline') {
        if (props.bg !== false && props.bg === 'bg-[#db4444]') {
            // keep user's explicit bg; otherwise you can set bg={false} from usage
        }
    }

    return parts.filter(Boolean).join(' ')
})
</script>

<template>
    <UButton :class="classes" :size="size" :color="color" :loading="loading" :block="block" :disabled="disabled">
        {{ label }}
    </UButton>
</template>
