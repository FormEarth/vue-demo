/** 
 * api接口的统一出口
 */

// 用户模块接口
import user from '@/axios/api/user';
// 文章模块接口
import artice from '@/axios/api/artice';
// 其他模块的接口……
 
// 导出接口
export default {
    user,
    artice,
    // ……
}