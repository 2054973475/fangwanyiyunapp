<template>
  <div class="bottom-player"
       v-if="song">
    <van-swipe loop
               :initial-swipe="store.state.songIndex"
               @change="onChange"
               @click="onClick"
               :show-indicators="false"
               lazy-render>
      <van-swipe-item v-for="songs,index in newSongList"
                      :key="index">
        <div class="song-img"
             :style="playStatus?'animation-play-state:running':'animation-play-state:paused'">
          <img :src="songs.al.picUrl">
        </div>
        <div class="song-name">
          {{songs.name}} -
          <span class="singer">{{singer(songs.ar)}}</span> -
          {{songs.al.name}}
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup v-model:show="songShow"
               :close-on-popstate="true"
               closeable
               close-icon="arrow-down"
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '100%' }">
      <song-details :song="song"
                    @alterCurrentTime="alterCurrentTime"
                    @playMusic="playMusic"
                    :currentTime="currentTime" />
    </van-popup>
    <div class="play"
         @click="playMusic()">
      <van-circle v-model:current-rate="currentRate"
                  :rate="rate"
                  color="black"
                  layer-color="#BEBEBE"
                  :speed="100">
        <svg class="icon"
             aria-hidden="true">
          <use :xlink:href="playStatus?'#icon-gf-pause2':'#icon-bofang2'"></use>
        </svg>
      </van-circle>
    </div>
    <div class="list"
         @click="playList">
      <svg class="icon"
           aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao-copy-copy"></use>
      </svg>
    </div>
    <audio ref="audio"
           :loop="playTheWayIndex===1?true:false"
           :src="`https://music.163.com/song/media/outer/url?id=${song.id}.mp3`">
    </audio>
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
import PlayList from '@/components/PlayList'
import SongDetails from '@/components/SongDetails'
import { useStore } from 'vuex'
import { nextTick, reactive, toRefs, ref, watch, computed } from 'vue'

export default {
  components: {
    PlayList,
    SongDetails
  },
  setup () {
    const store = useStore()
    const data = reactive({
      first: 0,
      songShow: ref(false),
      audio: ref(null),
      currentTime: 0,
      currentRate: ref(0),
      rate: 0,
      show: ref(false),
      alterRate: null
    })
    const songList = computed(() => store.state.songList)
    const newSongList = computed(() => store.state.newSongList)
    const playStatus = computed(() => store.state.playStatus)
    const playTheWayIndex = computed(() => store.state.playTheWayIndex)
    const songIndex = computed(() => store.state.songIndex)
    const song = computed(() => newSongList.value[songIndex.value])
    // 轮播图变化触发的事件
    const onClick = () => {
      data.songShow = true
    }
    const onChange = (index) => {
      store.commit('ALTERSONGINDEX', index)
    }
    // 播放列表展开
    const playList = () => {
      data.show = true
    }
    // 开始播放
    const playStart = () => {
      data.audio.play()
      store.commit('ALTERPLAYSTATUS', 1)
      rateStatus()
    }
    // 暂停播放
    const playStop = () => {
      data.audio.pause()
      store.commit('ALTERPLAYSTATUS', 0)
    }
    // 监听歌曲变化
    watch(
      () => song.value,
      (count, prevCount) => {
        nextTick(() => {
          playStart()
        })
      },
      {
        deep: true
      }
    )
    // 歌手名称
    const singer = (singers) => {
      let name = ''
      singers.forEach(element => {
        name += element.name + '/'
      })
      return name.slice(0, -1)
    }
    // 进度条
    function rateStatus () {
      data.alterRate = requestAnimationFrame(function rate () {
        if (data.audio.paused) {
          store.commit('ALTERPLAYSTATUS', 0)
          cancelAnimationFrame(data.alterRate)
          if (data.rate === '100') {
            if (songIndex.value === songList.value.length - 1) {
              store.commit('ALTERSONGINDEX', 0)
            } else {
              store.commit('ALTERSONGINDEX', songIndex.value + 1)
            }
          }
        } else {
          if (!isNaN(data.audio.duration)) {
            data.currentTime = data.audio.currentTime
            data.rate = (data.audio.currentTime / data.audio.duration * 100).toFixed(0)
          }
          data.alterRate = requestAnimationFrame(rate)
        }
      })
    }
    // 播放和暂停设置
    const playMusic = () => {
      if (playStatus.value) {
        playStop()
      } else {
        playStart()
      }
    }
    const alterCurrentTime = (value) => {
      data.audio.currentTime = value
      data.currentTime = value
    }
    return {
      alterCurrentTime,
      onClick,
      store,
      onChange,
      ...toRefs(data),
      singer,
      playMusic,
      playList,
      song,
      songList,
      newSongList,
      playStatus,
      playTheWayIndex
      // rate
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-player {
  border-top: 0.02rem solid rgba(0, 0, 0, 0.15);
  height: 1.2rem;
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  .van-swipe {
    width: 5.2rem;
  }
  .van-swipe-item {
    width: 5.2rem;
    display: flex;
    align-items: center;
  }
  .song-img {
    width: 1rem;
    height: 1rem;
    background-color: black;
    border-radius: 50%;
    position: relative;
    top: -0.1rem;
    left: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    animation: xuan 10s linear infinite;
    animation-play-state: paused;
    @keyframes xuan {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    img {
      width: 0.7rem;
      height: 0.7rem;
      background-color: red;
      border-radius: 50%;
    }
  }
  .song-name {
    width: 3.2rem;
    margin-right: 0.8rem;
    white-space: nowrap;
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /deep/.van-icon-arrow-down:before {
    position: relative;
    z-index: 100;
    color: white;
  }
  /deep/.van-icon:before {
    font-size: 0.6rem;
  }

  .play {
    margin-right: 0.4rem;
    .van-circle {
      width: 0.7rem;
      height: 0.7rem;
      position: relative;
      .icon {
        position: absolute;
        top: 20%;
        left: 24%;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
</style>
