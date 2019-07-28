<template>
  <div class="information-card">
    <div class="user-avatar">
      <img :src="user.avatar" alt="头像" />
    </div>
    <div class="information-card">
      <div style="text-align:center;font-size: 16px;font-weight: bolder;">raining_heavily</div>天涯路远，人困马乏
      <br />前端工程师/java工程师/阅读
      <br />目前居住在上海杨浦
      <br />你可以在这里找到我，未完待续...
    </div>
    <div class="other-information">
      <div v-show="user.github!==null" class="link" @click="toLink(user.github)">
        <img :src="github" alt="tupian" />
      </div>
      <div v-show="user.github!==null" class="link" @click="toLink(user.weibo)">
        <img :src="weibo" alt="tupian" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      github:require("@/assets/images/Github.png"),
      weibo:require("@/assets/images/sina_weibo.png")
    };
  },
  methods:{
    toLink(url) {
      window.open(url);
    }
  }
};
</script>
<style scoped>
.information-card {
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  text-align: center;
  padding-top: 15px;
}
.user-avatar img{
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    -o-object-fit: cover;
    object-fit: cover;
}
.information-card .other-information{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.other-information .link{
  margin-right: 10px;
}
.link img{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
/* 大屏幕，宽度大于960px; */
@media screen and (min-width: 800px) {
  .link img:hover{
  transform: scale(1.1); /* 元素放大1.4倍 */
  transition: all 1s; /* 元素在0.5s内完成动画 */
  cursor: pointer;
}
}
</style>