<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from "@/util/util";

export default {
  name: "App",
  created() {
    //若vuex中用户状态是未登录，从sessionStorage中获取数据
    if (!this.$store.getters.isLogin) {
      var current_user = JSON.parse(sessionStorage.getItem("current_user"));
      console.log("current_user" + current_user);
      //如果sessionStorage没有用户信息证明没有登录或会话过期了
      if (current_user == null) {
        console.log("sessionStorage没有值");
        this.$store.commit("remove_user");
      } else {
        //vuex中的数据在页面刷新的时候会重置，在登陆时将用户信息保存在sessionStorge,
        //若刷新页面从sessionStorge中重新获取当前用户信息给vuex赋值
        console.log("current_user" + current_user);
        this.$store.commit("save_user", current_user);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
