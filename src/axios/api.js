/** 
 * api接口的统一出口
 */

// 用户模块接口
import user from '@/axios/api/user';
// 文章模块接口
import article from '@/axios/api/article';
// 标签模块接口
import tag from '@/axios/api/tag';
// 图集模块接口
import atlas from '@/axios/api/atlas';
// 其他模块的接口……
 
// 导出接口
export default {
    user,
    article,
    tag,
    atlas
    // ……
}