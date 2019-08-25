import request from '@/axios/axios.js' ;//导入axios实例文件中方法

//用户登陆
export function userLogin(data){
    return request.post(
        '/demo/api/user/login',
        data
    );
}

//获取一个用户的文章列表
export function getArticesByUserId(userId,currentPage){
    return request.get(
        '/demo/api/'+userId+'/artices/'+currentPage,
        {}
    );
}

//首页文章数据加载
export function artices(data){
    return request({
        url: '/demo/api/artices',
        method: 'get',
        params: data
    });
}
//首页图集数据加载
export function atlases(data){
    return request({
        url: '/demo/api/atlases',
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
