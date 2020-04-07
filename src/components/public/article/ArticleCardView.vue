<template>
  <div class="root">
    <div class="article-item" @click="$router.push('/writing/detail/'+ article.writingId)">
      <div class="left-image" :style="{backgroundImage: 'url(' + article.frontCover + ')'}">
        <!-- <img :src="article.frontCover" /> -->
      </div>
      <!-- <img class="left-img" :src="article.frontCover" /> -->
      <div class="right-content">
        <div class="title">
          <span>{{article.title}}</span>
        </div>
        <!-- <div class="title-tag">
          <demo-tag
            v-for="(tag,index) in article.tags"
            :key="index"
            color="green"
            small
          >{{tag.tagText}}</demo-tag>
        </div>-->
        <div style="padding-left: 3px;">
          <!-- <span>{{article.authorName}}&nbsp;&nbsp;</span> -->
          <!-- <span>
            <mu-icon value="schedule" size="16" style="vertical-align: text-top;"></mu-icon>
            {{article.sendTime|time}}&nbsp;&nbsp;
          </span>
          <span>
            <mu-icon value="remove_red_eye" size="16" style="vertical-align: text-top;"></mu-icon>
            {{article.pageview}}&nbsp;阅读&nbsp;&nbsp;
          </span>-->
          <span v-if="hasTag">
            <mu-icon value="local_offer" size="16" style="vertical-align: text-top;"></mu-icon>
            <demo-tag
              v-for="(tag,index) in article.tags"
              :key="index"
              color="green"
              small
              simple
            >{{tag.tagText}}</demo-tag>
          </span>
        </div>
        <div class="sub-title">{{article.summary}}</div>
        <!-- <img class="front-cover" :src="article.frontCover" /> -->
        <!-- <div class="footer">
          <div class="avatar">
            <img
              :src="picture"
            />
            <span>{{article.authorName}}|{{article.sendTime|time}}</span>
          </div>
          <div class="detail-sign">
            <span @click="$router.push('/article/detail/'+ article.articleId)">文章详情</span>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  name: "ArticleCardView",
  data() {
    return {
      picture: require("@/assets/images/test5.jpg")
    };
  },
  props: {
    article: {}
  },
  computed: {
    hasTag() {
      console.log(typeof this.article.tags);
      return typeof this.article.tags == "undefined" ? false : true;
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
.root {
  padding-top: 5px;
  padding-bottom: 5px;
  max-width: 800px;
}
.article-item {
  transition: all 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* border-radius: 7px; */
  background-color: #fff;
  /* box-shadow: 0 1px 20px -8px rgba(0, 0, 0, 0.5); */
  border: 1px solid #e5e9ef;
}
.left-image {
  /* border-top-left-radius: 7px; */
  /* border-bottom-left-radius: 7px; */
  width: 30%;
  height: auto;
  max-height: 300px;
  overflow: hidden;
  background-color: aquamarine;
  background-size: cover;
  background-repeat: no-repeat;
}
/* .left-image img {
  object-fit: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 100%;
  height: 100%;
} */
.right-content {
  width: 70%;
  color: black;
  padding: 0 10px;
  /* flex:1; */
}
.title {
  font-size: 24px;
  font-weight: 300;
  padding: 7px 3px;
  transition: color 0.3s;
}
.sub-title {
  font-size: 15px;
  color: gray;
  margin-top: 5px;
  margin-bottom: 12px;
  line-height: 1.5;
  padding-left: 3px;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical; /** 这个属性在build时会被删除，需要特别处理 */
  /* autoprefixer: on */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  word-break: break-all;
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
  width: 35px;
  height: 35px;
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
@media screen and (min-width: 993px) {
  .front-cover {
    display: none;
  }
  .right-content {
    padding-left: 10px;
  }
  .sub-title {
    padding: 0 7px;
  }
  .article-item:hover {
    /* box-shadow: 0px 4px 5px 3px rgba(33, 150, 243, 0.4); */
    box-shadow: 0 3px 10px 0 rgba(213, 216, 219, 0.44);
  }
  /* .article-item:hover .title {
    color: rgb(39, 118, 236);
  } */
}
@media screen and (max-width: 768px) {
  .left-image {
    /* display: none; */
    height: 250px;
    width: 100%;
    /* border-top-right-radius: 7px; */
    /* border-bottom-left-radius: 0; */
  }
  .right-content {
    width: 100%;
  }
  /* .title .title-tag {
    display: inline-block;
  } */
  .sub-title {
    display: none;
    -webkit-line-clamp: 4;
  }
  .article-item {
    padding-bottom: 10px;
  }
}
</style>