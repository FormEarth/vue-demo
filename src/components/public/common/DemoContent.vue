<template>
  <!-- <div class="demo-content" :style="{backgroundImage:'url('+image+')'}"> -->
  <div class="demo-content">
    <!-- 顶部导航栏 -->
    <demo-nav @toggle="toggleDrawer"></demo-nav>
    <div class="main-content">
      <!-- 左侧部分 -->
      <div class="left-panel">
        <slot name="detail-content"></slot>
      </div>
      <!-- 右侧部分 -->
      <div v-if="hiddenRight" class="right-panel">
        <slot name="demo-card"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoContent",
  data() {
    return {
      open: false,
      screenWidth: document.body.clientWidth,
      image:require("@/assets/images/artstation.jpg"),
      // image:require("@/assets/images/wallhaven-2el1mg.jpg"),
      drawer_background: require("@/assets/images/drawer_back.jpg"),
      net_array:[
        {name:"bilibili",url:"",img:""},
        {name:"baidu",url:"",img:""},
        {name:"github",url:"",img:""}
        ]
    };
  },
  computed: {
    hiddenRight(){
      let right = this.$route.meta.right;
      if(typeof (right) == 'undefined') right = true;
      return right;
    },
    //是否已登录
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    //已登录用户信息
    user: function() {
      return this.$store.state.current_user;
    }
  },
  methods: {
    toggleDrawer() {
      this.open = !this.open;
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          if (that.screenWidth > 992) {
            that.open = false;
          }
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>

<style scoped>
.demo-content{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.4s ease-in;
}
.main-content{
  /* padding-top: 55px; */
}
.left-panel {
  /* position: sticky;
  top: 70px; */
  padding: 10px 5px;
  overflow: hidden;
  /* max-width: 800px; */
}
.right-panel {
  padding-top: 5px;
}
.mu-drawer {
  background-repeat: no-repeat;
  background-size: cover;
  top: 60px;
}
.mu-item-title {
  text-align: center;
}
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
  background: rgb(240, 246, 252);
}
/*滚动条轨道*/
.right-panel::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background: transparent;
}
/* 桌面，宽度>=993px */
@media screen and (min-width: 993px) {
  .main-content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
  }
  .main-content .left-panel {
    flex: 1;
    margin-right: 15px;
  }
  .main-content .right-panel {
    width: 300px;
    overflow-y: auto;
  }
}
/* 平板，宽度[769px,992px]; */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .main-content .right-panel {
    display: none;
  }
}
/* 手机，宽度<=768px */
@media screen and (max-width: 768px) {
  .main-content .right-panel {
    display: none;
  }
  .main-content .left-panel {
    padding-top: 5px;
  }
}
</style>