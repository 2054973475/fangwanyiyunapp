import request from './request'

// 获取首页轮播图数据
export const getDiscoverBanner = () => request({
  url: '/banner?type=2'
})
// 获取首页icon
export const getDiscoverIcon = () => request({
  url: '/homepage/dragon/ball'
})
// 获取首页推荐歌单列表
export const getDiscoverRecommendThePlayList = () => request({
  url: '/personalized?limit=10'
})
// 获取歌单详情
export const getSongListDetails = (id) => request({
  url: '/playlist/detail',
  params: {
    id
  }
})
// 获取歌单详情页歌曲
export const getSongListDetailsMusicList = (id) => request({
  url: '/playlist/track/all',
  params: {
    id
  }
})
export const getMusicLyrics = (id) => request({
  url: '/lyric',
  params: {
    id
  }
})
