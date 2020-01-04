<template>
  <div class="content">
    <!-- 顶部导航栏 -->
    <demo-nav v-show="$route.meta.nav!='none'"></demo-nav>
    <!-- <div class="main-contents"> -->
    <!-- 左侧部分 -->
    <!-- <div class="left-panel" :style="{backgroundImage: 'url(' + backgroundImage + ')'}"> -->
    <!-- <div class="left-panel">
        <slot name="demo-card"></slot>
    </div>-->
    <!-- 右侧部分 -->
    <div :class="['right-panel',showMobileAppbar?'clear-top':'']">
      <div class="left-panel">
        <slot name="demo-card"></slot>
      </div>
      <slot name="detail-content"></slot>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "DemoContent",
  props: {
    // user: {
    //   type: Object,
    //   default: {}
    // }
  },
  data() {
    return {
      backgroundImage:
        "http://192.168.149.110:9090/static/upload/images/20191012152641.jpg"
    };
  },
  computed: {
    showMobileAppbar: function() {
      var routeName = this.$route.name;
      if (
        routeName == "homePage" ||
        routeName == "atlasList" ||
        routeName == "mine" ||
        routeName == "star" ||
        routeName == "info"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
/*滚动条整体样式*/
.right-panel::-webkit-scrollbar {
  width: 5px;
  /* width: 0; */
  height: 8px; /*这个高度是用来定义底部攻读条高度的 */
}
/*滚动条滑块*/
.right-panel::-webkit-scrollbar-thumb {
  /* border-radius: 10px; */
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background: rgb(110, 189, 253);
}
/*滚动条轨道*/
.right-panel::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background: transparent;
}
/* 桌面，宽度>=993px */
@media screen and (min-width: 993px) {
  .content .left-panel {
    width: 350px;
    position: fixed;
    top: 75px;
    left: 10%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .right-panel {
    padding-left: calc(10% + 370px);
    padding-right: 10%;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
}
/* 平板，宽度[769px,992px]; */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .content .left-panel {
    display: none;
    width: 330px;
    position: fixed;
    top: 75px;
    left: 5%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .right-panel {
    /* padding-left: calc(5% + 350px); */
    padding-left: 5%;
    padding-right: 5%;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    /* padding-top: 80px; */
  }
}
/* 手机，宽度<=768px */
@media screen and (max-width: 768px) {
  /* .content {
    margin-top: 15px;
  } */
  .content .right-panel {
    margin-bottom: 5px;
    /* top: 100px; */
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .left-panel {
    display: none;
  }
  .content .clear-top {
    top: 0;
  }
}
</style>