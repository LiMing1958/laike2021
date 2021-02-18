import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/index.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Button, Icon, Tabs } from 'ant-design-vue'
Vue.use(Icon)
Vue.use(VueAwesomeSwiper)
Vue.use(Tabs)
Vue.use(Button)
Vue.config.productionTip = false
// Vue.prototype.HOST = '/api'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
