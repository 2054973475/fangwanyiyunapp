<template>
  <div>
    <main>
      <svg class="icon record rotate"
           :style="playStatus?'animation-play-state:running':'animation-play-state:paused'"
           aria-hidden="true">
        <use xlink:href="#icon-changpian"></use>
      </svg>
      <img class="img rotate"
           :style="playStatus?'animation-play-state:running':'animation-play-state:paused'"
           :src="song.al.picUrl">
      <svg class="icon stylus"
           :style="playStatus?'transform: rotateY(180deg) rotate(20deg);':'transform: rotateY(180deg) rotate(50deg);'"
           aria-hidden="true">
        <use xlink:href="#icon-changpianji-svg-copy"></use>
      </svg>
    </main>
    <footer>
      <svg class="icon collect"
           aria-hidden="true">
        <use xlink:href="#icon-shoucang-copy"></use>
      </svg>
      <svg class="icon download"
           aria-hidden="true">
        <use xlink:href="#icon-xiazai-copy"></use>
      </svg>
      <div>
        <svg class="icon sing"
             aria-hidden="true">
          <use xlink:href="#icon-changge-copy"></use>
        </svg>
      </div>
      <div>
        <svg class="icon comment"
             aria-hidden="true">
          <use xlink:href="#icon-jianyi-copy"></use>
        </svg>
      </div>

      <svg class="icon more"
           aria-hidden="true">
        <use xlink:href="#icon-gengduo-copy-copy"></use>
      </svg>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object
    },
    playStatus: {
      type: Number
    }
  }

}
</script>

<style lang="less" scoped>
main {
  position: relative;
  .rotate {
    animation: xuan 30s linear infinite;
    animation-play-state: paused;
    @keyframes xuan {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .record {
    top: 2rem;
    left: 10%;
    position: absolute;
    width: 6rem;
    height: 6rem;
  }
  .img {
    position: absolute;
    top: 3.2rem;
    left: 1.92rem;
    width: 3.6rem;
    height: 3.6rem;
    z-index: 200;
    border-radius: 50%;
  }
  .stylus {
    left: .4rem;
    top: -1.4rem;
    position: absolute;
    width: 7rem;
    height: 7rem;
    transition: all 1s linear;
    transform: rotateY(180deg) rotate(20deg);
    transform-origin: 50% 30%;
    z-index: 300;
  }
}
footer {
  position: absolute;
  bottom: 18%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .collect {
  }
  .download {
  }
  .sing {
  }
  .comment {
  }
  .more {
  }
}
</style>
