import request from '@/axios/axios.js' ;//导入axios实例文件中方法
//用户登陆
export function userLogin(data){
    return request({
        url: '/demo/api/user/login',
        method: 'post',
        params: data
    });
}
//首页数据加载
export function artices(data){
    return request({
        url: '/demo/api/artices',
        method: 'get',
        params: data
    });
}
//文章详情数据加载
export function articeDetail(data){
    return request({
        url: '/demo/api/artice/detail/123',
        method: 'get',
        params: data
    });
}
