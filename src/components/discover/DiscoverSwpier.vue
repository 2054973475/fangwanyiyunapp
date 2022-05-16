<template>
  <div>
    <van-swipe :autoplay="3000"
               lazy-render>
      <van-swipe-item v-for="image in images"
                      :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  padding: 0 0.2rem;
  // height: 4rem;
  img {
    width: 100%;
    height: 3rem;
    border-radius: 0.4rem;
  }
}
</style>
