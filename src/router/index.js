import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import allSzdl from '@/components/allSzdl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path: '/allSzdl',
    	name: 'allSzdl',
    	component: allSzdl
    }
  ]
})
