import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import "./assets/css/global.css"

import './plugins/element.js'

//导入axios
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1'
Vue.prototype.$http = axios

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
