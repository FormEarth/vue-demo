// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
//import "@/mock/mock.js"; //引入mock
// 引入mockjs
//require('@/mock/mock.js')

Vue.use(MuseUI);
//Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(Vant);
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})
