<template>
  <transition :name="type" mode="out-in">
      <slot>该元素具有过渡动画</slot>
  </transition>
</template>

<script>
export default {
  name: "DemoTransition",//该组件定义了一些过渡动画
  props:{
    type:{
      type:String,
      default:"default"
    }
  }
};
</script>

<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.default-enter-active {
  transition: all 0.2s ease-in;
}
.default-enter {
  /* .slide-fade-leave-active for below version 2.1.8 */
  transform: translateX(-20px);
  /* transform: rotate(50deg); */
  opacity: 0;
}
.default-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.default-leave-to {
  transform: scale(0.1);
  /* transform: translateY(20px); */
}

.lr-enter-active {
  transition: all 0.2s ease-in;
}
.lr-enter {
  /* .slide-fade-leave-active for below version 2.1.8 */
  transform: translateX(-20px);
  /* transform: rotate(50deg); */
  opacity: 0;
}
.lr-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.lr-leave-to {
  transform: translateX(20px);
  /* transform: translateY(20px); */
}
</style>