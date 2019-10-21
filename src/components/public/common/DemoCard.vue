<template>
  <div class="information-card" :style="{backgroundImage: 'url(' + cardImage + ')'}">
    <div class="user-avatar">
      <img :src="user.avatar" alt="头像" />
    </div>
    <div class="user-information">
      <div class="information-username">{{user.userName}}</div>
      {{user.sign}}
      <br />
      {{user.personalProfile}}
      <!-- <br />你可以在这里找到我，未完待续... -->
    </div>
    <!-- <div class="other-information">
      <div v-show="user.github!==null" class="link" @click="toLink(user.github)">
        <img :src="github" alt="tupian" />
      </div>
      <div v-show="user.github!==null" class="link" @click="toLink(user.weibo)">
        <img :src="weibo" alt="tupian" />
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "DemoCard",
  props: {
    user: {
      type: Object,
      //props default 数组／对象的默认值应当由一个工厂函数返回
      default: () => {
        return {
          avatar: require("@/assets/images/Github.png"),
          frontCover:require("@/assets/images/background.jpg"),
          userName: "不要成为你欲望的奴隶"
        };
      }
    }
  },
  data() {
    return {
      // github: require("@/assets/images/Github.png"),
      // weibo: require("@/assets/images/sina_weibo.png")
      frontCover:require("@/assets/images/background.jpg"),
    };
  },
  computed:{
    cardImage:function(){
      if(typeof (this.user.frontCover) == "undefined"||this.user.frontCover == null||this.user.frontCover == ''){
        return this.frontCover
      }else{
        return this.user.frontCover
      }
    }
  },
  methods: {
    toLink(url) {
      window.open(url);
    }
  }
};
</script>
<style scoped>
.information-card {
  /* background-color: rgb(255, 255, 255); */
  /* border-radius: 5px; */
  text-align: center;
  background-size: cover;
  background-color: rgb(71, 235, 247);
}
.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: white 2px solid;
  /* display: block;
  margin: 0 auto;*/
  -o-object-fit: cover;
  object-fit: cover;
}
.information-card .user-information {
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.7);
}
.user-information .information-username {
  text-align: center;
  /* color: #2196f3; */
  font-size: 20px;
  /* font-weight: bolder; */
}
.information-card .other-information {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.other-information .link {
  margin-right: 10px;
}
.link img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
/* 大屏幕，宽度大于960px; */
@media screen and (min-width: 600px) {
  .information-card {
    position: fixed;
    bottom: 0;
    top: 75px;
    width: 25%;
  }
  .user-avatar {
    padding-top: 150px;
  }
  .link img:hover {
    transform: scale(1.1); /* 元素放大1.4倍 */
    transition: all 1s; /* 元素在0.5s内完成动画 */
    cursor: pointer;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .information-card {
    position: fixed;
    bottom: 0;
    top: 75px;
    width: 25%;
  }
  .user-avatar {
    padding-top: 150px;
  }
}
@media screen and (max-width: 600px) {
  .information-card {
    margin-top: 10px;
  }
  .user-avatar {
    padding-top: 15px;
  }
}
</style>