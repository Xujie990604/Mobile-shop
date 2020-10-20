import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

// 事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端的300ms的延迟的问题
FastClick.attach(document.body)
// 图片懒加载
Vue.use(vueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
