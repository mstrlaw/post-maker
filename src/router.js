import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Download from './views/Download.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    }
  ]
})
