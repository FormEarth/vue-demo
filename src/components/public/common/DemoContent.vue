<template>
  <div class="content">
    <!-- 左侧部分 -->
    <!-- <div class="left-panel" :style="{backgroundImage: 'url(' + backgroundImage + ')'}"> -->
    <div class="left-panel">
      <slot name="demo-card"></slot>
    </div>
    <!-- 右侧部分 -->
    <div class="right-panel">
      <slot name="detail-content"></slot>
    </div>
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
/* 大屏幕，宽度大于800px; */
@media screen and (min-width: 800px) {
  .content {
    display: flex;
  }
  .content .left-panel {
    width: 25%;
    /* min-width: 200px; */
    /* height: 100%; */
    position: fixed;
    top: 75px;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .right-panel {
    width: 75%;
    position: fixed;
    top: 75px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    padding: 0 12%;
  }
  /*滚动条整体样式*/
  .right-panel::-webkit-scrollbar {
    width: 5px;
    height: 8px;/*这个高度是用来定义底部攻读条高度的 */
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
  /* .link img:hover {
    transform: scale(1.1); 元素放大1.4倍
    transition: all 1s; 元素在0.5s内完成动画
    cursor: pointer;
  } */
}
/* 中等屏幕，宽度640px~960px; */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .content {
    margin-top: 15px;
  }
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
    top: 75px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
  }
}
/* 小屏幕，宽度在300px~640px */
@media screen and (max-width: 600px) {
  /* .content {
    margin-top: 15px;
  } */
  .content .right-panel {
    margin-bottom: 5px;
  }
  .left-panel {
    display: none;
  }
}
</style>