<template>
  <div class="information-card" :style="{backgroundImage: 'url(' + cardImage + ')'}">
    <div class="user-avatar">
      <img :src="current_user.avatar" />
    </div>
    <div v-if="isLogin" class="user-information">
      <div class="information-username">{{current_user.userName}}</div>
      {{current_user.sign}}
      <br />
      {{current_user.personalProfile}}
    </div>
    <div v-else class="user-information">
      <div class="information-username">不要成为欲望的奴隶，不要扼杀自己的创造力</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DemoCard",
  props: {
  },
  data() {
    return {
      frontCover:require("@/assets/images/background.jpg"),
    };
  },
  created(){
  },
  computed:{
    cardImage:function(){
      if(typeof (this.current_user.frontCover) == "undefined"||this.current_user.frontCover == null||this.current_user.frontCover == ''){
        return this.frontCover
      }else{
        return this.current_user.frontCover
      }
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    current_user: function() {
      return this.$store.state.current_user;
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
  background-color: rgb(146, 168, 170);
  opacity: 0.9;/*  值越小越透明*/
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
    width: 28%;
  }
  .user-avatar {
    padding-top: 150px;
  }
}
@media screen and (min-width: 300px) and (max-width: 600px) {
  /* .information-card {
    margin-top: 10px;
  } */
  .user-avatar {
    padding-top: 15px;
  }
}
</style>