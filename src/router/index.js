import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/index'
import Contact from '@/view/contact'
import Refresh from '@/view/refresh'
import Sql from '@/view/sql'
import Detail from '@/view/detail'
import Shopping from '@/view/shopping'
import Editor from '@/view/editor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: Refresh
    },
    {
      path: '/sql',
      name: 'sql',
      component: Sql
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Shopping
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
  ]
})
