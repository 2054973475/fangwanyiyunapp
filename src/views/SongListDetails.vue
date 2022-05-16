<template>
  <div>
    <details-top :playlist="playlist" />
    <music-list :musicList="musicList" />
    <loading-overlay :show="musicList.length===0" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { getSongListDetails, getSongListDetailsMusicList } from '@/api'
export default {
  components: {
    LoadingOverlay: defineAsyncComponent(() => import('@/components/LoadingOverlay')),
    DetailsTop: defineAsyncComponent(() => import('@/components/songListDetails/DetailsTop')),
    MusicList: defineAsyncComponent(() => import('@/components/songListDetails/MusicList'))
  },
  setup () {
    const route = useRoute()
    const data = reactive({
      playlist: {},
      musicList: []
      // show: false
    })
    onMounted(async () => {
      const { data: playlistData } = await getSongListDetails(route.query.id)
      data.playlist = playlistData.playlist
      const { data: musicListData } = await getSongListDetailsMusicList(route.query.id)
      data.musicList = musicListData.songs
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
</style>
