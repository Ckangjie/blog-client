import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import { treeData } from "./utils/treeData";
import axios from 'axios'
import Mock from './mock'
import './permission'
console.log(process.env)
/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  //生产环境
  axios.defaults.baseURL = process.env.VUE_APP_URL;//路径
}
else {
  axios.defaults.baseURL = '';//路径
}

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$treeData = treeData;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
