<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('admin') }}</h1>
    <form @submit.prevent="addOrUpdateVideo" class="mb-8">
      <div class="mb-4">
        <label for="title" class="block mb-2">{{ $t('videoTitle') }}</label>
        <input v-model="currentVideo.title" id="title" type="text" required class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label for="url" class="block mb-2">{{ $t('videoUrl') }}</label>
        <input v-model="currentVideo.url" id="url" type="url" required class="w-full p-2 border rounded">
      </div>
      <div class="mb-4">
        <label for="playerSettings" class="block mb-2">{{ $t('playerSettings') }}</label>
        <textarea v-model="playerSettingsJson" id="playerSettings" rows="4" class="w-full p-2 border rounded"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ currentVideo.id ? $t('updateVideo') : $t('addVideo') }}
      </button>
      <button v-if="currentVideo.id" @click="resetForm" type="button" class="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
        {{ $t('cancel') }}
      </button>
    </form>

    <h2 class="text-xl font-semibold mb-4">{{ $t('existingVideos') }}</h2>
    <ul>
      <li v-for="video in videos" :key="video.id" class="mb-2 flex items-center">
        <span>{{ video.title }}</span>
        <button @click="editVideo(video)" class="ml-2 text-blue-500">{{ $t('edit') }}</button>
        <button @click="removeVideo(video.id)" class="ml-2 text-red-500">{{ $t('remove') }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVideoStore } from '~/stores/videoStore'

const videoStore = useVideoStore()
const videos = computed(() => videoStore.videos)

const currentVideo = ref({ title: '', url: '', player_settings: {} })
const playerSettingsJson = computed({
  get: () => JSON.stringify(currentVideo.value.player_settings, null, 2),
  set: (val) => {
    try {
      currentVideo.value.player_settings = JSON.parse(val)
    } catch (e) {
      console.error('Invalid JSON:', e)
    }
  }
})

const addOrUpdateVideo = async () => {
  if (currentVideo.value.id) {
    await videoStore.updateVideo(currentVideo.value)
  } else {
    await videoStore.addVideo(currentVideo.value)
  }
  resetForm()
}

const editVideo = (video) => {
  currentVideo.value = { ...video }
}

const removeVideo = async (id) => {
  await videoStore.removeVideo(id)
}

const resetForm = () => {
  currentVideo.value = { title: '', url: '', player_settings: {} }
}

onMounted(() => {
  videoStore.fetchVideos()
})
</script>