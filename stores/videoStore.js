import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: []
  }),
  actions: {
    async fetchVideos() {
      const { data } = await useFetch('/api/videos')
      this.videos = data.value
    },
    async addVideo(video) {
      const { data } = await useFetch('/api/videos', {
        method: 'POST',
        body: video
      })
      this.videos.push(data.value)
    },
    async updateVideo(video) {
      await useFetch(`/api/videos/${video.id}`, {
        method: 'PUT',
        body: video
      })
      const index = this.videos.findIndex(v => v.id === video.id)
      if (index !== -1) {
        this.videos[index] = video
      }
    },
    async removeVideo(id) {
      await useFetch(`/api/videos/${id}`, { method: 'DELETE' })
      this.videos = this.videos.filter(video => video.id !== id)
    }
  }
})