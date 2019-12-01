<template>
  <div
    v-if="!dataIsLoaded"
    style="width:100%;height:100%;padding-top:200px;"
    v-loading="initLoading"
    data-mu-loading-text="数据正在加载中……"
    @click="getInitArticlesData"
  >
    <div v-show="!initLoading" style="text-align:center;">
      <span>数据加载失败，点击屏幕以重试</span>
      <br />
      <mu-icon size="56" value="refresh" color="blue100"></mu-icon>
    </div>
  </div>
  <mu-container class="demo-container" fluid v-else>
    <div class="detail-content">
      <div v-if="articles.length!=0">
        <van-list
          v-model="loading"
          :finished="loadedAll"
          :immediate-check="false"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="getMoreArticleData"
        >
          <article-card-view
            v-for="article in articles"
            :key="article.articleId"
            :article="article"
          ></article-card-view>
        </van-list>
      </div>
      <div class="no-articles" v-else>空空如也……@￥%#</div>
    </div>
  </mu-container>
</template>
<script>
import ArticleCardView from "@/components/public/article/ArticleCardView.vue";
export default {
  name: "ArticleList",
  data() {
    return {
      loading: false, //是否显示加载遮罩层
      articles: [],
      total: 0, //数据总条数
      current: 1,
      initLoading: false, //初始化是否显示加载遮罩层
      dataIsLoaded: false, //初始化请求页面是否成功
      loadedAll: false, //下拉加载数据时，数据是否已加载完毕
      loading: false, //上滑加载更多时是否在加载状态
      refreshing: false, //下拉更新时是否在加载状态
      refreshTime: "", //每次更新数据时记录
      error: false
    };
  },
  created: function() {
    this.getInitArticlesData();
  },
  computed: {
    //已登录用户信息
    // user: function() {
    //   return this.$store.state.current_user;
    // },
    //是否已登录
    isLogin: function() {
      return this.$store.getters.isLogin;
    }
  },
  components: {
    ArticleCardView,
  },
  methods: {
    //页面加载时显示的初始化数据
    getInitArticlesData() {
      this.initLoading = true;
      this.$http.article
        .getHomePageArticles(this.current)
        .then(response => {
          if (response.data.code == "2000") {
            this.articles = response.data.data.articles;
            this.total = response.data.data.total;
            this.dataIsLoaded = true;
            this.initLoading = false;
            this.refreshTime = response.data.time;
          } else {
            this.initLoading = false;
          }
        })
        .catch(error => {
          this.initLoading = false;
        });
    },
    //滑动到底部时加载更多数据
    getMoreArticleData() {
      if (this.loadedAll) return; //已加载完毕不再进行任何操作
      this.current = this.current + 1;
      console.log("当前加载文章页数：" + this.current);
      this.loading = true;
      this.$http.article
        .getHomePageArticles(this.current)
        .then(response => {
          if ((response.data.code = "2000")) {
            let dataLength = response.data.data.articles.length;
            for (let i = 0; i < dataLength; i++) {
              this.articles.push(response.data.data.articles[i]);
            }
            if (this.articles.length >= this.total) {
              this.loadedAll = true;
            }
            this.loading = false;
          } else {
            this.loading = false;
            this.error = true;
            this.current = this.current - 1;
          }
        })
        .catch(error => {
          this.loading = false;
          this.error = true;
          this.current = this.current - 1;
        });
    }
  }
};
</script>

<style scoped>
.demo-container {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
.detail-content {
  padding: 10px;
}
.no-articles {
  background-color: whitesmoke;
  font-size: 16px;
  padding-top: 42px;
  height: 100px;
  text-align: center;
}
.footer {
  margin-top: 15px;
  text-align: center;
  /* color:white; */
}
/* 大屏幕，宽度大于960px; */
@media screen and (min-width: 800px) {
  .demo-container {
    /* padding: 0 10%; */
  }
  .content {
    display: flex;
  }
  .link img:hover {
    transform: scale(1.1); /* 元素放大1.4倍 */
    transition: all 1s; /* 元素在0.5s内完成动画 */
    cursor: pointer;
  }
}
/* 中等屏幕，宽度640px~960px; */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .content {
    margin-top: 15px;
  }
}
/* 小屏幕，宽度在300px~640px */
@media screen and (max-width: 600px) {
  .detail-content {
    background-image: linear-gradient(to bottom left, #07a3b2, #d9ecc7);
    padding: 10px 5px 56px 5px;
  }
  /* .content {
    margin-top: 15px;
  } */
}
/* .span {
  border: 1px red solid;
} */
</style>

