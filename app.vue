<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>