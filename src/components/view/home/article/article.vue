<template>
  <div class="demo-div">
    <div slot="detail-content">
      <div class="mu-card1">
        <div v-if="article.frontCover==null||article.frontCover==''" class="title">{{article.title}}</div>
        <mu-card-media :title="article.title" v-else>
          <img :src="article.frontCover" style="height:250px;width:100%;object-fit:cover;" />
        </mu-card-media>
        <div style="display:flex;justify-content:space-between;height:30px;margin:5px 0 9px 0">
          <div style="display:flex;padding-left:10px;">
            <div
              style="margin:6px 0px 0px 2px;color:#2196f3;"
              @click="goInfo"
            >{{article.authorName}}</div>
            <div style="margin-top:6px;margin-left:8px;">发布于&nbsp;&nbsp;{{article.sendTime}}</div>
          </div>
          <div style="margin-top:6px;text-align:right;padding-right:10px;">{{article.readerNum}} 阅读</div>
        </div>
        <div style="padding:5px 10px 5px 10px;">
          <demo-tag v-for="(tag,index) in tagArray" :key="index">{{tag}}</demo-tag>
        </div>
        <article-content :content="article.content" :article-style="article.style"></article-content>
        <mu-card-actions style="white-space: nowrap">
          <mu-badge content="1" circle class="demo-icon-badge">
            <mu-button icon @click="test">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>
          </mu-badge>
          <mu-badge content="1" circle class="demo-icon-badge">
            <mu-button icon>
              <mu-icon value="thumb_down"></mu-icon>
            </mu-button>
          </mu-badge>
          <mu-badge content="1" circle class="demo-icon-badge">
            <mu-button icon>
              <mu-icon value="favorite"></mu-icon>
            </mu-button>
          </mu-badge>
        </mu-card-actions>
        <!-- <mu-divider></mu-divider> -->
        <mu-card-actions v-if="!article.comment" style="text-align:center;font-size:16px;">
          <mu-icon value="speaker_notes_off"></mu-icon>
          <br />评论已被作者关闭
        </mu-card-actions>
        <mu-card-actions v-else>
          <div v-for="(comment,index) in comments" :key="comment.commentId">
            <demo-comment
              :comment="comment"
              :commentIndex="index"
              :articleUserId="article.author"
              :activeCommentId="activeCommentId"
              @func="changeActiveCommentId"
              @removeComment="removeCommentByIndex"
            ></demo-comment>
          </div>
          <div style="color: #aaa;font-size: 15px;letter-spacing: .1em;margin-bottom:10px;">发表新评论</div>
          <demo-input placeholder="添加评论" v-model="comment" />
          <div style="margin-top:10px;">
            <input
              :disabled="comment.length==0"
              type="submit"
              value="提交"
              @click="commentArticle"
              style="border:none;width:100%;background-color:#5db2ff;height:30px;"
            />
          </div>
        </mu-card-actions>
        <!-- <mu-divider></mu-divider> -->
        <mu-card-actions
          style="font-size:12px;text-align:center;padding-top:0px;"
        >文章由作者发布于本平台，版权属作者所有，文章不代表本站观点，若有侵权，请联系管理员</mu-card-actions>
      </div>
    </div>

    <mu-button fab class="toTop" color="indigo" @click="toTop" v-show="toTopIsShow">
      <mu-icon value="arrow_upward"></mu-icon>
    </mu-button>
    <!-- <app-footer param="home"></app-footer> -->
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>举报原因：</mu-sub-header>
        <mu-list-item button>
          <mu-list-item-title>政治有害类</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>侵权</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>广告、不健康信息信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>其他</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script>
import ArticleContent from "@/components/public/ArticleContent";
import { Toast } from "vant";

export default {
  //这个name属性不建议与已有的html元素重名，artice是已有的元素，会在控制台有警告，但好像不影响使用
  name: "article1",
  data() {
    return {
      star: false,
      open: false,
      toTopIsShow: false,
      defaultOpen: "preview",
      //文章对象
      article: {},
      //新增评论
      comment: "",
      //评论数组
      comments: [],
      //要回复的评论的评论id
      activeCommentId: "-1"
    };
  },
  //created()在页面生成之前调用，一般是加载页面所需要的数据
  created() {
    // var _this = this;
    // window.onscroll = function() {
    //   //鼠标滚轮滚动距离超过10像素时，回到顶部按钮才显示
    //   if (document.documentElement.scrollTop > 10) {
    //     _this.toTopIsShow = true;
    //   } else {
    //     _this.toTopIsShow = false;
    //   }
    // };
    this.$http.article
      .articleDetail(this.$route.params.articleId)
      .then(response => {
        this.article = response.data.data.article;
        this.comments = response.data.data.comments;
      });
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, 1000);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll, false);
  },
  computed: {
    //已登录用户信息
    user: function() {
      return this.$store.state.current_user;
    },
    //切割标签为数组
    tagArray: function() {
      if (
        typeof this.article.tags == "undefined" ||
        this.article.tags == null
      ) {
        return [];
      }
      return this.article.tags.split("|");
    }
  },
  methods: {
    scroll() {
      if (document.documentElement.scrollTop > 10) {
        this.toTopIsShow = true;
      } else {
        this.toTopIsShow = false;
      }
    },
    starArticle() {
      console.log(this.star);
      if (this.star) {
        this.star = false;
        this.$toast.success("取消收藏成功");
        //Toast.success('取消收藏成功');
      } else {
        this.star = true;
        this.$toast.success("收藏成功");
      }
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    toTop() {
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop = 0;
      }
    },
    goInfo() {
      this.$router.push("/" + this.article.author + "/articles");
    },
    test() {
      this.comment = "";
    },
    changeActiveCommentId(commentId) {
      this.activeCommentId = commentId;
    },
    //根据索引，移除comments数组元素
    removeCommentByIndex(index) {
      this.comments.splice(index, 1);
    },
    //添加评论
    commentArticle() {
      this.$http.article
        .addComment({
          articleId: this.article.articleId,
          commentContent: this.comment
        })
        .then(response => {
          this.comments.push({
            articleId: this.article.articleId,
            avatar: this.user.avatar,
            commentContent: this.comment,
            commentId: response.data.data.commentId,
            commentTime: response.data.time,
            replies: [],
            userId: this.user.userId,
            userName: this.user.userName
          });
          this.comment = "";
          if (response.data.code == "2000") {
            this.replyContent = "";
            this.$emit("func", 0);
            // 轻提示弹框
            Toast({
              message: "评论成功",
              duration: 2000,
              forbidClick: true
            });
          }
        });
    }
  },
  components: {
    "article-content": ArticleContent
  }
};
</script>
<style scoped>
.demo-div {
  min-width: 350px;
}
.mu-card-media-title {
  background-color: rgba(0, 0, 0, 0.2);
}
.title {
  padding-top: 3px;
  padding-left: 10px;
  font-size: 20px;
}
.mu-card1 {
  /* padding-top: 58px; */
  /* 覆盖掉mu-card的默认白色背景 */
  background-color: white;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
}
.mu-card-text {
  padding: 0px;
}
.mu-card-actions {
  padding-top: 18px;
}
.badge-list-wrap {
  width: 100%;
  max-width: 360px;
  background-color: #fff;
  margin: 0 auto;
}
.demo-icon-badge {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.demo-badge-content {
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;
}
input:disabled {
  color: aliceblue;
  opacity: 0.8;
  cursor: not-allowed;
}
.toTop {
  position: fixed;
  z-index: 2;
  right: 16px;
  bottom: 60px;
  z-index: 1501;
}
.mu-card1 >>> .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  padding: 8px 3px 15px 3px;
}
@media screen and (max-width: 600px) {
  .mu-card1 {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

