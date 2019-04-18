import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/components/view/home'
import artice from '@/components/view/home/artice'
import writeArtice from '@/components/view/home/writeArtice'
import pictures from '@/components/view/home/pictures'
import atlas from '@/components/view/home/atlas'

import star from '@/components/view/star'
import mine from '@/components/view/mine'
import info from '@/components/view/mine/info'
import setting from '@/components/view/mine/setting'
import notfound from '@/components/view/error/404'


Vue.use(Router)

export default new Router({
  //去掉路径中的#
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: home },
    { path: '/register', name: 'register', component: register },
    { path: '/login', name: 'login', component: login,
      children:[
      ]
    },
    { path: '/home/artice/get/:id', name: 'artice', component: artice },
    { path: '/home/artice/add', name: 'writeArtice', component: writeArtice },
    { path: '/home/pictures/:id', name: 'pictures', component: pictures },
    { path: '/home/atlas/add', name: 'atlas', component: atlas },
    { path: '/star', name: 'star', component: star },
    { path: '/mine', name: 'mine', component: mine },
    { path: '/mine/info', name: 'info', component: info },
    { path: '/mine/setting', name: 'setting', component: setting },
    // 404页面在最下面
    { path: '*', name: 'notfound', component: notfound}
  ]
})
