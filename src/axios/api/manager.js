import request from '@/axios/request.js';//导入axios实例文件中方法
const manager = {
    //接口列表查询
    interface_list_query() {
        return request.get("/interface/list")
    },
    //接口修改
    interface_modify(data) {
        return request.put("/interface",data)
    },
}

export default manager