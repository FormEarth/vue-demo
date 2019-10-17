<template>
  <!-- 顶部导航栏组件 -->
  <div class="header">
    <div class="nav-title">
      <div class="title">
        <img :src="logo_png" />
      </div>
    </div>
    <div class="nav-content">
      <div class="nav-item" :class="$route.meta.nav=='article'?'active-item':''" @click="$router.push('/')">文章</div>
      <div class="nav-item" :class="$route.meta.nav=='atlas'?'active-item':''">图集</div>
      <div class="nav-item" :class="$route.meta.nav=='album'?'active-item':''" @click="$router.push('/album')">相册</div>
      <div v-if="isLogin" :class="$route.meta.nav=='mine'?'active-item':''" class="nav-item" @click="$router.push('/mine')">{{user.userName}}</div>
      <div v-else class="nav-item" :class="$route.meta.nav=='mine'?'active-item':''" @click="$router.push('/login')">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoNav",
  data() {
    return {
      style:true,
      logo_png: require("@/assets/images/logo.png")
    };
  },
  computed: {
    //已登录用户信息
    user: function() {
      return this.$store.state.current_user;
    },
    //是否已登录
    isLogin: function() {
      return this.$store.getters.isLogin;
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  /* color: aliceblue; */
  height: 60px;
  /* background: rgba(114, 113, 113, 0.7); */
  /* background-color: rgb(83, 81, 81); */
}
.title img {
  padding-top: 10px;
  width: 150px;
}
.nav-content {
  display: flex;
  justify-content: space-around;
}
.nav-content .nav-item {
  /* display: inline-block; */
  /* width: 60px; */
  text-align: center;
  padding-top: 35px;
  transition: all 1s;
}
.active-item{
  border-bottom: 3px rgb(255, 0, 0) solid;
}
/* 大屏幕，宽度大于800px; */
@media screen and (min-width: 800px) {
  .nav-title {
    width: 70%;
  }
  .nav-content {
    width: 25%;
  }
  .nav-item:hover {
    /* color: rgb(255, 0, 0); */
    border-bottom: 3px rgb(255, 0, 0) solid;
    cursor: pointer;
    transition: all 1s;
  }
}
/* 中等屏幕，宽度600px~800px; */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .nav-title {
    width: 50%;
  }
  .nav-content {
    width: 50%;
  }
}
/* 小屏幕，宽度在300px~600px */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .nav-title {
    width: 40%;
  }
  .nav-content {
    width: 60%;
  }
}
</style>