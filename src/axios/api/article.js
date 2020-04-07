import request from '@/axios/request.js';//导入axios实例文件中方法

const article = {
    //首页文章数据加载
    getHomePageArticles(currentPage,userId) {
        return request.get(
            '/demo/api/writings',
            {params:{page:currentPage,userId:userId}}
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
            formdata
        );
    },
    //获取评论
    getCommentsByWritingId(writingId){
        return request.get(
            '/demo/api/'+writingId+'/comments',
            {}
        )
    },
    //添加评论
    addComment(data) {
        return request.post(
            '/demo/api/comment',
            data
        );
    },
    //删除评论
    deleteCommentById(commentId) {
        return request.delete(
            '/demo/api/comment?commentId=' + commentId
        );
    },
    //获取回复
    getRepliesByCommentId(commentId) {
        return request.get(
            '/demo/api/'+commentId+'/replies',
            {}
        )
    },
    //添加回复
    addReply(data) {
        return request.post(
            '/demo/api/reply',
            data
        );
    },
    //删除回复
    deleteReplyById(replyId) {
        return request.delete(
            '/demo/api/reply?replyId=' + replyId
        );
    },
}

export default article


