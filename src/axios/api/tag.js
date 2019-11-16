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
    //根据输入内容模糊查询标签
    queryTagsByText(searchText) {
        return request.get(
            "/demo/api/tags/search", {
            params: {
                searchText: searchText
            }
        }
        )
    },
}

export default tag

