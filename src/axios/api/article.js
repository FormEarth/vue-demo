import request from '@/axios/request.js';//导入axios实例文件中方法

const article = {
    //首页数据加载
    getHomePageArticles(currentPage, userId) {
        return request.get(
            '/writings',
            { params: { page: currentPage, userId: userId } }
        );
    },
    //发布文章
    releaseArticle(data) {
        return request.post(
            '/article',
            data
        );
    },
    //编辑文章
    editArticle(data) {
        return request.put(
            '/article',
            data
        );
    },
    //图片上传
    uploadArticleImage(formdata) {
        return request.post(
            '/image',
            formdata
        );
    },
    //获取评论
    getCommentsByWritingId(writingId) {
        return request.get(
            '/' + writingId + '/comments',
            {}
        )
    },
    //添加评论
    addComment(data) {
        return request.post(
            '/comment',
            data
        );
    },
    //删除评论
    deleteCommentById(commentId) {
        return request.delete(
            '/comment?commentId=' + commentId
        );
    },
    //获取回复
    getRepliesByCommentId(commentId) {
        return request.get(
            '/' + commentId + '/replies',
            {}
        )
    },
    //添加回复
    addReply(data) {
        return request.post(
            '/reply',
            data
        );
    },
    //删除回复
    deleteReplyById(replyId) {
        return request.delete(
            '/reply?replyId=' + replyId
        );
    },
}

export default article


