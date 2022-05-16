<template>
  <div class="music-list-container">
    <header>
      <div class="left">
        <svg class="icon play"
             aria-hidden="true">
          <use xlink:href="#icon-gf-playCircle"></use>
        </svg>
        <span class="title">播放全部</span>
        <span class="count">({{musicList.length}})</span>
      </div>
      <div class="right">
        <svg class="icon download"
             aria-hidden="true">
          <use xlink:href="#icon-download"></use>
        </svg>
        <svg class="icon check"
             aria-hidden="true">
          <use xlink:href="#icon-quanxuan1"></use>
        </svg>
      </div>
    </header>
    <main v-if="musicList[0]">
      <ul>
        <li v-for="music,index in musicList"
            :key="index"
            @click="alterSongList(music)">
          <div class="index"
               v-show="newSongList.length===0||music.id!==newSongList[songIndex].id">{{index+1}}</div>
          <svg class="icon"
               v-if="newSongList.length!==0"
               v-show="music.id===newSongList[songIndex].id"
               aria-hidden="true">
            <use xlink:href="#icon-bofangzhong1-copy"></use>
          </svg>
          <div class="content"
               :style="music.mv?'width:63.5%':''">
            <div class="name">{{music.name}}</div>
            <div class="author">
              <span v-if="music.hr">Hi-Res</span>
              <span v-if="music.sq">SQ</span>
              {{author(music.ar)}} - {{music.al.name}}
            </div>
          </div>
          <div class="icons"
               :style="music.mv?'width:1.4rem':''">
            <svg class="play"
                 v-if="music.mv"
                 aria-hidden="true">
              <use xlink:href="#icon-bofang1-copy-copy"></use>
            </svg>
            <svg class="more"
                 aria-hidden="true">
              <use xlink:href="#icon-gengduo-copy"></use>
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
  props: {
    musicList: {
      type: Array
    }
  },
  setup (props) {
    const store = useStore()
    const data = reactive({
      songIndex: computed(() => store.state.songIndex),
      newSongList: computed(() => store.state.newSongList)
    })
    const author = (authors) => {
      let author = ''
      authors.forEach(element => {
        author += element.name + '/'
      })
      return author.slice(0, -1)
    }
    const alterSongList = (music) => {
      store.commit('ALTERSONGLIST', props.musicList)
      const index = store.state.newSongList.findIndex((item) => {
        return item.id === music.id
      })
      store.commit('ALTERSONGINDEX', index)
      store.commit('ALTERPLAYTHEWAYINDEX', 0)
    }
    return {
      author,
      alterSongList,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.music-list-container {
  padding: 0.3rem;
  margin-top: 1.5rem;
}
header {
  padding: .4rem 0;
  position: sticky;
  top: -0.02rem;
  background-color: white;
  .left {
    float: left;
    display: flex;
    align-items: center;
    .play {
      width: 0.5rem;
      height: 0.5rem;
    }
    .title {
      margin: 0 .2rem;
      font-size: 0.35rem;
      font-weight: bold;
    }
    .count {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .right {
    float: right;
    display: flex;
    align-items: center;
    .download {
      width: 0.5rem;
      height: 0.5rem;
    }
    .check {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
    }
  }
}
header::after {
  content: '';
  display: block;
  clear: both;
}
main {
  margin-bottom: 1.2rem;
  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: .4rem 0;
      .index {
        text-align: center;
        margin-left: .2rem;
        margin-right: .4rem;
        font-size: 0.32rem;
        color: rgba(0, 0, 0, 0.7);
      }
      .icon {
        width: .6rem;
        height: .6rem;
      }
      .content {
        width: 72%;
        .name {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .author {
          color: rgba(0, 0, 0, 0.7);
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.26rem;
          line-height: .6rem;
          span {
            border: 0.02rem solid red;
            color: red;
            padding: 0.02rem;
            margin: 0.04rem;
            border-radius: 0.06rem;
          }
        }
      }
      .icons {
        display: flex;
        justify-content: right;
        align-items: center;
        .play {
          height: .6rem;
          width: .6rem;
        }
        .more {
          height: .6rem;
          width: .6rem;
          margin-left: .2rem;
        }
      }
    }
  }
}
</style>
