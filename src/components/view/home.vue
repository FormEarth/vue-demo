<template>
  <mu-container>
    <mu-paper :z-depth="0" class="home-paper">
      <mu-appbar color="redA700">
        <mu-button icon slot="left">
          <mu-icon value="whatshot"></mu-icon>
        </mu-button>
        <mu-button icon slot="right">
          <mu-icon value="search"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list textline="three-line" dense style="background-color: rgb(207, 207, 218);">
        <mu-sub-header style="background-color: white">热门推荐</mu-sub-header>
        <div v-for="artice in artices" :key="artice.id">
          <artice-list style="margin-bottom:3px;" :artice="artice" :type="artice.type"></artice-list>
        </div>
      </mu-list>
      <!-- <mu-button fab class="writeArtice" color="redA700" to="/home/artice/add">
      <mu-icon value="add" size="36"></mu-icon>
      </mu-button>-->
      <div class="addButton">
        <mu-slide-left-transition>
          <mu-button v-show="this.open" to="/home/atlas/add" style="margin-bottom:8px;">
            发布图集
            <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
          </mu-button>
        </mu-slide-left-transition>
        <mu-slide-right-transition>
          <mu-button v-show="this.open" to="/home/artice/add" style="margin-bottom:8px;">
            写长文
            <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
          </mu-button>
        </mu-slide-right-transition>
        <mu-slide-bottom-transition>
          <mu-button v-show="this.open" style="margin-bottom:8px;">写短文</mu-button>
        </mu-slide-bottom-transition>
        <mu-button fab color="redA700" :ripple="false" v-if="!open" @click="change">
          <mu-icon value="add" size="38"></mu-icon>
        </mu-button>
        <mu-button fab color="redA700" v-else @click="change">
          <mu-icon value="close" size="38"></mu-icon>
        </mu-button>
      </div>
    </mu-paper>
    <app-footer param="home"></app-footer>
    <!-- <router-view></router-view> -->
  </mu-container>
</template>
<script>
import ArticeList from "@/components/public/ArticeList.vue";
import { artices } from "@/axios/api";

export default {
  name: "home",
  data() {
    return {
      open: false, //写文章按钮是否展开,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg"),
      artices: []
    };
  },
  //created()是一个函数
  created(){
    artices().then(response => {
          const artices = response.data.data
          this.artices = artices
        });
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    goArticle(id) {
      var url = "/home/artice/get/" + id;
      this.$router.push(url);
    },
    goRegister() {
      this.$router.push("/register");
    },
    change() {
      this.open ? (this.open = false) : (this.open = true);
    }
  },
  components: {
    "artice-list": ArticeList
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.home-paper {
  padding-top: 58px;
  padding-bottom: 56px;
  width: 100%;
  /* max-width可能会导致大屏幕填充不满的情况 */
  max-width: 500px;
  overflow: hidden;
}
.mu-list{
  padding: 0px;
}
.mu-appbar {
  max-width: 500px;
  min-width: 350px;
  width: 100%;
  position: fixed;
  top: 0px;
}
.mu-avatar img {
  /* color: rgb(207, 207, 218); */
  border-radius: 0%;
}
.addButton {
  width: 20%;
  position: fixed;
  right: 5px;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
</style>

