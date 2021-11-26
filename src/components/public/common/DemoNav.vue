<template>
  <!-- 顶部导航栏组件 -->
  <demo-transition type="bt">
    <div class="demo-nav" v-show="showNav">
      <div class="header white-box">
        <div class="nav-title">
          <div class="nav-back" v-show="showBlackIcon" @click="$router.back(-1)">
            <mu-icon value="arrow_back" size="30" class="middle"></mu-icon>
          </div>
          <span class="title" @click="$router.push('/')">
            <span>D</span>
            <span>E</span>
            <span>M</span>
            <span>O</span>
            <span>O</span>
            <span>O</span>
          </span>
          <div class="nav-menu">
            <mu-icon value="menu" size="30" class="middle" @click="showDrawer"></mu-icon>
          </div>
        </div>
        <div class="nav-content" id="nav-content">
          <!-- <div class="nav-item" style="text-align:right;">
          <div class="search-area clear-line">
            <input type="text" class="search-box" v-model="search_txt" placeholder="输入搜索内容" />
            <mu-icon class="middle" value="search" size="27" @click="searchGo"></mu-icon>
          </div>
        </div> -->
          <!-- <div
          class="nav-item"
          :class="$route.meta.nav=='album'?'active-item':''"
          @click="$router.replace('/album')"
        >相册</div>
        <div
          class="nav-item"
          :class="$route.meta.nav=='mine'?'active-item':''"
          @click="$router.replace('/mine')"
        >我的</div> -->
          <mu-menu placement="bottom-start" :open="select_open" open-on-hover style="margin-right:40px;">
            <div class="base-color bold-font">Home Version</div>
            <mu-list slot="content">
              <mu-list-item button to="/" @click="$store.commit('change_version', 'v1')">
                <mu-list-item-title>v1.0.0</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button to="/v2" @click="$store.commit('change_version', 'v2')">
                <mu-list-item-title>v2.0.0</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
          <!-- <mu-menu placement="bottom-start" :open="menu_open" open-on-hover style="margin-right:40px;">
            <div class="base-color bold-font">Application</div>
            <menu-item slot="content"></menu-item>
          </mu-menu> -->
          <div class="base-color bold-font" style="margin-right:40px;">Language</div>
          <div class="base-color bold-font pointer" @click="go_mine" style="margin-right:40px;">
            Application
          </div>
        </div>
      </div>
      <!-- <div class="nothing-box"></div> -->
    </div>
  </demo-transition>
</template>

<script>
  import SearchIcon from "@/components/public/SearchIcon";
  import MenuItem from "@/components/public/MenuItem"
  import util from "@/util/util";
  export default {
    name: "DemoNav",
    data() {
      return {
        search_txt: "",
        style: true,
        logo_png: require("@/assets/images/logo.png"),
        scrollTop: 0,
        showNav: true,
        menu_open: false,
        select_open: false
      };
    },
    mounted() {
      window.addEventListener("scroll", util.debounce(this.scroll, 500), true);
      // // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
      // window.history.pushState(null, null, document.URL);
      // // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
      // window.addEventListener("popstate", this.onBrowserBack, false);
    },
    watch: {
      scrollTop(newVal, oldVal) {
        if (newVal - oldVal > 1) {
          this.showNav = false
        } else {
          this.showNav = true
        }
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.scroll);
      // console.log("--------beforeDestroy")
      // // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
      // window.removeEventListener("popstate", this.onBrowserBack, false);
    },
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
    methods: {
      //不再隐藏导航栏
      scroll() {
        // let element = document.querySelector(".demo-content")
        // let scrollTop = element ? element.scrollTop : 0;
        // this.scrollTop = scrollTop
      },
      showDrawer() {
        this.$emit("toggle");
      },
      onSearch() { },
      searchGo() {
        console.log("searchGo")
        this.search_txt
          ? this.$router.push("/search")
          : this.$demo_notify("请输入搜索内容");
      },
      go_mine(){
        console.log(this.$store.getters.is_v1+'-------'+this.$store.getters.is_v2)
        if(this.$store.getters.is_v1){
          this.$router.push('/mine')
        } else if(this.$store.getters.is_v2){
          this.$router.push('/v2/mine')
        }

      }
    },
    computed: {
      //已登录用户信息
      user: function () {
        return this.$store.state.current_user;
      },
      //是否已登录
      isLogin: function () {
        return this.$store.getters.isLogin;
      },
      showBlackIcon: function () {
        var routeName = this.$route.name;
        if (
          routeName == "homePage" ||
          routeName == "album" ||
          routeName == "mine" ||
          routeName == "star"
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    components: {
      SearchIcon,
      MenuItem
    }
  };
</script>

<style scoped>
  .demo-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    /* transition: all .5s ease-in; */
  }

  .header {
    display: flex;
    justify-content: center;
    /* color: aliceblue; */
    height: 55px;
    min-width: 300px;
    /* background-color: #fff; */
    color: #fff;
    line-height: 55px;
    /* padding-bottom: 5px; */
  }

  .white-box {
    color: black;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: #fff;
  }

  .nothing-box {
    height: 15px;
    background-color: transparent;
  }

  .nav-title {
    font-family: "Dressedless Three", sans-serif;
    font-weight: 500;
    font-size: 3.5rem;
    font-size: 28px;
  }

  .nav-title .title {
    cursor: pointer;
  }

  .nav-title .title span:nth-child(1) {
    color: #4286f3;
  }

  .nav-title .title span:nth-child(2),
  span:nth-child(5),
  span:nth-child(6) {
    color: #eb4537;
  }

  .nav-title .title span:nth-child(3) {
    color: #fac230;
  }

  .nav-title .title span:nth-child(4) {
    color: #55af7b;
  }

  .title img {
    padding-top: 10px;
    width: 150px;
  }

  .nav-content {
    display: flex;
    justify-content: space-around;
    /* background-color: #fff; */
  }

  .nav-content .nav-item {
    /* width: 60px; */
    text-align: center;
    transition: all 1s;
  }

  /* .active-item {
  border-bottom: 3px rgb(255, 0, 0) solid;
} */
  .nav-title {
    width: 50%;
  }

  .nav-content {
    width: 50%;
  }

  .nav-back {
    cursor: pointer;
  }

  .middle {
    cursor: pointer;
    vertical-align: middle;
  }

  .search-box {
    height: 100%;
    outline: 0;
    border: none;
    color: black;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 100px;
    min-width: 300px;
    transition: all 0.5s ease-in-out;
    /* background-color: aquamarine; */
    /* background-color: #ffffff; */
    background-color: rgba(0, 0, 0, 0.1);
    display: inline-block;
  }

  .search-box:focus {
    min-width: 350px;
  }

  .clear-line {
    line-height: normal;
  }

  .search-area {
    margin-top: 13px;
    /* background-color: rgb(0, 0, 0,0.2); */
    height: 30px;
    border-radius: 100px;
    padding-right: 7px;
    opacity: 0.7;
    /* text-align: right; */
  }

  .white-back {
    background-color: rgba(255, 255, 255, 0.7);
  }

  /* 大屏幕，宽度大于800px; */
  @media screen and (min-width: 993px) {
    .nav-title {
      width: 50%;
      padding-left: 40px;
    }

    .nav-content {
      display: flex;
      /* position: static; */
      justify-content: flex-end;
      /* width: 50%; */
      /* padding-left: 20%; */
    }

    .nav-item:hover {
      /* color: rgb(255, 0, 0); */
      /* border-bottom: 3px #ffffff solid; */
      cursor: pointer;
      /* transition: all 0.5s; */
    }

    .nav-menu,
    .nav-back {
      display: none;
    }
  }

  /* 中等屏幕 */
  @media screen and (min-width: 769px) and (max-width: 992px) {
    .nav-title {
      width: 30%;
      padding: 0 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .nav-content {
      width: 70%;
      display: flex;
      /* position: static; */
    }

    .nav-menu,
    .nav-back {
      display: none;
    }
  }

  /* 小屏幕 */
  @media screen and (max-width: 768px) {
    .header {
      display: block;
      justify-content: space-between;
      /* padding: 0 20px; */
    }

    .nav-content {
      display: none;
      width: auto;
    }

    .nav-title {
      width: 100%;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
    }

    .show-item {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      line-height: 30px;
      /* font-weight: bold; */
    }
  }
</style>