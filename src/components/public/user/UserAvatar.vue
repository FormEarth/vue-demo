<template>
  <div class="header">
    <div style="display:flex;">
      <div
        class="header-left"
        style="cursor: pointer;"
        @click="$router.push('/'+userId+'/homepage')"
      >
        <img v-lazy="avatar" />
      </div>
      <div class="header-center">
        <div class="header-username">
          <span>{{userName}}</span>
          <!-- <span class="follow-button">关注</span> -->
          
            <slot></slot>
          
        </div>
        <div class="some-info">{{extraInfo}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    avatar: {
      type: String
    },
    userId: {
      type: Number
    },
    userName: {
      type: String
    },
    extraInfo: {
      type: String
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 46px;
  padding: 2px 2px;
  /* background-color: rgb(160, 248, 186); */
  margin-bottom: 6px;
}
.header-center {
  /* display: flex;
  flex-direction: column; */
  /* width: 60%; */
  padding-left: 4px;
  font-size: 10px;
}
.header-right {
  /* width: 30%; */
  text-align: right;
}
.header-left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-username {
  font-family: Fangzhenglibian, "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  height: 23px;
  font-size: 16px;
  line-height: 15px;
  padding-top: 5px;
  color: red;
}
.some-info {
  height: 23px;
  line-height: 16px;
  padding-top: 2px;
}
</style>