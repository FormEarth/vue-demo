import request from '@/axios/request.js';//导入axios实例文件中方法

const atlas = {
    //新增图集
    //这里涉及到图片上传，当data类型为FormData对象时，axios会自动删除已指定的Content-Type，这样浏览器会自己设定为multipart/form-data
    createNewAtlas(data, _this) {
        return request.post(
            "/demo/api/atlas",
            data,
            {
                onUploadProgress: progressEvent => {
                    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    console.log(complete)  //complete是一个变化的值，最大100上传完成
                    _this.uploaProgress = complete  //赋值，进度条变化，通过值或者其他事件还可以用showp使得进度条是否隐藏
                }
            }
        )
    },
    // 查询所有的图集,分页
    queryAllAtlas(currentPage, withUser, userId) {
        if (withUser) {
            return request.get(
                "/demo/api/atlases/" + currentPage,
                {
                    params: {
                        userId: userId
                    }
                }
            )
        } else {
            return request.get(
                "/demo/api/atlases/" + currentPage,
                {}
            )
        }

    },
    // 下拉加载最新数据
    queryLastedAtlas(refreshTime) {
        return request.get(
            "/demo/api/atlases/refresh/" + refreshTime,
            {}
        )
    },
    // 根据Id查询指定的图集
    queryAtlasById(atlasId) {
        return request.get(
            "/demo/api/atlas/" + atlasId,
            {}
        )
    },
    // 根据Id删除指定图集
    deleteAtlasById(atlasId) {
        return request.delete(
            "/demo/api/atlas/" + atlasId,
            {}
        )
    },
    //修改图集
    modifyAtlas(data) {
        return request.put(
            "/demo/api/atlas",
            data
        )
    },
    getVideoList() {
        return request.get(
            "/demo/api/videos",
            {}
        )
    }
}

export default atlas