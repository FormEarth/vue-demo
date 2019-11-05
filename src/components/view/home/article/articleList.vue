<template>
  <mu-container class="demo-container" fluid v-loading="loading">
    <div class="detail-content">
      <div v-if="articles.length!=0">
        <article-item v-for="article in articles" :key="article.articleId" :article="article"></article-item>
      </div>
      <div class="no-articles" v-else>空空如也……@￥%#</div>
      <mu-flex justify-content="center">
        <mu-pagination :total="total" :page-size="5" :current.sync="current" @change="changePage"></mu-pagination>
      </mu-flex>
      <div class="footer">
        <span>© 2019 raining_heavily</span>
      </div>
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
    </div>
  </mu-container>
</template>
<script>
import ArticleItem from "@/components/public/article/ArticleItem";

export default {
  name: "ArticleList",
  data() {
    return {
      loading: false, //是否显示加载遮罩层
      open: false, //写文章按钮是否展开,
      articles: [],
      user: {},
      total: 0, //数据总条数
      current: 1
    };
  },
  created: function() {
    var currentPage;
    if (typeof this.$route.params.currentPage == "undefined") {
      currentPage = 1;
      this.current = 1;
    } else {
      this.current = currentPage = Number(this.$route.params.currentPage);
    }
    if (this.$route.name == "homePage") {
      this.getHomePageArticleData(this);
    } else {
      this.getArticleData(this);
    }
  },
  watch: {
    //查询参数改变，再次执行数据获取方法
    $route() {
      console.log("路由更改了");
      if (this.$route.name == "articleswithpageno") {
        this.getArticleData(this);
      }
    }
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
    "article-item": ArticleItem
  },
  methods: {
    change() {
      this.open ? (this.open = false) : (this.open = true);
    },
    login() {
      this.$router.push("/login");
    },
    getArticleData(that) {
      that.$http.user
        .getArticlesByUserId(that.$route.params.userId, that.current)
        .then(response => {
          that.articles = response.data.data.articles;
          that.total = response.data.data.total;
          that.user = response.data.data.user;
        });
    },
    getHomePageArticleData(that) {
      that.loading = true;
      that.$http.article
        .getHomePageArticles(that.current)
        .then(response => {
          that.articles = response.data.data.articles;
          that.total = response.data.data.total;
          that.user = response.data.data.user;
          that.loading = false;
        })
        .catch(error => {
          that.loading = false;
        });
    },
    //分页跳转
    changePage() {
      // this.$http.user
      //   .getArticlesByUserId(this.$route.params.userId, this.current)
      //   .then(response => {
      //     this.articles = response.data.data.articles;
      //     this.total = response.data.data.total
      if (this.$route.name == "homePage") {
        this.$options.methods.getHomePageArticleData(this);
        return;
      } else {
        this.$options.methods.getArticleData(this);
      }
      //以下为替换地址栏路径
      if (this.$route.name == "articles") {
        history.pushState(null, "", this.$route.path + "/" + this.current);
      } else {
        var url = this.$route.path;
        url = url.substring(0, url.length - 1) + this.current;
        history.pushState(null, "", url);
      }
      // });
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
.addButton {
  width: 20%;
  position: fixed;
  right: 5px;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
/* 大屏幕，宽度大于960px; */
@media screen and (min-width: 800px) {
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
@media screen and (min-width: 300px) and (max-width: 600px) {
  .detail-content {
    padding: 10px 5px 0 5px;
  }
  /* .content {
    margin-top: 15px;
  } */
}
/* .span {
  border: 1px red solid;
} */
</style>

