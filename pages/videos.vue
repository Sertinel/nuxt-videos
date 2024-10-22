<template>
  <Navbar />
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('welcome') }}</h1>
    <div v-if="videos.length > 0">
      <div v-for="video in videos" :key="video.id" class="mb-4">
        <h2 class="text-xl font-semibold">{{ video.title }}</h2>
        <Player
          :title="video.title"
          :src="video.url"
          :player-settings="video.player_settings"
        />
      </div>
    </div>
    <div v-else>
      <p>{{ $t('noVideos') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useVideoStore } from '~/stores/videoStore';
import Player from '~/components/player/Player.vue';

const videoStore = useVideoStore();
const videos = computed(() => videoStore.videos);

onMounted(() => {
  videoStore.fetchVideos();
});
</script>
