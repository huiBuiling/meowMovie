import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import Router from 'vue-router'
// Vue.use(Router);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// axios.defaults.withCredentials = true; // 解决跨域 cookie 问题
Vue.prototype.axios = axios;  // 就可以通过 this的方式引用

Vue.filter('setWH', (url, arg) => {
  if(url != null) {
    return url.replace(/w\.h/, arg);
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
