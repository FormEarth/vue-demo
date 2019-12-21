<template>
  <mu-container>
    <div style="height:100%;">
      <div style="font-size:30px;text-align:center;">404</div>
      <br />你要访问的内容失踪了,可以尝试以下操作
      <br />
      <a @click="$router.back(-1)">返回上一级</a>
      <br /><a @click="$router.back(0)">刷新一下</a>
    </div>
    <img :src="picture" alt width="100%" />
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
  /* padding: 10px 10%; */
  /* max-width: 500px; */
  min-width: 350px;
  max-height: 700px;
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
@media screen and (min-width: 993px) {
  .container {
    padding: 10px 10%;
  }
}
</style>

