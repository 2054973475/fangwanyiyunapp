<template>
  <div></div>
</template>

<script>
import { getMusicLyrics } from '@/api'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
export default {
  props: {
    song: {
      type: Object
    }
  },
  setup (props) {
    const data = reactive({
      musicLyrics: null
    })
    onMounted(async () => {
      const { data: res } = await getMusicLyrics(props.song.id)
      data.musicLyrics = res.lrc.lyric
      console.log(res)
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style>
</style>
