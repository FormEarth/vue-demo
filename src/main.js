// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import AppFooter from "./components/public/AppFooter.vue";
Vue.use(MuseUI);
//Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(Vant);

Vue.config.productionTip = false
// 将底部导航栏注册为全局组件
Vue.component('app-footer', AppFooter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
/**
> 没有什么是永恒的
```Java
String str = "Hello World!"
System.out.println(str);
```
**文字加粗了**
 */