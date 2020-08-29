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
import './icons'
import { mainMessage } from '../src/utils/elementui'

// console.log(process.env)
//生产环境
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_URL : '';

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$treeData = treeData;
Vue.prototype.$mainMessage = mainMessage;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
