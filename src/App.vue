<template>
  <div id="app">
    <!-- 内容区域 -->
    <router-view v-if="this.$route.meta.nav=='none'" :key="$route.fullPath"></router-view>
    <demo-content v-else>
      <div slot="demo-card">
        <demo-card></demo-card>
      </div>
      <div slot="detail-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" solt="detail-content"></router-view>
        </keep-alive>

        <demo-transition>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </demo-transition>
      </div>
    </demo-content>

    <!-- <mu-bottom-nav
      v-show="showBottomNav"
      :value.sync="this.$route.name"
      color="primary"
      id="bottomNav"
    >
      <mu-bottom-nav-item value="homePage" title="首页" icon="home" replace to="/"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="atlasList" title="图集" icon="burst_mode" replace to="/atlas"></mu-bottom-nav-item>
      <div class="mu-bottom-item">
        <native-add-button></native-add-button>
      </div>
      <mu-bottom-nav-item value="star" title="收藏" icon="star" replace to="/star"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mine" title="我的" icon="person" replace to="/mine"></mu-bottom-nav-item>
    </mu-bottom-nav> -->
  </div>
</template>

<script>
import NativeAddButton from "@/components/public/NativeAddButton";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    // 是否显示底部导航栏
    showBottomNav: function() {
      const name = this.$route.name;
      console.log("name:" + name, "nav:" + this.$route.meta.nav);
      if (
        name == "homePage" ||
        name == "atlasList" ||
        name == "mine" ||
        name == "star"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (!this.$store.getters.isLogin) {
      //sessionStorge中也没有用户，查看是否有记住密码记录
      let authorization = localStorage.getItem("Authorization-Sessionid");
      //有上次记住密码的sessionId时自动登录
      let isLoginAutomatic = false;
      if (authorization) {
        sessionStorage.setItem("Authorization-Sessionid", authorization);
        this.$http.user.userAutoLogin({}).then(response => {
          if (response.data.code == "2000") {
            let user = response.data.data.current_user_data;
            //用户关注、喜欢、收藏列表
            user.user_watch_list = response.data.data.user_watch_list;
            user.user_like_list = response.data.data.user_like_list;
            user.user_keep_list = response.data.data.user_keep_list;
            //sessionStorage只能存储string类型，不能直接存对象，所以存的时候对象要转为字符串
            sessionStorage.setItem("current_user", JSON.stringify(user));
            this.$store.commit("save_user", user);
            isLoginAutomatic = true;
          } else {
            this.$router.push({
              path: "/login",
              redirect: this.$route.fullPath
            });
          }
        });
      }
    }
  },
  components: {
    NativeAddButton
  }
};
</script>

<style>
@import './assets/fonts/font.css';
#app {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 0px;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  min-width: 300px;
  margin: 0;
  padding: 0;
  /* 从坐上到右下的渐变色 */
  /* background-image: linear-gradient(to bottom left, #07a3b2, #d9ecc7); */
  background-image: linear-gradient(38deg, #29bdd9 45%, #d4e3f1 33%);
  background-attachment: fixed;
  background-color: #f4f5f7;
}
.mu-bottom-nav {
  width: 100%;
  /* max-width: 500px; */
  /* min-width:300px; */
  position: fixed;
  bottom: 0px;
}
@media screen and (min-width: 769px) {
  #bottomNav {
    display: none;
  }
}
</style>
