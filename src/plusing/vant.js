import { Swipe, SwipeItem, Circle, Popup, Slider, Overlay, Loading } from 'vant'

const vantList = [
  Swipe,
  SwipeItem,
  Circle,
  Popup,
  Slider,
  Overlay,
  Loading
]
function useVant (app) {
  vantList.forEach(item => {
    app.use(item)
  })
}
export default useVant
