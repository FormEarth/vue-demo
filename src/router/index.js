import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import test from '@/components/test'

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
    { path: '/', name: 'home', meta: { title: "首页", requireLogin: false }, component: home },
    { path: '/register', name: 'register', meta: { title: "注册", requireLogin: false }, component: register },
    {
      path: '/login', name: 'login', meta: { title: "登录", requireLogin: false }, component: login,
      children: [
      ]
    },
    { path: '/test', name: 'test', meta: { title: "测试", requireLogin: false }, component: test },
    { path: '/home/artice/detail/:id', name: 'artice', meta: { title: "文章详情", requireLogin: false }, component: artice },
    { path: '/home/artice/add', name: 'articeAdd', meta: { title: "发布长文", requireLogin: true }, component: articeAdd },
    { path: '/home/artice/edit/:id', name: 'articeEdit', meta: { title: "编辑文章", requireLogin: true }, component: articeAdd },
    { path: '/home/atlas/detail/:id', name: 'atlas', meta: { title: "图集详情", requireLogin: false }, component: atlas },
    { path: '/home/atlas/add', name: 'atlasAdd', meta: { title: "发布图集", requireLogin: true }, component: atlasAdd },
    { path: '/star', name: 'star', meta: { title: "关注", requireLogin: false }, component: star },
    { path: '/mine', name: 'mine', meta: { title: "我的", requireLogin: false }, component: mine },
    { path: '/mine/info', name: 'info', meta: { title: "个人主页", requireLogin: false }, component: info },
    { path: '/mine/setting', name: 'setting', meta: { title: "个人设置", requireLogin: true }, component: setting },
    // 404页面在最下面
    { path: '*', name: 'notfound', meta: { title: "404 not found", requireLogin: false}, component: notfound }
  ]
})
//导航守卫（navigation-guards）
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  // 判断该路由是否需要登录
  if (to.meta.requireLogin) {
    //无法从vuex中获取数据，这里从sessionStroage中获取
    const current_user = JSON.parse(sessionStorage.getItem("current_user"))
    const isLogin = current_user == null?false:true;
    if (isLogin) {  // 通过vuex state获取当前的token是否存在
      next();
    }else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    next();
  }
  //next();
})
export default router
