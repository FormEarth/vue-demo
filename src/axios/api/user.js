import request from '@/axios/request.js';//导入axios实例文件中方法

const user = {
    //用户登陆
    userLogin(data) {
        return request.post(
          "/demo/api/user/login",
          data
        )
    },

    //获取一个用户的文章列表
    getArticesByUserId(userId, currentPage) {
        return request.get(
            '/demo/api/' + userId + '/artices/' + currentPage,
            {}
        );
    }
}

export default user

