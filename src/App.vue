<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <demo-nav v-show="this.$route.meta.nav!='none'"></demo-nav>
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
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </demo-content>

    <mu-bottom-nav
      v-show="showBottomNav"
      :value.sync="this.$route.name"
      color="primary"
      id="bottomNav"
    >
      <mu-bottom-nav-item value="homePage" title="首页" icon="home" replace to="/"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="atlasList" title="图集" icon="burst_mode" replace to="/atlas"></mu-bottom-nav-item>
      <div class="mu-bottom-item"><native-add-button></native-add-button></div>
      <mu-bottom-nav-item value="star" title="收藏" icon="star" replace to="/star"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mine" title="我的" icon="person" replace to="/mine"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
import NativeAddButton from "@/components/public/NativeAddButton"
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
      if (name == "homePage" || name == "atlasList" || name == "mine"|| name == "star") {
        return true;
      } else {
        return false;
      }
    }
  },
  components:{
    NativeAddButton
  }
};
</script>

<style>
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
}
.mu-bottom-nav {
  width: 100%;
  /* max-width: 500px; */
  /* min-width:300px; */
  position: fixed;
  bottom: 0px;
}
@media screen and (min-width: 600px) {
  #bottomNav {
    display: none;
  }
}
</style>
