import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import useVant from './plusing/vant'
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vue3Marquee)
useVant(app)
app.mount('#app')
