import Vue from 'vue'
Vue.filter('date', require('./date').default)
Vue.filter('artsubstr', require('./artsubstr').default)
Vue.filter('gistsubstr', require('./gistsubstr').default)