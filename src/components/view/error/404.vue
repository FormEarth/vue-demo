<template>
  <mu-container>
    <mu-paper :z-depth="1" :style="header">
	  <div class="bottom">
<mu-button flat>
        <mu-icon left value="refresh" to=""></mu-icon>刷新试一试
      </mu-button>
      <mu-button flat style="float:right;" @click="$router.back(-1)">
        <mu-icon left value="arrow_back"></mu-icon>返回上一页
      </mu-button>
	  </div>
    </mu-paper>
    <!-- <img :src="picture" alt="404错误提示图"> -->
  </mu-container>
</template>
<script>
export default {
  data() {
    return {
      picture: require("@/assets/images/404.jpg"),
      header: {
        backgroundImage: "url(" + require("@/assets/images/404.jpg") + ")",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
        //height: "100%"
      }
    };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
  max-height: 700px;
}
.mu-paper {
  /* max-width: 500px; */
  width: 100%;
  height: 100%;
  position: relative;
}
.bottom {
  width: 100%;
  z-index: 99;
  position: absolute;
  bottom: 0;
}
</style>

