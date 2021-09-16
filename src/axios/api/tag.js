import request from '@/axios/request.js';//导入axios实例文件中方法

const tag = {
    //新增tag
    createNewTag(data) {
        return request.post(
            "/tag",
            data
        )
    },
    //查询所有tag
    queryAllTags() {
        return request.get(
            "/tags",
            {}
        )
    },
    //根据输入内容模糊查询标签
    queryTagsByText(searchText) {
        return request.get(
            "/tags/search", {
            params: {
                searchText: searchText
            }
        }
        )
    },
}

export default tag

