import request from '@/axios/request.js';//导入axios实例文件中方法

const article = {
    //首页文章数据加载
    getHomePageArticles() {
        return request.get(
            '/demo/api/articles/1',
            {}
        );
    },
    //首页图集数据加载
    getHomePageAtlases(data) {
        return request.get(
            '/demo/api/atlases',
            data
        );
    },
    //文章详情数据加载
    articleDetail(articleId) {
        return request.get(
            '/demo/api/article/' + articleId,
            {}
        );
    },
    //发布文章
    releaseArticle(data) {
        return request.post(
            '/demo/api/article',
            data
        );
    },
    //图片上传
    uploadArticleImage(formdata) {
        return request.post(
            '/demo/api/image',
            formdata,
            { 'Content-Type': 'multipart/form-data' }
        );
    },
    //添加评论
    addComment(data) {
        return request.post(
            '/demo/api/comment',
            data
        );
    },
    //删除评论
    dleteComment(articleId) {
        return request.delete(
            '/demo/api/comment?articleId='+ articleId
        );
    },
}

export default article


