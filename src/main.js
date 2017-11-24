// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './filters'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Vuex)
Vue.use(ElementUI)
sync(store, router)
Vue.config.productionTip = false

let resParams = JSON.parse(window.sessionStorage.getItem('userInfo'))
if (resParams) {
  store.commit('USERINFO', {userInfo: resParams})
} else {
  store.commit('USERINFO', {userInfo: {}})
}
router.beforeEach(function (to, from, next) {
  // store.commit('LOADING', {loading: true})
  if (to.meta.needLogin && !store.getters.userInfo.name) {
    next({path: '/login'})
  } else {
    next()
  }
})
router.afterEach(function (to) {
  setTimeout(() => {
    // store.commit('LOADING', {loading: false})
  },200)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
