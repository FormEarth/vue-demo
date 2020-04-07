<template>
  <mu-container>
    <div
      v-if="!dataIsLoaded"
      style="position:fixed;width:100%;height:100%;text-align:center;"
      v-loading="loading"
      data-mu-loading-text="数据正在加载中……"
      @click="loadData"
    >
      <div v-show="!loading" style="text-align:center;">
        <span>数据加载失败，点击屏幕以重试</span>
        <br />
        <mu-icon size="56" value="refresh" color="blue100"></mu-icon>
      </div>
    </div>
    <div v-else class="writing-area">
      <div class="atlas-item-header">
        <div style="display:flex;">
          <div
            class="header-left"
            style="cursor: pointer;"
            @click="$router.push('/'+atlas.user.userId+'/homepage')"
          >
            <img v-lazy="atlas.user.avatar" />
          </div>
          <div class="header-center">
            <div class="header-username">
              <span>{{atlas.user.userName}}</span>
              <!-- <span class="follow-button">关注</span> -->
            </div>
            <div style="height:23px;line-height:16px;padding-top:2px;">
              上海市 松江区&nbsp;来自demooo网页版
              <!-- {{atlas.sendTime|time}} -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="atlas.type==1" class="article-area">
        <div
          v-if="atlas.frontCover==null||atlas.frontCover==''"
          class="article-title"
        >{{atlas.title}}</div>
        <mu-card-media :title="atlas.title" v-else>
          <img :src="atlas.frontCover" style="height:250px;width:100%;object-fit:cover;" />
        </mu-card-media>
        <div style="display:flex;justify-content:space-between;height:30px;margin:5px 0 9px 0">
          <div style="margin-top:6px;">发布于&nbsp;&nbsp;{{atlas.sendTime}}</div>
          <div style="margin-top:6px;text-align:right;padding-right:10px;">{{atlas.pageview}} 阅读</div>
        </div>
        <div style="padding:5px 10px 5px 10px;">
          <demo-tag v-for="(tag,index) in atlas.tags" :key="index">{{tag.tagText}}</demo-tag>
        </div>
        <article-vditor :editable=false :initMarkdown="atlas.content"></article-vditor>
      </div>
      <div v-else-if="atlas.type==2" class="atlas-area">
        <demo-atlas-view :images="atlas.atlasPictures" :identical="atlas.identical"></demo-atlas-view>
        <div v-if="atlas.atlasPictures.length>0">
          <demo-tag v-show="atlas.personal" color="red" small>仅自己可见</demo-tag>
          <demo-tag v-for="tag in atlas.tags" :key="tag.tagId" ellipse>{{tag.tagText}}</demo-tag>
        </div>
        <div>
          <span class="atlas-content" v-show="atlas.content!=''" v-html="atlas.content"></span>
          <demo-tag
            v-show="atlas.atlasPictures.length==0"
            v-for="tag in atlas.tags"
            :key="tag.tagId"
            simple
          >{{tag.tagText}}</demo-tag>
        </div>
        <div class="small-text">
          发布于&nbsp;{{atlas.sendTime}}&nbsp;
          <mu-icon value="place" size="16"></mu-icon>上海 浦东<br>
          <span v-if="atlas.modified">已编辑&nbsp;&nbsp;最后编辑于·{{atlas.modifiedTime}}</span>
        </div>
      </div>
      <div style="display:flex;justify-content:center;padding-top:15px">
        <mu-button icon>
          <mu-icon value="thumb_up"></mu-icon>
        </mu-button>
        <mu-button icon>
          <mu-icon value="thumb_down"></mu-icon>
        </mu-button>
        <mu-button icon>
          <mu-icon value="favorite"></mu-icon>
        </mu-button>
      </div>
      <!-- <mu-divider></mu-divider> -->
      <div v-if="!atlas.comment" style="text-align:center;font-size:16px;padding-top:5px;">
        <!-- <mu-icon value="speaker_notes_off"></mu-icon> -->
        评论已被作者关闭
      </div>
      <div v-else id="comment-box" name='comment-box' ref="comment-box">
        <writing-comment :writingId="atlas.writingId" :userId="atlas.user.userId"></writing-comment>
        <!-- <div style="color: #aaa;font-size: 15px;letter-spacing: .1em;margin-bottom:10px;">发表新评论</div>
        <demo-input placeholder="添加评论" v-model="comment" />
        <div style="margin-top:10px;">
          <input
            :disabled="comment.length==0"
            type="submit"
            value="提交"
            style="border:none;width:100%;background-color:#5db2ff;height:30px;"
            @click="commentWriting"
          />
        </div>
        <div v-for="(comment,index) in comments" :key="comment.commentId" style="margin-top:10px;">
          <demo-comment
            :comment="comment"
            :commentIndex="index"
            :articleUserId="atlas.user.userId"
            :activeCommentId="activeCommentId"
            @func="changeActiveCommentId"
            @removeComment="removeCommentByIndex"
          ></demo-comment>
        </div>-->
      </div>
      <!-- <mu-divider></mu-divider> -->
      <!-- <div style="text-align:center;padding-top:5px;">作品由作者发布于本平台，版权属作者所有，该作不代表本站观点，若有侵权，请联系管理员</div> -->
    </div>
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
          <mu-list-item-title>广告、不健康信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>其他</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </mu-container>
</template>
<script>
import ArticleContent from "@/components/public/ArticleContent";
import WritingComment from "@/components/public/WritingComment";
import ArticleVditor from "@/components/public/ArticleVditor.vue"; 
import { ImagePreview } from "vant";
export default {
  name: "writing",
  data() {
    return {
      current: 0,
      picture: require("@/assets/images/carousel1.jpg"),
      picture1: require("@/assets/images/404.jpg"),
      star: true,
      open: false,
      atlas: {},
      comment: "",
      loading: true, //是否显示加载遮罩层
      dataIsLoaded: false,
      //评论数组
      comments: [],
      //要回复的评论的评论id
      activeCommentId: "-1"
    };
  },
  created() {
    this.loadData();
  },
  // 锚点跳转
  mounted() {
  },
  computed: {
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  components: {
    ArticleContent,
    WritingComment,
    ArticleVditor
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$http.writing
        .queryWritingById(this.$route.params.writingId,'view')
        .then(response => {
          if (response.data.code == "2000") {
            this.atlas = response.data.data.atlas;
            this.comments = response.data.data.comments;
            this.dataIsLoaded = true;
          } else {
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    staratlas() {
      console.log(this.star);
      if (this.star) {
        this.star = false;
        this.$toast.success("取消收藏成功");
        //Toast.success('取消收藏成功')
      } else {
        this.star = true;
        this.$toast.success("收藏成功");
      }
    },
    opeanToast() {
      console.log("looooogggggggggggggggggg");
      Toast.success("收藏成功");
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    onChange(index) {
      this.current = index;
    },
    goInfo() {
      this.$router.push("/" + this.atlas.user.userId + "/homepage");
    },
    showImagePreview(position) {
      const images = this.atlas.atlasPictures;
      const instance = ImagePreview({
        images,
        startPosition: typeof position === "number" ? position : 0
      });
    },
    changeActiveCommentId(commentId) {
      this.activeCommentId = commentId;
    },
    //根据索引，移除comments数组元素
    removeCommentByIndex(index) {
      this.comments.splice(index, 1);
    },
    //添加评论
    commentWriting() {
      this.$http.article
        .addComment({
          writingId: this.atlas.writingId,
          commentContent: this.comment
        })
        .then(response => {
          this.comments.push({
            articleId: this.atlas.writingId,
            avatar: this.atlas.user.avatar,
            commentContent: this.comment,
            commentId: response.data.data.commentId,
            commentTime: response.data.time,
            replies: [],
            userId: this.atlas.user.userId,
            userName: this.atlas.user.userName
          });
          this.comment = "";
          if (response.data.code == "2000") {
            this.replyContent = "";
            this.$emit("func", 0);
            // 轻提示弹框
            this.$demo_notify("评论成功");
          }
        });
    }
  }
};
</script>
<style scoped>
.van-swipe-item img {
  max-width: 100%;
  max-height: 100%;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
  /* max-width: 500px; */
  /* min-width: 350px; */
}
.atlas-item-header {
  display: flex;
  justify-content: space-between;
  height: 46px;
  padding: 2px 2px;
  /* background-color: rgb(160, 248, 186); */
  margin-bottom: 6px;
}
.header-center {
  /* display: flex;
  flex-direction: column; */
  /* width: 60%; */
  padding-left: 4px;
  font-size: 10px;
}
.header-right {
  /* width: 30%; */
  text-align: right;
}
.header-left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-username {
  font-family: 方正隶变简体, "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  height: 23px;
  font-size: 16px;
  line-height: 15px;
  padding-top: 5px;
  color: red;
}
.mu-card-text {
  padding: 0px 10px 0px 10px;
}
.mu-card-actions {
  padding-top: 18px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.1);
}
.img-container {
  display: flex; /* 弹性布局 */
  flex-wrap: wrap; /* 换行 */
  /* border:solid 1px black; */
  /* margin-left:3%; */
  padding-left: 6%;
}
.img-container .img-item {
  width: 30%;
  height: 28vw;
  /* border:solid 1px black; */
  margin: 0px 5px 5px 0px;
  max-height: 143px;
  min-height: 100px;
  /* text-align: center; */
  overflow: hidden;
}
.img-container .img-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.atlas-content {
  white-space: pre-wrap;
  /* padding: 0 5px; */
}
.small-text {
  margin-top: 5px;
  /* padding-left: 5px; */
  font-size: 12px;
  color: gray;
}
.article-title {
  padding-top: 3px;
  padding-left: 10px;
  font-size: 20px;
}
.writing-area {
  background-color: #fff;
  padding: 10px 20px;
}
.article-area >>> .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  padding: 8px 3px 15px 3px;
}
.article-area >>> .v-note-wrapper {
  z-index: 1;
}
@media screen and (max-width: 768px) {
  .writing-area {
    padding: 10px;
  }
}
/* 1 3 1 1 3 1 1 3 1 */
/* 1 2 2 1 */
</style>