<template>
  <!-- 顶部导航栏组件 -->
  <div class="root-node">
    <div class="header">
      <div class="nav-title">
        <span class="title" @click="$router.push('/')">DEMOOO</span>
        <div class="nav-menu">
          <mu-icon value="menu" size="30" style="vertical-align: middle;" @click="showDrawer"></mu-icon>
        </div>
      </div>
      <div class="nav-content" id="nav-content">
        <div
          class="nav-item"
          :class="$route.meta.nav=='article'?'active-item':''"
          @click="$router.push('/')"
        >首页</div>
        <div
          class="nav-item"
          :class="$route.meta.nav=='album'?'active-item':''"
          @click="$router.push('/album')"
        >相册</div>
        <div
          class="nav-item"
          v-if="isLogin"
          :class="$route.meta.nav=='mine'?'active-item':''"
          @click="$router.push('/mine')"
        >{{user.userName}}</div>
        <div
          v-else
          class="nav-item"
          :class="$route.meta.nav=='mine'?'active-item':''"
          @click="$router.push('/login')"
        >登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoNav",
  data() {
    return {
      
      style: true,
      logo_png: require("@/assets/images/logo.png"),
    };
  },
  methods: {
    showDrawer() {
      this.$emit('toggle');
    }
  },
  computed: {
    //已登录用户信息
    user: function() {
      return this.$store.state.current_user;
    },
    //是否已登录
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    showMobileAppbar: function() {
      var routeName = this.$route.name;
      if (
        routeName == "homePage" ||
        routeName == "atlasList" ||
        routeName == "mine" ||
        routeName == "star" ||
        routeName == "info"
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.root-node {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: #0066CC;
}
.header {
  display: flex;
  justify-content: center;
  /* color: aliceblue; */
  height: 60px;
  min-width: 300px;
  /* background-color: #fff; */
  color: #fff;
  line-height: 60px;
}
.nav-title {
  font-family: "Dressedless Three", sans-serif;
  font-weight: 500;
  font-size: 3.5rem;
  font-size: 28px;
}
.nav-title .title{
  cursor: pointer;
}
.title img {
  padding-top: 10px;
  width: 150px;
}
.nav-content {
  display: flex;
  justify-content: space-around;
  /* background-color: #fff; */
}
.nav-content .nav-item {
  /* width: 60px; */
  text-align: center;
  transition: all 1s;
}
/* .active-item {
  border-bottom: 3px rgb(255, 0, 0) solid;
} */
.nav-title {
  width: 50%;
}
.nav-content {
  width: 50%;
}
.nav-menu {
  cursor: pointer;
}
/* 大屏幕，宽度大于800px; */
@media screen and (min-width: 993px) {
  .nav-title {
    width: 70%;
    padding-left: 40px;
  }
  .nav-content {
    display: flex;
    /* position: static; */
    width: 30%;
  }
  .nav-item:hover {
    /* color: rgb(255, 0, 0); */
    /* border-bottom: 3px #ffffff solid; */
    cursor: pointer;
    /* transition: all 0.5s; */
  }
  .nav-menu {
    display: none;
  }
}
/* 中等屏幕，宽度600px~800px; */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .nav-title {
    padding-left: 30px;
  }
  .nav-content {
    display: flex;
    /* position: static; */
  }
  .nav-menu {
    display: none;
  }
}
/* 小屏幕，宽度在300px~600px */
@media screen and (max-width: 769px) {
  .header {
    display: block;
    justify-content: space-between;
    /* padding: 0 20px; */
  }
  .nav-content {
    display: none;
    width: auto;
    /* position: absolute;
    top: 10px;
    width: 100%; */
  }
  .nav-title {
    width: 100%;
    padding: 0 15px;
  }
  .nav-menu {
    float: right;
    font-weight: bold;
    /* background-color: #fff; */
  }
  .show-item {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    line-height: 30px;
    /* font-weight: bold; */
  }
}
</style>