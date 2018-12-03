import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios'
import echarts from "echarts"

import './assets/css/font.css'   //引入外部字体
// axios.defaults.baseURL = 'http://10.19.7.69:8100/sany'
axios.defaults.baseURL = 'http://10.19.7.69:8083' //线上接口地址
// import './assets/element-ui/index.css'  //element-ui
import MachingCenter from './components/MachingCenter'

Vue.component('MachingCenter',MachingCenter) //加工中心注册全局

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
