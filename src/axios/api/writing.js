import request from '@/axios/request.js';//导入axios实例文件中方法
const writing = {
    // 根据Id查询指定的图集
    queryWritingById(writingId, type) {
        return request.get(
            "/writing",
            {
                params: {
                    writingId: writingId,
                    type: type
                }
            }
        )
    },
    //删除作品
    remove_writing(writing_id){
        return request.delete("/writing/" + writing_id)
    }

}
export default writing