import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/index.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import { Button, Icon } from 'ant-design-vue'
Vue.use(Icon)
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
