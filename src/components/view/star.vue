<template>
  <mu-container>
    <mu-paper :z-depth="0" class="home-paper">
      <mu-appbar color="primary" z-depth=0>
        <mu-button icon slot="left">
          <mu-icon value="whatshot"></mu-icon>
        </mu-button>
        <!-- <mu-button icon slot="right" @click="openFullscreenDialog">
          <mu-icon value="search"></mu-icon>
        </mu-button> -->
      </mu-appbar>
      <recommend-user-list></recommend-user-list>
    </mu-paper>
    <mu-dialog
      width="360"
      transition="slide-top"
      fullscreen
      :open.sync="openFullscreen"
      :overlay-close="false"
    >
      <mu-appbar :z-depth="0" color="primary" id="search-appbar">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <van-search
          style="padding:10px 0"
          v-model="search"
          background="#2196f3"
          left-icon=""
          placeholder="请输入搜索关键词"
          shape="round"
          @search="onSearch"
        >
          <!-- <div slot="action" @click="onSearch" style="font-size:16px;">搜索</div> -->
        </van-search>
        <mu-button slot="right" icon @click="onSearch">
          <mu-icon value="search"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 12px;">
        <van-panel title="热门搜索">
            <div class="hot-search">标题一</div><div class="hot-search">标题一</div><br>
            <div class="hot-search">标题一</div><div class="hot-search">标题一</div><br>
        </van-panel>
        <van-panel title="热门标签">
            <van-tag color="#ffe1e1" text-color="#ad0000" size="large">标签</van-tag>
            <van-tag color="#ffe1e1" text-color="#ad0000" size="large">标签</van-tag>
            <van-tag color="#ffe1e1" text-color="#ad0000" size="large">标签</van-tag>
        </van-panel>
      </div>
    </mu-dialog>
  </mu-container>
</template>
<script>
import RecommendUserList from "@/components/public/user/RecommendUserList.vue";
export default {
  name: "star",
  data() {
    return {
      openFullscreen: false,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg"),
      search: ""
    };
  },
  // mounted() {
  //   // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
  //   window.history.pushState(null, null, document.URL);
  //   // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
  //   window.addEventListener("popstate", this.onBrowserBack, false);
  // },
  // destroyed() {
  //   // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
  //   window.removeEventListener("popstate", this.onBrowserBack, false);
  // },
  // watch: {
  //   // 弹框监听，当弹框显示的时候，pushState添加一个历史，供返回键使用
  //   PopupShow: {
  //     handler(newVal, oldVal) {
  //       if (newVal.Terms === true) {
  //         window.history.pushState(null, null, document.URL);
  //       }
  //     },
  //     deep: true
  //   }
  // },
  //created()是一个函数
  created() {
    // articles().then(response => {
    //       const articles = response.data.data
    //       this.articles = articles
    //     });
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    change() {
      this.open ? (this.open = false) : (this.open = true);
    },
    openFullscreenDialog() {
      this.openFullscreen = true;
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    },
    onSearch() {
      console.log("search");
    },
    onBrowserBack() {
      // 这里写点击返回键时候的事件
      // 比如判断需求执行back()或者go(-2)或者PopupShow=false隐藏弹框
      if (this.openFullscreen == true) {
        this.openFullscreen = false;
      }else{
        this.$router.back(-1)
      }
    }
  },
  components:{
    RecommendUserList
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 800px;
  /* min-width: 350px; */
}
.home-paper {
  /* padding-top: 58px; */
  padding-bottom: 56px;
  width: 100%;
  /* max-width可能会导致大屏幕填充不满的情况 */
  /* max-width: 500px; */
  overflow: hidden;
}
.hot-search{
  display: inline-block;
  width: 50%;
}
#search-appbar >>> .mu-appbar-title {
  padding-left: 0;
}
#search-appbar >>> .mu-appbar-left {
  padding-right: 0;
}
</style>