<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <demo-nav v-show="this.$route.meta.nav!='none'"></demo-nav>
    <!-- 内容区域 -->
    <router-view :key="$route.fullPath"></router-view>
    <mu-bottom-nav v-show="showBottomNav" :value.sync="this.$route.name" color="primary">
      <mu-bottom-nav-item value="home" title="首页" icon="home" replace to="/"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="star" title="关注" icon="add" replace to="/star"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mine" title="我的" icon="person" replace to="/mine"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
import DemoNav from "@/components/public/common/DemoNav";

export default {
  name: "App",
  created() {
  },
  computed:{
    //是否显示底部导航栏
    showBottomNav(){
      const name = this.$route.name
      console.log("name:"+name,"nav:"+this.$route.meta.nav)
      if(name=="home"||name=="star"||name=="mine"){
        return true
      }else{
        return false
      }
    }
  },
  components:{
    "demo-nav": DemoNav,
  }
};
</script>

<style>
#app {
  font-family: "Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
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
}
.mu-bottom-nav {
  width: 100%;
  /* max-width: 500px; */
  /* min-width:300px; */
  position:fixed; 
  bottom:0px;
}
</style>
