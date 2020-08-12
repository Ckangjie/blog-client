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
// console.log(process.env)
//生产环境
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_URL : '';

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$treeData = treeData;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
