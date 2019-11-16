<template>
  <div>
    <transition name="bottom-top">
      <div v-show="show" class="blur-effect">
        <div class="footer">
          <div style="display:flex;justify-content: space-around;">
            <div @click="$router.push('/home/article/add');show=false;">
              <mu-icon value="post_add" color="red700"></mu-icon>
              <p>发布长文</p>
            </div>
            <div @click="$router.push('/home/atlas/add');show=false;">
              <mu-icon value="burst_mode" color="Green"></mu-icon>
              <p>发布图集</p>
            </div>
            <div>
              <mu-icon value="notes" color="Orange"></mu-icon>
              <p>发布动态</p>
            </div>
          </div>
          <mu-icon value="close" size="38" @click="show=!show"></mu-icon>
        </div>
      </div>
    </transition>
    <mu-icon value="add" color="Green" size="40" @click="show=!show"></mu-icon>
  </div>
</template>

<script>
export default {
  name: "NativeAddButton",
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
.blur-effect {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 99;
}
.blur-effect::before {
  /* 设置高斯模糊 */
  filter: blur(20px);
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.bottom-top-enter-active {
  transition: all 0.2s ease-in;
}
.bottom-top-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.bottom-top-enter {
  /* .slide-fade-leave-active for below version 2.1.8 */
  /* transform: translateY(20px); */
  transform: rotate(50deg);
  opacity: 0;
}
.bottom-top-leave-to {
  transform: scale(0.1);
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
}
</style>