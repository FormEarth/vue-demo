<template>
  <div class="demo-nav white-back">
    <div class="logo-area">
      <demo-logo></demo-logo>
    </div>
    <div class="nav-area hidden-in-md">
      <div class=" nav-item">
        <div class="search-area clear-line">
          <input type="text" class="search-box" v-model="search_txt" placeholder="输入搜索内容" />
          <!-- <mu-icon class="middle base-color" value="search" size="27" @click="searchGo"></mu-icon> -->
        </div>
      </div>
      <div class=" nav-item">
        <div class="base-color bold-font pointer mr-40" @click="$router.replace('/album')">相册
        </div>
      </div>
      <div class=" nav-item">
        <mu-menu placement="bottom-start" :open="lang_open" open-on-hover>
          <div class="base-color bold-font">{{ $t("language") }}</div>
          <mu-list slot="content">
            <mu-list-item button @click="language_change('zh-CN')">
              <mu-list-item-title>{{ $t("language_china") }}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="language_change('en-US')">
              <mu-list-item-title>{{ $t("language_us") }}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </div>
      <div class=" nav-item">
        <div class="base-color bold-font pointer mr-40" @click="$router.push(isLogin?'/v2/mine':'/login')">{{
          isLogin?$t("mine"):$t("login") }}
        </div>
      </div>
    </div>
    <div class="nav-area show-in-md nav-item" style="padding-top: 13px;">
      <mu-icon value="menu" size="30" class="pointer" @click="drawer_open=true;"></mu-icon>
    </div>
    <!-- <mu-drawer :open.sync="drawer_open" :docked="false" right>
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="drawer_open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer> -->
    <demo-drawer :open="drawer_open" @toggle="toggle_drawer"></demo-drawer>
  </div>

</template>
<script>
  export default {
    name: 'demo-nav',
    data() {
      return {
        search_txt: "",
        version_open: false,
        lang_open: false,
        drawer_open: false
      }
    },
    computed: {
      //是否已登录
      isLogin: function () {
        return this.$store.getters.isLogin;
      },
    },
    methods: {
      searchGo() {
        console.log("searchGo")
        this.search_txt
          ? this.$router.push("/search")
          : this.$demo_notify("请输入搜索内容");
      },
      language_change(lang) {
        this.$i18n.locale = lang
        let query_new = JSON.parse(JSON.stringify(this.$route.query))
        query_new.lang = lang
        this.$router.replace({
          path: this.$route.path,
          query: query_new
        })

      },
      toggle_drawer(value) {
        this.drawer_open = value
      }
    },

  }
</script>
<style scoped>
  .demo-nav {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    height: 56px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    /* transition: all .5s ease-in; */
    line-height: 56px;
    display: flex;
    flex-wrap: nowrap;
  }

  .logo-area {
    /* margin-left: 20px; */
    width: 200px;
    text-align: right;
  }

  .nav-area {
    flex: 1;
    /* display: flex; */
    flex-wrap: nowrap;
    justify-content: flex-end;
    line-height: 56px;
    /* flex-direction: row-reverse; */

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

  .nav-item {
    margin-right: 30px;
  }

  .show-in-md {
    display: none;
  }

  .hidden-in-md {
    display: flex;
  }

  @media screen and (max-width: 768px) {
    .show-in-md {
      display: flex;
    }

    .hidden-in-md {
      display: none;
    }
  }
</style>