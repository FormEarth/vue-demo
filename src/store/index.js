import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //当前用户数据
        current_user: {},
        //当前用户主题，默认为白色
        current_theme: "light",
        //当前用户主题颜色，默认为primary
        current_theme_color: "primary",
    },
    //通过提交 mutation 的方式更改state中的值，而非直接改变
    mutations: {
        //保存当前用户数据
        save_user(state, user) {
            state.current_user = user;
        },
        //移除当前用户数据
        remove_user(state) {
            state.current_user = {};
        },
        //新增关注
        add_watch_user(state, userId) {
            state.current_user.user_watch_list.push(userId);
        },
        //移除关注者
        remove_watch_user(state, userId) {
            const index = state.current_user.user_watch_list.indexOf(userId);
            if (index != -1) {
                state.current_user.user_watch_list.splice(index, 1)
            } else {
                console.error("the user_id is not found:" + userId)
            }
        },
        //新增喜欢
        add_like_list(state, collectionId) {
            state.current_user.user_like_list.push(collectionId);
        },
        //移除喜欢
        remove_like_list(state, collectionId) {
            const index = state.current_user.user_like_list.indexOf(collectionId);
            if (index != -1) {
                state.current_user.user_like_list.splice(index, 1)
            } else {
                console.error("the collection_id is not found:" + collectionId)
            }
        },
        //新增收藏
        add_keep_list(state, collectionId) {
            state.current_user.user_keep_list.push(collectionId);
        },
        //移除收藏
        remove_keep_list(state, collectionId) {
            const index = state.current_user.user_keep_list.indexOf(collectionId);
            if (index != -1) {
                state.current_user.user_keep_list.splice(index, 1)
            } else {
                console.error("the collection_id is not found:" + collectionId)
            }
        },
        //切换主题
        theme_toggle(state, theme) {
            state.current_theme = theme;
        },
        //切换主题色
        theme_color_toggle(state, theme_color) {
            state.current_theme_color = theme_color;
        }
    },
    //Action可以进行一些异步的操作，然后再去触发mutation，所以与后端的一些接口都必须放在action里面
    actions: {
        save_user_data(content, user) {
            content.commit("save_user", user);
        },
        remove_user_data(content) {
            content.commit("remove_user");
        },
        theme_toggle_action(content) {
            content.commit("theme_toggle");
        },
        theme_color_toggle_action(content) {
            content.commit("theme_toggle_color");
        }
    },
    //可以认为是 store 的计算属性
    getters: {
        //判断是否已登录
        isLogin(state) {
            //判空
            return typeof (state.current_user.userId) == "undefined" ? false : true;
        }
    }
})

export default store;