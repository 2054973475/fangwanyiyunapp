<template>
  <div class="icon-list-container">
    <van-swipe :loop="false"
               :width="70"
               :show-indicators="false">
      <van-swipe-item v-for="icon,index in iconList"
                      :key="index">
        <a href="JavaScript:;">
          <img :src="icon.iconUrl">
          <span class="name">{{icon.name}}</span>
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getDiscoverIcon } from '@/api'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  setup () {
    const data = reactive({
      iconList: [

      ]
    })
    onMounted(async () => {
      const icon = await getDiscoverIcon()
      data.iconList = icon.data.data
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.icon-list-container {
  width: 100%;
  padding: 0.2rem;
  .van-swipe {
    .van-swipe-item {
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #666666;
        font-size: 0.27rem;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-bottom: 0.1rem;
          background-color: red;
        }
      }
    }
  }
}
</style>
