<template>
  <div class="recommend-card">
    <img class="avatar" :src="user.avatar" />
    <br />
    <label>{{user.userName}}</label>
    <h5 class="user-sign">{{user.sign}}</h5>
    <van-button v-if="isWatch" type="info" size="mini" round style="width:45%;">已关注</van-button>
    <van-button v-else type="info" size="mini" round plain style="width:45%;">关注</van-button>
  </div>
</template>

<script>
export default {
  name: "RecommendCard",
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    isWatch() {
      return false;
    }
  }
};
</script>

<style scoped>
.recommend-card {
  margin: 0 5px;
  display: inline-block;
  background-color: #fff;
  border-radius: 5px;
  width: 145px;
  text-align: center;
  padding: 7px 0;
  vertical-align: middle;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-sign {
  margin: 10px 0;
}
</style>