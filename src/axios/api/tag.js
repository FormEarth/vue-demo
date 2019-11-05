import request from '@/axios/request.js';//导入axios实例文件中方法

const tag = {
    //新增tag
    createNewTag(data) {
        return request.post(
            "/demo/api/tag",
            data
        )
    },
    //查询所有tag
    queryAllTags() {
        return request.get(
            "/demo/api/tags",
            {}
        )
    },
}

export default tag

