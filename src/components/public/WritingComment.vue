<template>
  <div class="root-node">
    <div class="input-box">
      <div style="color: #aaa;font-size: 15px;letter-spacing: .1em;margin-bottom:10px;">发表新评论</div>
      <mu-text-field
        v-model="comment"
        :rows="1"
        :rowsMax="20"
        full-width
        multi-line
        :placeholder="isLogin?'评论一下吧':'登陆后可发表评论'"
        :action-icon="'send'"
        :disabled="!isLogin"
        :action-click="sendComment"
        solo
      ></mu-text-field>
    </div>
    <div v-if="comments.length<1" style="color:gray;text-align:center;padding:15px 0">
      暂时还没有评论哦
    </div>
    <div v-else v-for="comment in comments" :key="comment.commentId">
      <user-avatar
        :avatar="comment.avatar"
        :userId="comment.userId"
        :userName="comment.userName"
        :extraInfo="comment.commentTime"
      >
        <span class="level-block" v-if="userId==comment.userId">作者</span>
      </user-avatar>
      <div class="comment-area">
        <span class="comment-content">{{comment.commentContent}}</span>
      </div>
      <div class="reply-area">
        <span v-if="user.userId==comment.userId">删除评论</span>
        &nbsp;0
        &nbsp;<mu-icon value="thumb_up" size="14"></mu-icon>
        &nbsp;{{comment.replyCount>0?comment.replyCount+'回复':''}}
        &nbsp;回复
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/public/user/UserAvatar";
export default {
  props: {
    writingId: {
      type: String
    },
    userId: {
      type: Number
    }
  },
  name: "WritingComment", //评论回复组件
  data() {
    return {
      comment: "", //新评论
      loadding: true, //是否处于加载状态
      comments: [] //评论数组
    };
  },
  // 初始化加载数据
    created() {
      this.$http.article.getCommentsByWritingId(this.writingId).then(response => {
        if (response.data.code == "2000") {
          this.comments = response.data.data.comments;
        }
      });
    },
  computed:{
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    user: function() {
      return this.$store.state.current_user;
    }
  },
  components: {
    UserAvatar
  },
  //tips:filters中无法直接使用this对象
  filters: {
    isCreator: function(value, userId) {
      return userId == value ? "作者" : "";
    }
  },
  methods: {
    sendComment() {
      console.log("----------"+this.comment)
      if(this.comment==''){
        this.$demo_notify("请输入评论内容");
        return
      }
      let that = this
      this.$http.article.addComment({
          writingId: this.writingId,
          commentContent: this.comment
        }).then(response => {
          this.comments.push({
            articleId: that.writingId,
            avatar: that.user.avatar,
            commentContent: that.comment,
            commentId: response.data.data.commentId,
            commentTime: response.data.time,
            replies: [],
            userId: that.user.userId,
            userName: that.user.userName
          });
          that.comment = "";
          if (response.data.code == "2000") {
            this.$demo_notify("评论成功");
          }
        });
    }
  }
};
</script>

<style scoped>
.input-box {
  margin-bottom: 6px;
}
.comment-area {
  /* padding-left: 44px; */
}
.level-block {
  vertical-align: middle;
  letter-spacing: 0.2em;
  border-radius: 3px;
  font-family: "Times New Roman";
  margin-left: 0.25em;
  padding: 0.1em;
  font-size: 10px;
  color: white;
  background-color: hsl(240, 75%, 58%);
}
.comment-content {
  margin-left: 44px;
  background-color: rgb(184, 235, 133);
  padding: 5px 8px;
  display: inline-block;
  border-radius: 4px;
  position: relative;
  word-break: break-all;
  white-space: pre-wrap;
}
.comment-content::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid rgb(184, 235, 133);
  position: absolute;
  top: 6px;
  left: -16px;
}
.material-icons {
  vertical-align: text-top;
  cursor: pointer;
}
.reply-area {
  text-align: right;
}
.mu-input {
  background-color: #f4f6fb;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  padding-left: 8px;
  padding-bottom: 0;
  min-height: 40px;
}
.input-box >>> .mu-text-field-input{
  background-color: #f4f6fb;
}
</style>