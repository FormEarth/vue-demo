<template>
  <mu-container class="demo-container" fluid :style="background">
    <!-- <div class="box">123</div> -->
    <!-- 导航栏 -->
    <div class="header">
      <div class="nav-title">
        <div class="title">遗失梦境</div>
      </div>
      <div class="nav-content">
        <div class="nav-item">文章</div>
        <div class="nav-item">图集</div>
        <div class="nav-item">标签</div>
        <div class="nav-item">关于</div>
        <div class="nav-item" @click="login">登陆</div>
      </div>
    </div>
    <!-- 导文章列表 -->
    <div class="content">
      <div class="artice-list">
        <artice-item v-for="artice in artices" :key="artice"></artice-item>
        <mu-flex justify-content="center">
          <mu-pagination raised circle :total="100" :page-count="5" :current.sync="current"></mu-pagination>
        </mu-flex>
      </div>
      <!-- fill-div是用来填充的 -->
      <div class="fill-div"></div>
      <div class="introduction">
        <user-card :user="user"></user-card>
      </div>
    </div>
    <div class="footer">
      <span>© 2019 raining_heavily</span>
    </div>
  </mu-container>
</template>
<script>
import ArticeItem from "@/components/public/artice/ArticeItem.vue";
import UserCard from "@/components/public/user/UserCard.vue";
// import ArticesCard from "@/components/public/artice/ArticesCard.vue";
export default {
  name: "home_new",
  data() {
    return {
      artices: [1, 2, 3, 4, 5],
      background: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      current: 1,
      user:{
        name:"raining_heavily",
        avatar: require("@/assets/images/test5.jpg"),
        github: "https://github.com/FormEarth",
        weibo: "https://weibo.com/5612098628"
      }
    };
  },
  components: {
    "artice-item": ArticeItem,
    "user-card": UserCard,
    // "artices-card": ArticesCard
  },
  methods:{
    login(){
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.demo-container {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
.header {
  display: flex;
  justify-content:center;
  color: aliceblue;
  height: 60px;
  /* background: rgba(114, 113, 113, 0.7); */
  /* background-color: rgb(83, 81, 81); */
}
.title {
  padding-top: 10px;
  /* font-weight: bolder; */
  font-size: 2em;
}
.nav-title {
  width: 50%;
}
.nav-content {
  display: flex;
  justify-content: center;
  width: 50%;
}
.nav-content .nav-item {
  /* display: inline-block; */
  width: 60px;
  text-align: center;
  padding-top: 35px;
}
.footer{
  margin-top: 15px;
  text-align: center;
  /* color:white; */
}
/* 大屏幕，宽度大于960px; */
@media screen and (min-width: 800px) {
  .box {
    background-color: lightgreen;
  }
  .demo-container {
  height: 130%;
  }
  .content{
    margin:15px 10% 0 10%;
    display:flex;
  }
  .content .artice-list{
    width: 67%;
  }
  .content .fill-div{
    width: 6%;
  }
  .content .introduction{
    width:27%;
  }
  .nav-item:hover {
  color: rgb(255, 0, 0);
  border-bottom: 3px rgb(255, 0, 0) solid;
  cursor: pointer;
  }
  .link img:hover{
  transform: scale(1.1); /* 元素放大1.4倍 */
  transition: all 1s; /* 元素在0.5s内完成动画 */
  cursor: pointer;
}
}
/* 中等屏幕，宽度640px~960px; */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .box {
    background-color: blue;
  }
  .demo-container {
  height: 130%;
  }
  .content{
    margin:15px 3% 0 3%;
    display:flex;
  }
    .content .artice-list{
    width: 68%;
  }
  .content .fill-div{
    width: 4%;
  }
  .content .introduction{
    width:28%;
  }
  .nav-item:hover {
  color: rgb(185, 10, 10);
  border-bottom: 3px rgb(185, 10, 10) solid;
  cursor: pointer;
}
}
/* 小屏幕，宽度在300px~640px */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .box {
    background-color: red;
  }
  .demo-container {
  height: 200%;
  }
  .content{
    margin:15px 2% 0 2%;
  }
  .content .artice-list{
    margin-bottom: 5px;
  }
}
/* .span {
  border: 1px red solid;
} */
</style>

