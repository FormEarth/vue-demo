import request from '@/axios/request.js';//导入axios实例文件中方法

const altas = {
    //新增图集
    //这里涉及到图片上传，当data类型为FormData对象时，axios会自动删除已指定的Content-Type，这样浏览器会自己设定为multipart/form-data
    createNewAltas(data) {
        return request.post(
            "/demo/api/altas",
            data,
            { "Content-Type": "multipart/form-data" }
        )
    },
    // 查询所有的Altas
    queryAllAtlas() {
        return request.get(
            "/demo/api/atlas/1",
            {}
        )
    },
}

export default altas