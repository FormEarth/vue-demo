<template>
  <mu-container>
    <mu-paper :z-depth="0">
      <div class="user-card" :style="header">
        <div class="user-top" style="height:60px;text-align:left;">
          <mu-button icon slot="left" :ripple="false" @click="$router.back(-1)">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
        </div>
        <div class="user-avatar">
          <img :src="user.avatar" alt="用户头像">
        </div>
        <div class="user-name">
          {{user.name}}
          <van-button plain type="danger" size="mini" style="font-weight: normal;">已关注</van-button>
        </div>
        <div class="user-other">
          <div class="user-mini-card">
            <div>
              <span>{{user.sign}}</span>
            </div>
            <div>
              <span>个人简介:</span>这个人还没有填写简介哦
            </div>
          </div>
        </div>
      </div>
    </mu-paper>
    <mu-paper class="user-data">
      <div class="data-item" :z-depth="0">
        <label>12</label>
        <br>关注
      </div>
      <div class="data-item" :z-depth="0">
        <label>999</label>
        <br>粉丝
      </div>
      <div class="data-item" :z-depth="0">
        <label>233</label>
        <br>动态
      </div>
      <div class="data-item" :z-depth="0">
        <label>12k</label>
        <br>获赞
      </div>
    </mu-paper>
    <mu-divider></mu-divider>
    <van-tabs v-model="active" swipeable title-active-color="#3f51b5">
      <van-tab>
        <div slot="title">
          <mu-icon value="library_books" size="14"></mu-icon>动态
        </div>
        内容 1
      </van-tab>
      <van-tab>
        <div slot="title">
          <mu-icon value="favorite" size="14"></mu-icon>图集
        </div>
        内容 2</van-tab>
      <van-tab >
        <div slot="title">
          <mu-icon value="favorite" size="14"></mu-icon>喜欢
        </div>
        内容 3</van-tab>
    </van-tabs>
  </mu-container>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      open: "send",
      active: 0,
      user: {
        name: "Nidhogg",
        sign: "曾经沧海难为水，除却巫山不是云",
        avatar: require("@/assets/images/carousel2.jpg")
      },
      header: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100px"
      }
    };
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.user-card {
  width: 100%;
  height: 120px;
  text-align: center;
}
.user-card .user-avatar {
  width: 100%;
  padding-top: 0px;
}
.user-card .user-avatar img {
  width: 60px;
  height: 60px;
}
.user-card .user-name {
  height: 18px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 9px;
  /* margin-left: calc(50% - 30px); */
  /* text-align: left; */
}
.user-card .user-other {
  margin-top: 5px;
}
.user-data {
  display: flex;
  justify-content: center;
  margin-top: 90px;
  text-align: center;
  background-color: aliceblue;
}
.user-data .data-item {
  width:25%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>