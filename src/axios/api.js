import {get, post,deletes,put} from './axios.js' ;//导入axios实例文件中方法
let bsae_api = "127.0.0.1:9092" //服务端请求地址
//根据id获取用户信息
export const getUserInfoById=(id)=>{
    return get(`${bsae_api}/web/user/${id}`); //resfulapi风格
}
//新增文章
export const createArtice=(form)=>{
    return put(`${bsae_api}/demo/api/artice`);
}

export default{
    
}