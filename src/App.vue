<template>
    <router-view />
  <bottom-player />
</template>

<script>
import { watch, onMounted } from '@vue/runtime-core'
import BottomPlayer from './components/BottomPlayer.vue'
import { useStore } from 'vuex'
export default {
  components: {
    BottomPlayer
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.commit('ALTERSONGLISTS', JSON.parse(localStorage.getItem('songList')))
      store.commit('ALTERNEWSONGLIST', JSON.parse(localStorage.getItem('newSongList')))
      store.commit('ALTERSONGINDEX', Number(localStorage.getItem('songIndex')))
      store.commit('ALTERPLAYTHEWAYINDEX', Number(localStorage.getItem('playTheWayIndex')))
    })
    watch(
      [() => store.state.songIndex, () => store.state.newSongList, () => store.state.playTheWayIndex],
      (count, prevCount) => {
        localStorage.setItem('songList', JSON.stringify(store.state.songList))
        localStorage.setItem('newSongList', JSON.stringify(store.state.newSongList))
        localStorage.setItem('songIndex', store.state.songIndex)
        localStorage.setItem('playTheWayIndex', store.state.playTheWayIndex)
      },
      {
        deep: true
      }
    )
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  .icon {
    width: 0.6rem;
    height: 0.6rem;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
