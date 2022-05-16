<template>
  <van-overlay :show="show">
    <div class="wrapper">
      <div class="block">
        <van-loading color="#1989fa"
                     size="1.2rem" />
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: .4rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
