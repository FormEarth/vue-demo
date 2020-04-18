import axios from 'axios';
// vant的toast提示框组件
import { Toast } from 'vant';
import store from '../store/index';
import router from '../router'

//不判断的话会将null上送成'null'
// let sessionId = ()
const instance = axios.create({
   baseURL: 'http://192.168.149.108:9092', //api 的 base_url
  // baseURL: 'http://106.15.120.224:9092', // api 的 base_url
  timeout: 18000, // request timeout,3分钟，因为有图片上传
  // headers: { 'Authorization-Sessionid': sessionId },//请求头
  // withCredentials: true //跨域时携带cookie
})
//请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = '127.0.0.1:8080';
// axios.defaults.timeout = 30000
//请求拦截器
instance.interceptors.request.use(
  config => {
    // const token = getCookie('名称');可以从cookie中获取token，加到请求头中
    // config.baseURL = 'http://192.168.0.110:8080'
    // config.data = JSON.stringify(config.data)
    config.headers = {'Authorization-Sessionid':sessionStorage.getItem("Authorization-Sessionid")||''}
    // config.timeout = 30000
    return config
  },
  error => {
    console.log("请求error" + error) // for debug
    Promise.reject(error);
  }
)
//响应拦截器
instance.interceptors.response.use(
  response => {
    //2000是成功请求码
    if (response.data.code != '2000') {
      if (response.data.code == '1002' || response.data.code == '1003') {
        //未登录或者登录超时清除登录状态
        store.commit('remove_user');
        sessionStorage.removeItem("current_user");
        //移除localStorage中的sessionId
        sessionStorage.removeItem("Authorization-Sessionid");
        localStorage.removeItem("Authorization-Sessionid")
        //因为无法获取route.path，在这截取下,需要跳过http://
        let currentPath = window.location.href
        currentPath = currentPath.substring(currentPath.indexOf('#')+1)
        console.log("currentPath:" + currentPath)
        router.push({
          path: '/login',
          query: { redirect: currentPath }  // 获取该路由名，登录成功后跳转到该路由
        });
        // router.go(0)
        console.log("store.getters.isLogin:" + store.getters.isLogin)
      } else {
        // 轻提示弹框        
        Toast({
          message: response.data.message,
          duration: 2000,
          forbidClick: true
        });
      }
    }
    return response
  },
  error => {
    console.log("响应error" + error.toString()) // for debug
    if (typeof (error.response) == "undefined") {
      Toast({
        message: "网络连接错误",
        duration: 2000,
        forbidClick: true
      });
    }
    return Promise.reject(error)
  }
)

export default instance;