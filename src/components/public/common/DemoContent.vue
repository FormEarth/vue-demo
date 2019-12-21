<template>
  <div class="content">
    <!-- 顶部导航栏 -->
    <demo-nav v-show="this.$route.meta.nav!='none'"></demo-nav>
    <!-- <div class="main-contents"> -->
      <!-- 左侧部分 -->
      <!-- <div class="left-panel" :style="{backgroundImage: 'url(' + backgroundImage + ')'}"> -->
      <!-- <div class="left-panel">
        <slot name="demo-card"></slot>
      </div>-->
      <!-- 右侧部分 -->
      <div class="right-panel">
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
  }
};
</script>

<style scoped>
  /*滚动条整体样式*/
  .right-panel::-webkit-scrollbar {
    width: 5px;
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
    /* width: 25%; */
    width: 350px;
    /* min-width: 200px; */
    /* height: 100%; */
    position: fixed;
    top: 75px;
    /* bottom: 0; */
    left: 10%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .right-panel {
    margin-left: calc(10% + 370px);
    /* padding-left: 350px;
    margin:  0 10%; */
    /* width: 100%; */
    padding-right: 10%;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  /* .link img:hover {
    transform: scale(1.1); 元素放大1.4倍
    transition: all 1s; 元素在0.5s内完成动画
    cursor: pointer;
  } */
}
/* 平板，宽度[769px,992px]; */
@media screen and (min-width: 769px) and (max-width: 992px) {

  .content .left-panel {
    width: 28%;
    /* min-width: 200px; */
    position: fixed;
    top: 75px;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .right-panel {
    width: 72%;
    position: fixed;
    top: 80px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
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
  }
  .left-panel {
    display: none;
  }
}
</style>