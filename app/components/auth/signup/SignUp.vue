<template>
    <BaseInput v-model="form.name" label="Full Name" placeholder="John Doe" :error="errors.name" class="w-75" />
    <BaseButton size="lg" label="Create Account" block :loading="loading" class="w-75" />
    <BaseTextArea v-model="form.bio" label="Description" placeholder="Write something..." size="lg" width="max-w-xl"
        :rows="6" resize="both" :error="errors.bio" />

    <BaseSearchInput v-model="search" placeholder="Search products" size="lg" width="max-w-md" @search="onSearch" />



    <div class="flex gap-4">

        <BaseButton label="Cancel" bg="bg-transparent" class="hover:bg-transparent" :hoverBg="false" :activeBg="false"
            text="text-gray-800" :border="true" borderClass="border border-gray-300" :ring="true"
            ringClass="focus-visible:ring-2 focus-visible:ring-gray-400/40 focus-visible:ring-offset-2" />


        <BaseButton label="Continue" bg="bg-black" hoverBg="hover:bg-black/90" activeBg="active:bg-black"
            text="text-white" :ring="true" />
    </div>


</template>

<script setup lang="ts">
import BaseInput from '~/components/ui/BaseInput.vue';
import BaseButton from '~/components/ui/BaseButton.vue';
import BaseTextArea from '~/components/ui/BaseTextArea.vue';
import BaseSearchInput from '~/components/ui/BaseSearchInput.vue';
import { reactive, ref } from 'vue'

const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
})
const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const search = ref('')


const onSearch = (value: string) => {
    console.log('Searching for:', value)
}
</script>