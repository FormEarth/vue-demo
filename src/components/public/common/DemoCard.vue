<template>
  <!-- <div class="information-card" :style="{backgroundImage: 'url(' + cardImage + ')'}"> -->
  <div class="information-card">
    <div v-if="isLogin">
      <!-- <div v-if="isLogin" class="user-information" style="text-align:left;"> -->
      <!-- <div class="user-avatar">
        <img :src="current_user.avatar" />
      </div>
      <div class="information-username">{{current_user.userName}}</div>
      <div style="white-space: pre-wrap;">
        <span>{{current_user.sign}}</span>
        <br />
        <span>{{current_user.personalProfile}}</span>
      </div>-->
      <user-card :user="$store.state.current_user"></user-card>
    </div>
    <!-- <div v-else> -->
    <user-card :icons="icons" :title="'常用功能'"></user-card>
    <user-card :title="'每日一言'" style="font-style: italic;font-size:16px;">The art of losing isn't hard to master，so many things seem filled with the intent to be lost that their loss is no disaster.
Elizabeth Bishop《One Art》</user-card>
    <user-card poem>虞美人·听雨
蒋捷
少年听雨歌楼上，红烛昏罗帐。壮年听雨客舟中，江阔云低，断雁叫西风。
而今听雨僧庐下，鬓已星星也。悲欢离合总无情，一任阶前，点滴到天明。</user-card>
    <user-card :title="'热门标签'">
      <demo-tag>日记</demo-tag>
      <demo-tag>JavaScript</demo-tag>
      <demo-tag>原创</demo-tag>
    </user-card >
    <user-card :title="'关于'">Copyright © 2019 - 2021 raining_heavily</user-card>
    <!-- </div> -->
  </div>
</template>

<script>
import UserCard from "@/components/public/user/UserCard.vue";
export default {
  name: "DemoCard",
  props: {},
  data() {
    return {
      frontCover: require("@/assets/images/login_background.jpg"),
      icons: [
        { icon: "post_add", text: "发布长文", link: "/article/add" },
        { icon: "burst_mode", text: "发布图集", link: "/atlas/add" },
        { icon: "repeat", text: "BeyondHere", link: "/beyondhere" },
        { icon: "bookmarks", text: "书签", link: "/beyondhere" }
      ]
    };
  },
  computed: {
    cardImage: function() {
      if (
        typeof this.current_user.frontCover == "undefined" ||
        this.current_user.frontCover == null ||
        this.current_user.frontCover == ""
      ) {
        return this.frontCover;
      } else {
        return this.current_user.frontCover;
      }
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    current_user: function() {
      return this.$store.state.current_user;
    }
  },
  components: {
    UserCard
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
  /* position: fixed;
  top: 70px; */
  /* background-color: rgb(255, 255, 255); */
  /* border-radius: 5px; */
  /* text-align: center; */
  background-size: cover;
  /* background-color: rgb(146, 168, 170); */
  /* z-index: 0; */
}
.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: white 2px solid;
  /* display: block;
  margin: 0 auto;*/
  object-fit: cover;
}
.information-card .user-information {
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.7);
}
.user-information .information-username {
  /* text-align: center; */
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
@media screen and (min-width: 993px) {
  .user-avatar {
    padding-top: 150px;
  }
  .link img:hover {
    transform: scale(1.1); /* 元素放大1.4倍 */
    transition: all 1s; /* 元素在0.5s内完成动画 */
    cursor: pointer;
  }
}
@media screen and (max-width: 769px) and (max-width: 992px) {
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
@media screen and (min-width: 300px) and (max-width: 768px) {
  /* .information-card {
    margin-top: 10px;
  } */
  .user-avatar {
    padding-top: 15px;
  }
}
</style>