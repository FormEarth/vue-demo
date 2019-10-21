<template>
  <mu-container>
    <van-tabs v-model="active" swipeable sticky style="max-width:500px;">
      <van-tab title="文章">
        <mu-paper :z-depth="0" class="home-paper">
          <mu-list textline="three-line" dense style="background-color: rgb(207, 207, 218);">
            <mu-sub-header style="background-color: white">热门推荐</mu-sub-header>
            <!-- <transition-group> -->
              <div v-for="article in articles" :key="article.id">
                <article-list style="margin-bottom:3px;" :article="article" :type="article.type"></article-list>
              </div>
            <!-- </transition-group> -->
          </mu-list>
          <div class="addButton">
            <mu-slide-left-transition>
              <mu-button v-show="this.open" to="/home/atlas/add" style="margin-bottom:8px;">
                发布图集
                <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
              </mu-button>
            </mu-slide-left-transition>
            <mu-slide-right-transition>
              <mu-button v-show="this.open" to="/home/article/add" style="margin-bottom:8px;">
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
      </van-tab>
      <van-tab title="图集">
        <mu-paper :z-depth="0" class="home-paper">
          <mu-list textline="three-line" dense style="background-color: rgb(201, 223, 218);">
            <mu-sub-header style="background-color: white">图集推荐</mu-sub-header>
            <div v-for="atlas in atlases" :key="atlas.id">
              <atlas-list style="margin-bottom:3px;" :atlas="atlas"></atlas-list>
            </div>
          </mu-list>
        </mu-paper>
      </van-tab>
      <!-- <van-tab title="其它">
        暂时什么都没有哦^-^
      </van-tab> -->
    </van-tabs>
    <!-- <router-view></router-view> -->
  </mu-container>
</template>
<script>
import ArticleList from "@/components/public/ArticleList.vue";
import AtlasList from "@/components/public/AtlasList.vue";

export default {
  name: "home1",
  data() {
    return {
      active: 0,
      open: false, //写文章按钮是否展开,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg"),
      articles: [], //文章列表数据
      atlases: [] //图集列表数据
    };
  },
  //created()是一个函数
  created() {
    this.$http.article.getHomePageArticles().then(response => {
      var articles = response.data.data.articles;
      this.articles = articles;
    });
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    goArticle(id) {
      var url = "/home/article/get/" + id;
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
    "article-list": ArticleList,
    "atlas-list": AtlasList
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  /* min-width: 350px; */
}
.home-paper {
  /* padding-top: 58px; */
  padding-bottom: 56px;
  width: 100%;
  /* max-width可能会导致大屏幕填充不满的情况 */
  max-width: 500px;
  overflow: hidden;
}
.mu-list {
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

