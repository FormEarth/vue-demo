<template>
  <div class="container-404">
    <div class="error-box">
      <img :src="picture" alt width="100%" />
      <div class="tips-font">
        页面走丢啦~~,可以尝试回到首页或刷新
        <br />
        <img :src="homepage" alt="首页" class="hover" @click="$router.replace('/');"/>
        <img :src="refresh" alt="刷新" class="hover" @click="$router.go(0);"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      picture: require("@/assets/images/404-page.png"),
      homepage: require("@/assets/images/home_page_100px.png"),
      refresh: require("@/assets/images/reset_100px.png"),
      header: {
        backgroundImage: "url(" + require("@/assets/images/404-page.png") + ")",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
        //height: "100%"
      }
    };
  }
};
</script>

<style scoped>
.container-404 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  overflow-y: auto;
}
.error-box{
  max-width: 768px;
  margin: 0 auto;
  text-align: center;
  padding-top: 80px;
}

.hover{
  cursor: pointer;
  width:60px;
  height:60px
}
</style>

