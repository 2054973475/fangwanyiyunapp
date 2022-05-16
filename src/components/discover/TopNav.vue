<template>
  <div class="top-nav-container">
    <svg class="icon"
         aria-hidden="true">
      <use xlink:href="#icon-liebiao"></use>
    </svg>
    <div class="top-nav-content">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <svg class="icon"
         aria-hidden="true">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top-nav-container {
  padding: 0.2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .top-nav-content {
    display: flex;
    width: 70%;
    justify-content: space-around;
    font-size: 0.35rem;
    .active {
      font-weight: bold;
    }
  }
}
</style>
