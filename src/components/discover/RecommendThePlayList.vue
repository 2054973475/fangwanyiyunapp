<template>
  <div class="recommend-the-play-list-container">
    <header>
      <div class="title">推荐歌单</div>
      <div class="more">更多></div>
    </header>
    <main>
      <van-swipe :loop="false"
                 :width="120"
                 :show-indicators="false">
        <van-swipe-item v-for="play,index in playList"
                        :key="index"
                        @click="toSongListDetails(play.id)">
          <a href="JavaScript:;">
            <img :src="play.picUrl">
            <div class="play-count">
              <svg class="icon"
                   aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              {{playCount(play.playCount)}}
            </div>
            <div class="name">
              {{play.name}}
            </div>
          </a>
        </van-swipe-item>
      </van-swipe>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    playList: {
      type: Array
    }
  },
  setup (props) {
    const router = useRouter()
    const playCount = (count) => {
      if (count >= 10000) {
        return (count / 10000).toFixed(0) + '万'
      } else if (count >= 100000000) {
        return (count / 100000000).toFixed(1) + '亿'
      } else if (count < 10000) {
        return count
      }
    }
    const toSongListDetails = (id) => {
      router.push({
        name: 'songListDetails',
        query: {
          id
        }
      })
    }
    return {
      playCount,
      toSongListDetails
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-the-play-list-container {
  border-top: 0.02rem solid rgba(0, 0, 0, 0.1);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
  padding: 0.2rem;
  header {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 0.4rem;
    }
    .more {
      font-size: 0.26rem;
      border: .02rem solid rgba(0, 0, 0, 0.3);
      padding: .04rem .16rem;
      border-radius: .2rem;
    }
  }
  main {
    margin-bottom: 0.2rem;
    .van-swipe {
      .van-swipe-item {
        display: flex;
        justify-content: center;
        a {
          position: relative;
          .play-count {
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            font-size: 0.24rem;
            color: white;
            padding: 0.04rem 0.1rem;
            border-radius: 0.2rem;
            .icon {
              width: 0.2rem;
              height: 0.2rem;
            }
          }
          img {
            border-radius: 0.2rem;
            width: 2rem;
            height: 2rem;
          }
          .name {
            width: 2rem;
            color: #666666;
            font-size: 0.26rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
