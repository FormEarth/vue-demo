import request from '@/axios/request.js';//导入axios实例文件中方法
const user = {

    //用户登陆
    userLogin(data) {
        return request.post(
            "/user/login",
            data
        )
    },
    //记住密码后自动登录
    userAutoLogin(data) {
        return request.post(
            "/user/auto/login",
            data
        )
    },
    //用户登出
    userLogout(data) {
        return request.post(
            "/user/logout",
            data
        )
    },
    //用户信息修改
    updateUserInfo(data) {
        return request.put(
            "/user",
            data
        )
    },
    //用户头像修改
    modifyOwnAvatar(data) {
        return request.put(
            "/user/avatar",
            data,
            // { "Content-Type": "multipart/form-data" }
        )
    },
    //获取用户的一般性信息
    getCommonInfoByUserId(user_id) {
        return request.get('/user/common/',{
            params: {
                userId: user_id,
                page: page
            }
        });
    },
    //用户添加关注
    userAddCollection(data) {
        return request.post('/user/collection',data)
    },
    //用户移除关注
    userRemoveCollection(data) {
        return request.delete('/user/collection',{data: data})
    },
    //修改密码
    modifyOwnPassword(data) {
        return request.put(
            '/user/password',
            data
        )
    },
    get_timeline(user_id,page){
        return request.get('/timeline',{
            params: {
                userId: user_id,
                page: page
            }
        });
    }
}

export default user

