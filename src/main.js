// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './axios/api'
//import "@/mock/mock.js"; //引入mock
// 引入mockjs
//require('@/mock/mock.js')

Vue.use(MuseUI);
//加载状态组件
Vue.use(Loading);
Vue.use(mavonEditor);
Vue.use(Vant);
Vue.prototype.$http=api
Vue.config.productionTip = false
//是否启用debug
Vue.config.devtools = true

//批量注册全局组件
//参数，指定获取哪个文件夹，是否遍历子文件夹，指定获取哪些文件
const componentsContext = require.context('./components/public/common', false, /\.vue$/)
componentsContext.keys().forEach(component => {
    // 获取文件中的 default 模块
    const componentConfig = componentsContext(component).default
    Vue.component(componentConfig.name, componentConfig)
    console.log(componentConfig.name)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})
