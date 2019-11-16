<template>
  <div class="article-item">
    <div class="article-content">
      <div class="content-header">
        <div
          class="header-title"
          @click="$router.push('/article/detail/'+ article.articleId)"
        >{{article.title}}</div>
        <div>
          <demo-tag v-for="(tag,index) in tagArray" :key="index" random>{{tag}}</demo-tag>
        </div>
      </div>
      <div class="content">{{article.content}}</div>
      <div class="content-footer">
        <mu-button color="primary" flat small disabled>
          <mu-icon left value="query_builder"></mu-icon>
          {{article.sendTime|time}}
        </mu-button>
        <mu-button v-show="$route.name == 'homePage'" flat small disabled>
          <mu-icon left value="person_outline"></mu-icon>
          {{article.authorName}}
        </mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  name: "ArticleItem",
  props: {
    article: {}
  },
  data() {
    return {};
  },
  filters: {
    time: function(value) {
      return util.dateSubtract(value);
    }
  },
  computed: {
    //切割标签为数组
    tagArray: function() {
      if (
        typeof this.article.tags == "undefined" ||
        this.article.tags == null ||
        this.article.tags == ""
      ) {
        return [];
      }
      return this.article.tags.split("|");
    }
  }
};
</script>

<style scoped>
.article-item {
  display: flex;
  background-color: #fff;
  margin-bottom: 10px;
  /* border-bottom: 1px grey solid; */
  border-top: 0.5px rgba(0, 0, 0, 0.3) solid;
  border-left: 0.5px rgba(0, 0, 0, 0.3) solid;
  border-right: 0.5px rgba(0, 0, 0, 0.3) solid;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
}
.article-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.article-content {
  width: 100%;
}
.article-content .content-header {
  padding-left: 4px;
  font-size: 20px;
  /* font-weight: bold; */
  width: 100%;
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;
  flex-wrap: wrap;
}
.header-title {
  /* width: 50%; */
  color: #222;
}
.header-title:hover {
  cursor: pointer;
  color: #2196f3;
}
/* .header-tags {
} */
.article-content .content {
  width: 100%;
  padding: 10px 10px 0px 10px;
  color: darkgray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 行数 */
}
.article-content .content-footer {
  line-height: 1;
  padding: 10px 0px 5px 4px;
  color: rgb(88, 88, 88);
}
.mu-flat-button.disabled {
  cursor: default;
}
@media screen and (min-width: 800px) {
  .article-item {
    padding: 0 0 0 30px ;
  }
  .article-item .article-content {
    /* width: 73%; */
    border-left: 4px rgb(110, 110, 209) solid;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .article-item {
    padding: 0;
  }
  .article-item .article-content {
    /* width: 73%; */
    border-left: 4px rgb(110, 110, 209) solid;
  }
}
/* 宽度在300px~640px应用的css */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .article-item .article-img {
    display: none;
  }
  .article-item .article-content {
    width: 100%;
  }
}
</style>

