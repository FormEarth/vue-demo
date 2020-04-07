<template>
  <mu-container>
    <div style="height:100%;">
      <div class="error-font">4&nbsp;0&nbsp;4</div>
      <div class="tips-font">
        您要访问的内容不存在,可以尝试以下操作
        <br />
        <br />
        <mu-button flat @click="$router.back(-1)" >
          <mu-icon value="arrow_back" color="green"></mu-icon>返回上一级
        </mu-button>
        <br />
        <mu-button flat @click="$router.back(0)">
          <mu-icon value="refresh" color="green"></mu-icon>刷新当前页
        </mu-button>
      </div>
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
.icon-flex-wrap .mu-button {
  margin: 6px 8px;
}
.container {
  width: 100%;
  height: 100%;
  /* padding: 10px 10%; */
  /* max-width: 500px; */
  min-width: 350px;
  max-height: 700px;
}
.error-font {
  font-family: "Dressedless Three", sans-serif;
  font-size: 40px;
  text-align: center;
  padding-top: 20px;
  color: rgb(255, 8, 8);
}
.tips-font {
  text-align: center;
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

