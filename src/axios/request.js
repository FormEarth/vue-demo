import axios from 'axios';

// vant的toast提示框组件
import { Toast } from 'vant';

const instance = axios.create({
  baseURL: 'http://192.168.149.110:9092', // api 的 base_url
  timeout: 3000, // request timeout
  headers: { 'Content-Type': 'application/json;charset=UTF-8' } //请求头
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
    // config.headers = {'Content-Type':'application/json;charset=UTF-8'}
    // config.timeout = 30000
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error);
  }
)
instance.interceptors.response.use(
  response => {
    if(response.data.code != 2000){
      // 轻提示弹框        
      Toast({
        message: response.data.message,
        duration: 2000,
        forbidClick: true
      });
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance;