import { createStore } from 'vuex'

export default createStore({
  state: {
    songList: [],
    newSongList: [],
    // 当前播放音乐的下标
    songIndex: 0,
    // 0:列表循环，1：单曲循环，2随机播放
    playTheWayIndex: 0,
    // 播放状态
    playStatus: 0
  },
  getters: {
  },
  mutations: {
    ALTERPLAYTHEWAYINDEX (state, value) {
      state.playTheWayIndex = value
    },
    ALTERPLAYSTATUS (state, value) {
      state.playStatus = value
    },
    ALTERSONGINDEX (state, value) {
      state.songIndex = value
    },
    ALTERNEWSONGLIST (state, value) {
      state.newSongList = value
    },
    ALTERSONGLISTS (state, value) {
      state.songList = value
    },
    ALTERSONGLIST (state, value) {
      state.newSongList = value
      state.songList = value
    }
  },
  actions: {
  },
  modules: {
  }
})
