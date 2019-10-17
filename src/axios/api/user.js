import request from '@/axios/request.js';//导入axios实例文件中方法

const user = {
    //用户登陆
    userLogin(data) {
        console.log('发送数据：' + data)
        return request.post(
          "/demo/api/user/login",
          data
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

