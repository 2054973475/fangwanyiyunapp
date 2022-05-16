<template>
  <div class="song-details-container">
    <div class="bgimg">
      <img :src="song.al.picUrl">
    </div>

    <header>
      <div class="title">
        <Vue3Marquee :duration="10">
          <div class="name">{{song.name}}</div>
        </Vue3Marquee>
        <div class="arName">{{singerName(song.ar)}}</div>
      </div>
      <div class="right">
        <svg class="icon play"
             aria-hidden="true">
          <use xlink:href="#icon-fenxiang-copy"></use>
        </svg>
      </div>
    </header>
    <CD-Audio :song="song"
              :playStatus="playStatus" />
    <!-- <music-lyrics :song="song" /> -->
    <footer>
      <div class="progress-bar">
        <span class="current-time">{{format(currentTimeValue,1)}}</span>
        <van-slider v-model="currentTimeValue"
                    @drag-start="dragStart"
                    @drag-end="dragEnd"
                    :max="song.dt/1000">
          <template v-slot:button>
            <div class="slider-button"
                 ref="sliderButton"></div>
          </template>
        </van-slider>
        <span class="end-time">{{format(song.dt,0)}}</span>
      </div>
      <div class="buttons">
        <svg class="icon"
             aria-hidden="true">
          <use :xlink:href="`#${playTheWayIcon[playTheWayIndex]}`"></use>
        </svg>
        <svg class="icon"
             @click="previousMusic"
             aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige1"></use>
        </svg>
        <svg class="icon play-status"
             @click="playMusic"
             aria-hidden="true">
          <use :xlink:href="playStatus?'#icon-zanting':'#icon-bofang3'"></use>
        </svg>
        <svg class="icon"
             @click="nextMusic"
             aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon"
             @click="playList"
             aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao-copy-copy-copy"></use>
        </svg>
      </div>
    </footer>
    <van-popup v-model:show="show"
               round
               :close-on-popstate="true"
               position="bottom"
               :style="{ height: '70%' }">
      <play-list />
    </van-popup>
  </div>
</template>

<script>
// import MusicLyrics from './MusicLyrics.vue'
import playList from '@/components/PlayList.vue'
import dayjs from 'dayjs'
import CDAudio from './CDAudio.vue'
import { reactive, toRefs, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  components: {
    CDAudio,
    playList
    // MusicLyrics
  },
  props: {
    song: {
      type: Object
    },
    currentTime: {
      type: Number
    }
  },
  setup (props, context) {
    const store = useStore()
    const data = reactive({
      show: ref(false),
      playStatus: computed(() => store.state.playStatus),
      playTheWayIndex: computed(() => store.state.playTheWayIndex),
      playTheWayIcon: ['icon-liebiaoxunhuan1-copy', 'icon-gl-repeatOnce2-copy', 'icon-gl-shuffle-copy'],
      sliderButton: ref(null)
    })
    const currentTimeValue = computed({
      get () {
        return props.currentTime
      },
      set (val) {
        context.emit('alterCurrentTime', val)
      }
    })
    const singerName = (nameList) => {
      let name = ''
      nameList.forEach(element => {
        name += element.name + '/'
      })
      return name.slice(0, -1)
    }
    const format = (value, index) => {
      if (index) return dayjs(0).second(value).format('mm:ss')
      else return dayjs(0).millisecond(value).format('mm:ss')
    }
    const dragEnd = () => {
      data.sliderButton.style.width = '.2rem'
      data.sliderButton.style.height = '.2rem'
    }
    const dragStart = () => {
      data.sliderButton.style.width = '.4rem'
      data.sliderButton.style.height = '.4rem'
    }
    const playMusic = () => {
      context.emit('playMusic')
    }
    const playList = () => {
      data.show = true
    }
    const nextMusic = () => {
      if (store.state.songIndex === store.state.newSongList.length - 1) {
        store.commit('ALTERSONGINDEX', 0)
      } else {
        store.commit('ALTERSONGINDEX', store.state.songIndex + 1)
      }
    }
    const previousMusic = () => {
      if (store.state.songIndex === 0) {
        store.commit('ALTERSONGINDEX', store.state.newSongList.length - 1)
      } else {
        store.commit('ALTERSONGINDEX', store.state.songIndex - 1)
      }
      // ALTERSONGINDEX
    }
    return {
      currentTimeValue,
      previousMusic,
      nextMusic,
      playList,
      playMusic,
      dragStart,
      dragEnd,
      singerName,
      format,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.song-details-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bgimg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      position: absolute;
      z-index: -100;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      filter: blur(1.6rem);
    }
  }
  header {
    padding-top: .4rem;
    position: relative;
    .title {
      width: 4rem;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        width: 100%;
        font-size: .4rem;
        color: white;
        margin-right: .4rem;
      }
      .arName {
        width: 2.4rem;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .right {
      position: absolute;
      top: .4rem;
      right: .3rem;
    }
  }
  footer {
    position: absolute;
    padding: 0 .4rem;
    z-index: 120;
    height: 2rem;
    width: 100%;
    bottom: 0;
    .progress-bar {
      display: flex;
      justify-content: space-around;
      .slider-button {
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background-color: white;
        transition: all 0.2s linear;
      }
      .current-time {
        color: rgba(255, 255, 255, 0.7);
      }
      .end-time {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .buttons {
      display: flex;
      margin-top: .3rem;
      justify-content: space-around;
      align-items: center;
      .play-status {
        width: 1rem;
        height: 1rem;
      }
    }
    .van-slider {
      width: 70%;
      margin: auto;
    }
  }
}
</style>
