<template>
  <div class="details-top">
    <img class="bgimg"
         :src="playlist.coverImgUrl">
    <header>
      <div class="left">
        <svg class="icon"
             @click="back()"
             aria-hidden="true">
          <use xlink:href="#icon-houtui"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="right">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon"
             style="margin-left: 0.3rem;"
             aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>

    </header>
    <main>
      <div class="left">
        <img :src="playlist.coverImgUrl">
        <span class="play-count">
          <svg class="icon"
               aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          {{playCount(playlist.playCount)}}
        </span>
      </div>
      <div class="right"
           v-if="playlist.creator">
        <div class="title">{{playlist.name}}</div>
        <div class="author">
          <img :src="playlist.creator.avatarUrl">
          <img class="identity-level"
               v-if="playlist.creator.avatarDetail"
               :src="playlist.creator.avatarDetail.identityIconUrl">
          <span class="nickname">
            {{playlist.creator.nickname}}
            <span class="arrow"></span>
          </span>
        </div>
        <div class="remark">
          <span class="description">{{playlist.description}}</span>
          <span class="arrow"></span>
        </div>
      </div>
    </main>
    <div class="details">
      <div class="count">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
        {{playCount(playlist.subscribedCount)}}
      </div>|
      <div class="count">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-jianyi"></use>
        </svg>
        {{playCount(playlist.commentCount)}}
      </div>|
      <div class="count">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        {{playCount(playlist.shareCount)}}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  props: {
    playlist: {
      type: Object
    }
  },
  setup (props) {
    const router = useRouter()
    const data = reactive({
      playlist: props.playlist
    })
    const back = () => {
      router.go(-1)
    }
    const playCount = (count) => {
      if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万'
      } else if (count >= 100000000) {
        return (count / 100000000).toFixed(1) + '亿'
      } else if (count < 10000) {
        return count
      }
    }
    return {
      back,
      playCount,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.details-top {
  position: relative;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  header {
    padding: 0.3rem;
    .icon {
      fill: white;
    }
    .left {
      float: left;
      display: flex;
      align-items: center;
      span {
        color: white;
        margin-left: 0.3rem;
        font-size: 0.4rem;
      }
    }
    .right {
      display: flex;
      align-items: center;
      float: right;
    }
  }
  .bgimg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 5rem;
    filter: blur(0.5rem);
  }
  main {
    margin-top: 1rem;
    padding: 0 0.4rem;
    display: flex;
    position: relative;
    .arrow {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      border-right: 0.04rem solid rgba(255, 255, 255, 0.4);
      border-bottom: 0.04rem solid rgba(255, 255, 255, 0.4);
      transform: rotate(-45deg);
    }
    .left {
      position: relative;
      img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: .2rem;
      }
      .play-count {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        color: white;
        font-size: 0.24rem;
        background-color: rgba(0, 0, 0, 0.3);
        padding: .04rem .1rem;
        border-radius: .2rem;
        .icon {
          width: .24rem;
          height: .24rem;
          vertical-align: middle;
        }
      }
    }
    .right {
      padding-left: 0.25rem;
      line-height: 0.5rem;
      .title {
        color: white;
        font-size: 0.32rem;
      }
      .remark {
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        .description {
          display: inline-block;
          width: 3.4rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .author {
        margin-top: 0.2rem;
        position: relative;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 0.3rem;
        }
        .identity-level {
          position: absolute;
          width: 0.32rem;
          height: 0.32rem;
          left: 12%;
          bottom: 19%;
        }
        .nickname {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
        }
      }
    }
  }
  .details {
    position: absolute;
    background-color: white;
    width: 5.6rem;
    height: 1rem;
    left: 13%;
    bottom: -35%;
    border-radius: .6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.3);
    .icon {
      width: .5rem;
      height: .5rem;
      vertical-align: middle;
      margin-right: .1rem;
      color:black
    }
    .count {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      color:black
      // margin-right: .2rem;
    }
  }
}
</style>
