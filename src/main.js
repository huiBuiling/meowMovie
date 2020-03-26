import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// axios.defaults.withCredentials = true; // 解决跨域 cookie 问题
Vue.prototype.axios = axios;  // 就可以通过 this的方式引用

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
