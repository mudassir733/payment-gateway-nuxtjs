<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
    <div class="flex items-center justify-center flex-col w-175 mx-auto h-screen">
        <div class="w-full bg-indigo-950 p-5 h-100 rounded-2xl shadow-2xl">
            <h1 class="text-white text-lg">{{ error.message }}</h1>
        </div>
        <NuxtLink to="/" class="text-gray-700 font-bold text-2xl mt-2">Go back home</NuxtLink>
    </div>
</template>
