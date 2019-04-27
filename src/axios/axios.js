import axios from 'axios';
import router from '../router';
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant';

const service = axios.create({
    baseURL: 'http://192.168.0.110:8080', // api 的 base_url
    timeout: 3000, // request timeout
    headers: {'Content-Type':'application/json;charset=UTF-8'} //请求头
  })
//请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = '127.0.0.1:8080';
// axios.defaults.timeout = 30000
//请求拦截器
axios.interceptors.request.use(
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
  );
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.log('err' + error) // for debug
        if (error.response.data.code!=2000) {
            //轻提示弹框        
            Toast({
                message: error.response.data.message,
                duration: 1500,
                forbidClick: true
            });
            return Promise.reject(error);
        }
    }
);
//get 请求
// export function get(url, data) {
// 	return new Promise((resolve, reject) => {
// 		axios.get(url, {data}).then(response => {
// 			resolve(response.data)
// 		}).catch(error => {
// 			reject(error.data)
// 		})
// 	})
// }
// post 请求
// export function post(url, data = {}) {
// 	return new Promise((resolve, reject) => {
// 		axios.post(url, data).then(response => {
// 			resolve(response.data)
// 		}).catch(error => {
// 			reject(error.data)
// 		})
// 	})
// }
//put 请求
// export function put(url,data = {}){
//     return new Promise((resolve,reject) => {
//       axios.put(url,data).then(response => {
//              resolve(response.data);
//            },error => {
//              reject(error)
//            })
//     })
//   }
export default service