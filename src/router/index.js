import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'

import home from '@/components/view/home'
import artice from '@/components/view/home/artice/artice'
import articeAdd from '@/components/view/home/artice/edit'
import atlas from '@/components/view/home/atlas/atlas'
import atlasAdd from '@/components/view/home/atlas/edit'

import star from '@/components/view/star'

import mine from '@/components/view/mine'
import info from '@/components/view/mine/info'
import setting from '@/components/view/mine/setting'
import notfound from '@/components/view/error/404'

Vue.use(Router)

const router = new Router({
  //去掉路径中的#
  mode: 'history',
  routes: [
    { path: '/', name: 'home', meta:{ title:"首页" },component: home },
    { path: '/register', name: 'register', meta:{ title:"注册" }, component: register },
    { path: '/login', name: 'login', meta:{ title:"登录" }, component: login,
      children:[
      ]
    },
    { path: '/home/artice/detail/:id', name: 'artice',meta:{ title:"文章详情" }, component: artice },
    { path: '/home/artice/add', name: 'articeAdd', meta:{ title:"发布长文" }, component: articeAdd },
    { path: '/home/atlas/detail/:id', name: 'atlas', meta:{ title:"图集详情" }, component: atlas },
    { path: '/home/atlas/add', name: 'atlasAdd', meta:{ title:"发布图集" }, component: atlasAdd },
    { path: '/star', name: 'star', meta:{ title:"关注" }, component: star },
    { path: '/mine', name: 'mine', meta:{ title:"我的" }, component: mine },
    { path: '/mine/info', name: 'info',meta:{ title:"个人主页" }, component: info },
    { path: '/mine/setting', name: 'setting', meta:{ title:"个人设置" }, component: setting },
    // 404页面在最下面
    { path: '*', name: 'notfound', meta:{ title:"404 not found" }, component: notfound}
  ]
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})
export default router
