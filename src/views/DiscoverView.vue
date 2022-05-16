<template>
  <div>
    <top-nav />
    <discover-swpier :images="images" />
    <icon-list />
    <recommend-the-play-list :playList="playList" />
    <loading-overlay :show="false" />
  </div>
</template>

<script>
import LoadingOverlay from '@/components/LoadingOverlay'
import TopNav from '@/components/discover/TopNav'
import DiscoverSwpier from '@/components/discover/DiscoverSwpier'
import IconList from '@/components/discover/IconList'
import RecommendThePlayList from '@/components/discover/RecommendThePlayList'
import { getDiscoverRecommendThePlayList, getDiscoverBanner } from '@/api'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    LoadingOverlay,
    TopNav,
    DiscoverSwpier,
    IconList,
    RecommendThePlayList
  },
  setup () {
    const data = reactive({
      playList: [],
      images: []
    })
    onMounted(async () => {
      const playList = await getDiscoverRecommendThePlayList()
      data.playList = playList.data.result
      const { data: { banners } } = await getDiscoverBanner()
      data.images = banners
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
