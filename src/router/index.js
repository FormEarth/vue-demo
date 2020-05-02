import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';
import api from '@/axios/api'

import login from '@/components/view/login'
import register from '@/components/view/register'

import writings from '@/components/view/home/Writing'
import article from '@/components/view/home/article/article'
import articleAdd from '@/components/view/home/article/create'
import articleEdit from '@/components/view/home/article/edit'
import atlasList from '@/components/view/home/atlas/atlasList'
import atlasAdd from '@/components/view/home/atlas/create'
import atlasEdit from '@/components/view/home/atlas/edit'

import star from '@/components/view/star'

import mine from '@/components/view/mine'
import personal from '@/components/view/mine/personal'
import infoEdit from '@/components/view/mine/edit'
import editAvatar from '@/components/view/mine/editAvatar'
import info from '@/components/view/mine/info'
import setting from '@/components/view/mine/setting'
import tagAdd from '@/components/view/mine/tagAdd'
import modifyPassword from '@/components/view/mine/setting/modifyPassword'

import lab from '@/components/view/mine/lab'
import nav from '@/components/view/lab/nav'

import writing from '@/components/view/home/Writing'
import writingList from '@/components/view/home/WritingList'

import test from '@/components/view/test/test'
import album from '@/components/view/test/album'
import beyondhere from '@/components/view/tools/beyondhere'

import notfound from '@/components/view/error/404'

Vue.use(Router)

const router = new Router({
  base: 'demooo',
  //使用history模式在部署时会有除根路径外的页面不能刷新，因为router页面跳转的并不是真实路径
  mode: 'history',
  routes: [
    { path: '/', name: 'homePage', meta: { title: "首页", requireLogin: false, keepAlive: true, nav: "article" }, component: writingList },
    { path: '/writing/:writingId', name: 'writing', meta: { title: "动态详情", requireLogin: false, nav: "atlas" }, component: writing },
    // { path: '/:userId/articles', name: 'articles', meta: { title: "个人主页", requireLogin: false, nav: "mine" }, component: info },
    // { path: '/:userId/articles/:currentPage', name: 'articleswithpageno', meta: { title: "个人主页", requireLogin: false,nav:"mine" }, component: articles },
    { path: '/article/detail/:articleId', name: 'article', meta: { title: "文章详情", requireLogin: false, nav: "article" }, component: article },
    { path: '/article/add', name: 'articleAdd', meta: { title: "发布长文", requireLogin: true, nav: "article" }, component: articleAdd },
    { path: '/article/edit/:id', name: 'articleEdit', meta: { title: "编辑文章", requireLogin: true, nav: "article" }, component: articleEdit },

    { path: '/register', name: 'register', meta: { title: "注册", requireLogin: false, nav: "none" }, component: register },
    { path: '/login', name: 'login', meta: { title: "登录", requireLogin: false, nav: "none" }, component: login, },
    { path: '/test', name: 'test', meta: { title: "测试", requireLogin: false, nav: "none" }, component: test },
    { path: '/album', name: 'album', meta: { title: "相册", requireLogin: false, nav: "album" }, component: album },
    { path: '/atlas', name: 'atlasList', meta: { title: "图集", requireLogin: false, keepAlive: true, nav: "atlas" }, component: atlasList },
    
    { path: '/atlas/add', name: 'atlasAdd', meta: { title: "发布图集", requireLogin: true, nav: "atlas" }, component: atlasAdd },
    { path: '/atlas/edit/:atlasId', name: 'atlasEdit', meta: { title: "编辑图集", requireLogin: true, nav: "atlas" }, component: atlasEdit },
    { path: '/star', name: 'star', meta: { title: "关注", requireLogin: false, nav: "atlas" }, component: star },
    { path: '/mine', name: 'mine', meta: { title: "我的", requireLogin: false, nav: "mine" }, component: mine },
    { path: '/mine/personal', name: 'personal', meta: { title: "个人信息", requireLogin: true, nav: "mine" }, component: personal },
    { path: '/mine/personal/edit', name: 'personalinfoedit', meta: { title: "信息修改", requireLogin: true, nav: "mine" }, component: infoEdit },
    { path: '/mine/personal/avatar', name: 'personalAvataredit', meta: { title: "头像修改", requireLogin: true, nav: "mine" }, component: editAvatar },
    { path: '/mine/personal/frontcover', name: 'frontcoverEdit', meta: { title: "封面修改", requireLogin: true, nav: "mine" }, component: editAvatar },
    { path: '/:userId/homepage', name: 'info', meta: { title: "个人主页", requireLogin: false, keepAlive: true, nav: "mine" }, component: info },
    { path: '/mine/setting', name: 'setting', meta: { title: "个人设置", requireLogin: true, nav: "mine" }, component: setting },
    { path: '/mine/tag/add', name: 'tagAdd', meta: { title: "添加标签", requireLogin: true, nav: "mine" }, component: tagAdd },
    { path: '/mine/password/modify', name: 'modifyPassword', meta: { title: "密码修改", requireLogin: true, nav: "mine" }, component: modifyPassword },
    { path: '/lab', name: 'lab', meta: { title: "实验室", requireLogin: false, nav: "mine" }, component: lab },
    { path: '/nav', name: 'nav', meta: { title: "导航", requireLogin: false, nav: "none" }, component: nav },
    { path: '/beyondhere', name: 'beyondhere', meta: { title: "BeyondHere", requireLogin: false, nav: "mine" }, component: beyondhere },

    // 404页面在最下面
    { path: '*', name: 'notfound', meta: { title: "404 not found", requireLogin: false, nav: "atlas" }, component: notfound }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if(!to.meta.keepAlive){
        return { x: 0, y: 0 }
      }
    }
  }
})
//导航守卫（navigation-guards）
//beforeEach是router的钩子函数，在进入路由前执行
router.beforeEach((to, from, next) => {
  //已登录的情况再去登录页，跳转至首页
  if (to.name === 'login') {
    if (store.getters.isLogin) {
      router.replace('/');
    }
  }
  //判断是否有标题，有标题设置标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //移动端跳转移动端路径
  // if(/Android|webOS| iPhone | iPad | iPod |BlackBerry|opera mini|opera mobile|appleWebkit.*mobile|mobile/i.test(
  //   navigator.userAgent)) {
  //     if(to.path=='/'){
  //       next({
  //         path: '/m/home'
  //       })
  //     }
  // }
  if (!store.getters.isLogin) {
    //vuex中没有数据时从sessionStorge中获取
    //vuex中的数据在页面刷新的时候会重置，在登陆时将用户信息保存在sessionStorge,
    //若刷新页面从sessionStorge中重新获取当前用户信息给vuex赋值
    let current_user = JSON.parse(sessionStorage.getItem("current_user"));
    if (current_user) {
      store.commit("save_user", current_user);
    }
  }

  // 判断该路由是否需要登录
  if (to.meta.requireLogin) {
    //从vuex中获取是否已登录,刷新页面时由于vuex数据丢失,所以在这里重新从sessionStorage加载数据到vuex
    // console.log(store.getters.isLogin)
    // console.log(store.state.current_user)
    if (!store.getters.isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
  next();
})
export default router
