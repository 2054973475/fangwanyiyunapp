import { createStore } from 'vuex'

export default createStore({
  state: {
    songList: [{
      name: '光辉岁月',
      id: 347639,
      pst: 0,
      t: 0,
      ar: [{ id: 11127, name: 'Beyond', tns: [], alias: [] }],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000005267437',
      fee: 8,
      v: 29,
      crbt: null,
      cf: '',
      al: {
        id: 34257,
        name: '命运派对',
        picUrl: 'https://p2.music.126.net/BR_ETn4YsHtvDwIJbwK2KA==/109951165806258437.jpg',
        tns: [],
        pic_str: '109951165806258437',
        pic: 109951165806258430
      },
      dt: 298680,
      h: {
        br: 320000,
        fid: 0,
        size: 11949497,
        vd: 12585,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7169715,
        vd: 15200,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4779825,
        vd: 16946,
        sr: 44100
      },
      sq: {
        br: 972000,
        fid: 0,
        size: 31045457,
        vd: 12596,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 8192,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 29,
      songJumpInfo: null,
      entertainmentTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mst: 9,
      cp: 7003,
      mv: 28005,
      rurl: null,
      rtype: 0,
      publishTime: 1262275200000
    }],
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
