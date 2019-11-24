<template>
  <div style="padding-bottom:10px;">
    <div class="article-item">
      <div class="left-image">
        <img :src="article.frontCover" />
      </div>
      <div class="right-content">
        <div class="title">
          <span>{{article.title}}</span>
          <div class="title-tag">
            <demo-tag v-for="(tag,index) in tagArray" :key="index" color="green" small>{{tag}}</demo-tag>
          </div>
        </div>
        <div class="sub-title">{{article.summary}}</div>
        <img class="front-cover" :src="article.frontCover" />
        <div class="footer">
          <div class="avatar">
            <img
              src="http://192.168.2.105:9090/static/thumbnail/atlas/1d37298774524299892bcd0e05d754b4.jpg"
            />
            <span>{{article.authorName}}|{{article.sendTime|time}}</span>
          </div>
          <div class="detail-sign">
            <span @click="$router.push('/article/detail/'+ article.articleId)">文章详情</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  name: "ArticleCardView",
  props: {
    article: {}
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
  },
  filters: {
    time: function(value) {
      return util.dateSubtract(value);
    }
  }
};
</script>

<style scoped>
.article-item {
  height: 100%;
  display: flex;
  border-radius: 5px;
  background-color: #fff;
  border-top: 0.5px rgba(0, 0, 0, 0.3) solid;
  border-left: 0.5px rgba(0, 0, 0, 0.3) solid;
  border-right: 0.5px rgba(0, 0, 0, 0.3) solid;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
}
.left-image {
  width: 30%;
  height: auto;
  max-height: 168px;
  overflow: hidden;
  background-color: aquamarine;
}
.left-image img {
  /* width: 100%;
  height: 100%;
  vertical-align: top; */
    object-fit: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width:100%;
	height:100%;
}
.right-content {
  width: 70%;
  /* flex:1; */
}
.title {
  font-size: 20px;
  padding-top: 7px;
  padding-left: 3px;
}
.sub-title {
  color: gray;
  margin-bottom: 6px;
  padding-left: 3px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.front-cover {
  object-fit: cover;
  width: 100%;
  height: 150px;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.avatar {
  padding-left: 3px;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
}
.avatar span {
  vertical-align: middle;
}
.detail-sign {
  cursor: pointer;
  padding-right: 17px;
  padding-top: 10px;
  color: #07a3b2;
}
.detail-sign::after {
  content: ">>";
}
/* 注意这里的空格 >=800px*/
@media screen and (min-width: 800px) {
  .front-cover {
    display: none;
  }
  .article-item {
    transition: all 0.1s;
  }
  .right-content {
    padding-left: 10px;
  }
  .sub-title {
    padding: 0 7px;
  }
  .article-item:hover {
    /* transform: translateX(-10px); */
    box-shadow: 0px 4px 5px 3px rgba(33, 150, 243, 0.4);
  }
}
@media screen and (max-width: 800px) {
  .left-image {
    display: none;
  }
  .right-content {
    width: 100%;
  }
  .title .title-tag {
    display: inline-block;
  }
}
</style>