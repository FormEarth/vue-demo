<template>
  <mu-container class="demo-container" fluid>
    <demo-content>
      <div slot="user-card">
        <user-card :user="user"></user-card>
      </div>
      <div slot="detail-content">
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
      </div>
    </demo-content>
  </mu-container>
</template>
<script>
import ArticleItem from "@/components/public/article/ArticleItem";
import UserCard from "@/components/public/user/UserCard";
import DemoContent from "@/components/public/common/DemoContent";
export default {
  name: "home_new",
  data() {
    return {
      articles: [],
      user: {},
      total: 0, //数据总条数
      background: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      current: 1,
      // user: {
      //   name: "raining_heavily",
      //   avatar: require("@/assets/images/test5.jpg"),
      //   github: "https://github.com/FormEarth",
      //   weibo: "https://weibo.com/5612098628"
      // }
      backgroundImage:
        "http://192.168.149.110:9090/static/upload/images/20191012152641.jpg"
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
    this.getArticleData(this);
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
    "article-item": ArticleItem,
    "user-card": UserCard,
    "demo-content": DemoContent
  },
  methods: {
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
    //分页跳转
    changePage() {
      // this.$http.user
      //   .getArticlesByUserId(this.$route.params.userId, this.current)
      //   .then(response => {
      //     this.articles = response.data.data.articles;
      //     this.total = response.data.data.total
      this.$options.methods.getArticleData(this);
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
  .nav-title {
    width: 60%;
  }
  .nav-content {
    width: 40%;
  }
  .content {
    display: flex;
  }
  .content .introduction {
    width: 25%;
    /* min-width: 200px; */
    position: fixed;
    top: 75px;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .article-list {
    width: 75%;
    position: fixed;
    top: 75px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
  }
  .link img:hover {
    transform: scale(1.1); /* 元素放大1.4倍 */
    transition: all 1s; /* 元素在0.5s内完成动画 */
    cursor: pointer;
  }
}
/* 中等屏幕，宽度640px~960px; */
@media screen and (min-width: 600px) and (max-width: 800px) {
  .nav-title {
    width: 50%;
  }
  .nav-content {
    width: 50%;
  }
  .content {
    margin-top: 15px;
  }
  .content .introduction {
    width: 28%;
    /* min-width: 200px; */
    position: fixed;
    top: 75px;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content .article-list {
    width: 72%;
    position: fixed;
    top: 75px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
  }
  .nav-item:hover {
    color: rgb(185, 10, 10);
    border-bottom: 3px rgb(185, 10, 10) solid;
    cursor: pointer;
    transition: all 1s;
  }
}
/* 小屏幕，宽度在300px~640px */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .nav-title {
    width: 40%;
  }
  .nav-content {
    width: 60%;
  }
  .content {
    margin: 15px 2% 0 2%;
  }
  .content .article-list {
    margin-bottom: 5px;
  }
}
/* .span {
  border: 1px red solid;
} */
</style>

