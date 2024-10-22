<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink :to="localePath('/')" class="text-white text-xl font-bold">{{ $t('welcome') }}</NuxtLink>
      <div class="space-x-4">
        <NuxtLink :to="localePath('/')" class="text-white">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('/admin')" class="text-white">{{ $t('admin') }}</NuxtLink>
        <select v-model="$i18n.locale" @change="changeLanguage" class="bg-gray-700 text-white p-1 rounded">
          <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
            {{ locale.code.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { locale, availableLocales } = useI18n()
const router = useRouter()

const changeLanguage = () => {
  router.push(switchLocalePath(locale.value))
}
</script>