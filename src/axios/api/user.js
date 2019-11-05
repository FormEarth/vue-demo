import request from '@/axios/request.js';//导入axios实例文件中方法

const user = {
    //用户登陆
    userLogin(data) {
        return request.post(
            "/demo/api/user/login",
            data
        )
    },
    //用户退出
    userLogout(data) {
        return request.post(
            "/demo/api/user/logout",
            data
        )
    },
    //用户信息修改
    updateUserInfo(data) {
        return request.put(
            "/demo/api/user/info",
            data
        )
    },
    //用户头像修改
    modifyOwnAvatar(data) {
        return request.put(
            "/demo/api/user/avatar",
            data,
            { "Content-Type": "multipart/form-data" }
        )
    },
    //获取一个用户的文章列表
    getArticlesByUserId(userId, currentPage) {
        return request.get(
            '/demo/api/' + userId + '/articles/' + currentPage,
            {}
        );
    }
}

export default user

