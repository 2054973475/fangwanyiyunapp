<template>
  <div class="play-list">
    <header>
      <h2>当前播放<span>({{playNumber}})</span></h2>
      <div class="play-set">
        <div class="left"
             @click="alterPlayTheWay">
          <svg class="icon"
               aria-hidden="true">
            <use :xlink:href="`#${playTheWay[playTheWayIndex].icon}`"></use>
          </svg>
          {{playTheWay[playTheWayIndex].name}}
        </div>
        <div class="right">
          <svg class="icon"
               aria-hidden="true">
            <use xlink:href="#icon-download-copy"></use>
          </svg>
          <svg class="icon"
               aria-hidden="true">
            <use xlink:href="#icon-tianjia-copy"></use>
          </svg>
          <svg class="icon"
               aria-hidden="true">
            <use xlink:href="#icon-shanchu-copy"></use>
          </svg>
        </div>
      </div>
    </header>
    <main>
      <ul>
        <li v-for="play,index in  songList"
            :key="index"
            @click="playSong(play)">
          <span class="name"
                :style="play.id===newPlaySong.id?'color:red':''">
            <svg class="icon"
                 v-show="play.id===newPlaySong.id"
                 aria-hidden="true">
              <use xlink:href="#icon-bofangzhong-copy"></use>
            </svg>
            {{play.name}} -
            {{singers(play.ar)}}
          </span>
          <div class="right">
            <span class="source"
                  v-show="play.id===newPlaySong.id">来源</span>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-shanchu1-copy"></use>
            </svg>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  setup () {
    const store = useStore()
    const data = reactive({
      playTheWay: [
        {
          icon: 'icon-liebiaoxunhuan1', name: '列表循环'
        },
        {
          icon: 'icon-24gl-repeatOnce2', name: '单曲循环'
        },
        {
          icon: 'icon-gl-shuffle', name: '随机播放'
        }
      ]
    })
    const songIndex = computed(() => store.state.songIndex)
    const newPlaySong = computed(() => store.state.newSongList[songIndex.value])
    const songList = computed(() => store.state.songList)
    const playNumber = computed(() => store.state.songList.length)
    const playTheWayIndex = computed(() => store.state.playTheWayIndex)
    const newSongList = computed(() => store.state.newSongList)

    const playSong = (song) => {
      const index = newSongList.value.findIndex((item) => {
        return item.id === song.id
      })
      store.commit('ALTERSONGINDEX', index)
    }
    const singers = (singerList) => {
      let name = ''
      singerList.forEach(element => {
        name += element.name + '/'
      })
      return name.slice(0, -1)
    }
    // 随机数组
    function getArrRandomly (arr) {
      const len = arr.length
      // 首先从最大的数开始遍历，以后递减
      for (let i = len - 1; i >= 0; i--) {
        // 随机索引值randomIndex是从0-arr.length中随机抽取的
        const randomIndex = Math.floor(Math.random() * (i + 1))
        // 下面三句至关于把从数组中随机抽取到的值与当前遍历的值互换位置
        const itemIndex = arr[randomIndex]
        arr[randomIndex] = arr[i]
        arr[i] = itemIndex
      }
      return arr
    }
    // 修改播放方式
    const alterPlayTheWay = () => {
      if (playTheWayIndex.value === 2) {
        store.commit('ALTERPLAYTHEWAYINDEX', 0)
        const newIndex = songList.value.findIndex((item) => {
          return item.id === newSongList.value[songIndex.value].id
        })
        store.commit('ALTERSONGINDEX', newIndex)
        store.commit('ALTERNEWSONGLIST', songList.value)
      } else {
        store.commit('ALTERPLAYTHEWAYINDEX', playTheWayIndex.value + 1)
        if (playTheWayIndex.value === 2) {
          let newSongLists = [...songList.value]
          newSongLists = getArrRandomly(newSongLists)
          const newIndex = newSongLists.findIndex((item) => {
            return item.id === songList.value[songIndex.value].id
          })
          store.commit('ALTERNEWSONGLIST', newSongLists)
          store.commit('ALTERSONGINDEX', newIndex)
        }
      }
    }
    return {
      singers,
      playSong,
      alterPlayTheWay,
      ...toRefs(data),
      newPlaySong,
      songList,
      playNumber,
      playTheWayIndex
    }
  }
}
</script>

<style lang="less" scoped>
.play-list {
  padding: 0.4rem;
  padding-top: 0;
  header {
    position: sticky;
    top: 0;
    padding: 0.4rem 0;
    background-color: white;
    h2 {
      margin-bottom: 0.2rem;
      span {
        font-size: 0.32rem;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .play-set {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        font-size: 0.32rem;
        .icon {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.12rem;
        }
      }
      .right {
        .icon {
          width: 0.5rem;
          height: 0.5rem;
          margin-left: 0.5rem;
        }
      }
    }
  }
  main {
    ul {
      li {
        padding: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          display: inline-block;
          width: 4.7rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .source {
            border: 0.02rem solid rgba(0, 0, 0, 0.3);
            padding: 0.04rem 0.2rem;
            border-radius: 0.2rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
