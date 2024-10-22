<template>
  <media-player
    :title="title"
    :src="src"
    class="w-full aspect-video"
    v-bind="playerSettings"
  >
    <media-provider></media-provider>
    <media-video-layout>
      <media-control-bar>
        <media-play-button></media-play-button>
        <media-mute-button></media-mute-button>
        <media-volume-slider></media-volume-slider>
        <media-time-slider></media-time-slider>
        <media-fullscreen-button></media-fullscreen-button>
      </media-control-bar>
    </media-video-layout>
  </media-player>
</template>

<script setup>
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaPlayer, MediaProvider } from 'vidstack/vue';
import {
  MediaVideoLayout,
  MediaControlBar,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeSlider,
  MediaTimeSlider,
  MediaFullscreenButton,
} from 'vidstack/vue/player/layouts';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  playerSettings: {
    type: Object,
    default: () => ({})
  }
});
</script>