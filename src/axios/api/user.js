import request from '@/axios/request.js';//导入axios实例文件中方法
const baseAPI = "/demo/api/user";
const user = {

    //用户登陆
    userLogin(data) {
        return request.post(
            baseAPI + "/login",
            data
        )
    },
    //记住密码后自动登录
    userAutoLogin(data) {
        return request.post(
            baseAPI + "/auto/login",
            data
        )
    },
    //用户登出
    userLogout(data) {
        return request.post(
            baseAPI + "/logout",
            data
        )
    },
    //用户信息修改
    updateUserInfo(data) {
        return request.put(
            baseAPI + "/info",
            data
        )
    },
    //用户头像修改
    modifyOwnAvatar(data) {
        return request.put(
            baseAPI + "/avatar",
            data,
            // { "Content-Type": "multipart/form-data" }
        )
    },
    //获取用户的一般性信息
    getCommonInfoByUserId(userId) {
        return request.get(
            baseAPI + '/' + userId + "/common",
            {}
        );
    },
    //用户添加关注、喜欢、收藏
    userAddCollection(data) {
        return request.post(
            baseAPI + '/collection',
            data
        )
    },
    //用户移除关注、喜欢、收藏
    userRemoveCollection(data) {
        return request.delete(
            baseAPI + '/collection',
            {
                params: data
            }
        )
    }
}

export default user

