import request from '@/axios/request.js';//导入axios实例文件中方法

const artice = {
    //首页文章数据加载
    artices(data) {
        return request.get({
            url: '/demo/api/artices',
            params: data
        });
    },
    //首页图集数据加载
    atlases(data) {
        return request.get({
            url: '/demo/api/atlases',
            params: data
        });
    },
    //文章详情数据加载
    articeDetail(articeId) {
        return request.get(
            '/demo/api/artice/' + articeId,
            {}
        );
    }
}

export default artice


