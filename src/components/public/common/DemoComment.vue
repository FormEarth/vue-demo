<template>
  <div>
    <div class="comment">
      <div class="header">
        <div>
          <img class="comment-avatar" :src="comment.avatar" :alt="comment.userId" />
          <div style="display:inline-block">
            <span>{{comment.userName}}</span>
            <demo-tag v-show="comment.userId==articleUserId">作者</demo-tag>
            <br />
            <span style="font-size:12px;color:darkgray;">{{comment.commentTime}}</span>
          </div>
        </div>
        <div>#{{commentIndex}}楼</div>
      </div>
      <div class="comment-content">
        {{comment.commentContent}}
        <div style="white-space:nowrap;">
          <a v-show="activeCommentId==comment.commentId+''" @click="changeCommentForm('0')">取消回复</a>&nbsp;
          <a v-if="user.userId==comment.userId"  @click="showAlertDialog('comment',0,0)">删除评论</a>
          <a v-else @click="changeCommentForm(comment.commentId+'')">回复</a>
        </div>
      </div>
      <!-- 这个地方的判断有点问题，commentId和replyId在不同的表里，有可能相同 -->
      <div
        v-show="activeCommentId==comment.commentId+''"
        class="reply-form"
        style="padding-left:40px;"
      >
        <demo-input :placeholder="'回复@'+comment.userName" v-model="replyContent" />
        <div style="margin-top:10px;">
          <input
            :disabled="replyContent.length==0"
            type="submit"
            value="回复"
            @click="replyComment(comment.userId,comment.userName)"
            style="border:none;width:100%;background-color:#5db2ff;height:30px;"
          />
        </div>
      </div>
    </div>
    <!-- 以下是回复部分！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ -->
    <div class="reply-comment" v-for="(reply,index) in replies" :key="index">
      <div style="display:inline-block">
        <img class="reply-avatar" :src="reply.replyFromAvatar" />
        <span>{{reply.replyFromUserName}} 回复@{{reply.replyToUserName}}</span>
        <span style="font-size:12px;color:darkgray;">{{reply.replyTime}}</span>
      </div>
      <div class="reply-content">
        {{reply.replyContent}}
        <div style="white-space:nowrap;">
          <a
            v-show="activeCommentId==comment.commentId+''+reply.replyId"
            @click="changeCommentForm('0')"
          >取消回复</a>&nbsp;
          <a
            v-if="user.userId==reply.replyFromUserId"
            @click="showAlertDialog('reply',index,reply.replyId)"
          >删除回复</a>
          <a v-else @click="changeCommentForm(comment.commentId+''+reply.replyId)">回复</a>
        </div>
      </div>
      <!-- //TODO 因为这里commentId和replyId有重复的可能，所以+''了一下，但是还是有重复的可能 -->
      <div
        v-show="activeCommentId==comment.commentId+''+reply.replyId"
        class="reply-form"
        style="padding-left:20px;"
      >
        <demo-input :placeholder="'回复@'+reply.replyFromUserName" v-model="replyContent" />
        <div style="margin-top:10px;">
          <input
            :disabled="replyContent.length==0"
            type="submit"
            value="回复"
            @click="replyComment(reply.replyFromUserId,reply.replyFromUserName)"
            style="border:none;width:100%;background-color:#5db2ff;height:30px;"
          />
        </div>
      </div>
    </div>
      <mu-dialog
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="showDialog"
        transition="slide-left"
      >
        确定要删除该评论吗？删除后将无法撤销
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="deleteCommentOrReply()">确认</mu-button>
      </mu-dialog>
  </div>
</template>

<script>
import util from "@/util/util";
import { Toast } from "vant";

export default {
  //评论组件
  name: "DemoComment",
  props: {
    //评论对象
    comment: {
      type: Object,
      default: {}
    },
    //索引，第几楼
    commentIndex: {
      type: Number,
      default: 0
    },
    articleUserId: {
      type: Number,
      default: 0
    },
    //显示哪个评论的回复表单
    activeCommentId: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      replies: this.comment.replies,
      //回复评论的内容
      replyContent: "",
      showDialog: false,
      flag: "",
      deleteReplyIndex:-1,
      deleteReplyId:-1,
    };
  },
  computed: {
    //已登录用户信息
    user: function() {
      return this.$store.state.current_user;
    }
  },
  filters: {
    time: function(value) {
      return util.dateSubtract(value);
    }
  },
  methods: {
    showAlertDialog(flag,index,id) {
      console.log("flag:"+flag)
      this.flag = flag
      this.deleteReplyIndex = index
      this.deleteReplyId = id
      this.showDialog = true
    },
    closeAlertDialog() {
      this.flag = "";
      this.showDialog = false
    },
    changeCommentForm(commentId) {
      console.log("点了下回复，commentId:" + commentId);
      this.$emit("func", commentId);
    },
    //执行删除操作
    deleteCommentOrReply() {
      if (this.flag == "comment") {
        this.$options.methods.deleteComment(this);
      } else if (this.flag == "reply") {
        this.$options.methods.deleteReply(this);
      }
    },
    //删除评论
    deleteComment(that) {
      that.$http.article.deleteCommentById(that.comment.commentId)
        .then(response => {
          if (response.data.code == "2000") {
            // that.$emit("func", '0');
            // 轻提示弹框
            Toast({
              message: "评论已成功删除",
              duration: 2000,
              forbidClick: true
            });
            that.$emit("removeComment", that.commentIndex);
          }
          // that.showDialog = false
        });
    },
    //删除回复
    deleteReply(that) {
      that.$http.article.deleteReplyById(that.deleteReplyId).then(response => {
        if (response.data.code == "2000") {
          // that.$emit("func", '0');
          // 轻提示弹框
          Toast({
            message: "回复已成功删除",
            duration: 2000,
            forbidClick: true
          });
          that.replies.splice(that.deleteReplyIndex, 1);
        }
        that.showDialog = false
      });
    },
    //新增回复
    replyComment(replyToUserId, replyToUserName) {
      this.$http.article
        .addReply({
          replyFromUserId: this.user.userId,
          replyToUserId: replyToUserId,
          replyCommentId: this.comment.commentId,
          replyContent: this.replyContent
        })
        .then(response => {
          if (response.data.code == "2000") {
            this.$emit("func", '0');
            // 轻提示弹框
            Toast({
              message: "回复成功",
              duration: 2000,
              forbidClick: true
            });
            //本地数组对象+1
            this.replies.push({
              replyFromUserId: this.user.userId,
              replyFromUserName: this.user.userName,
              replyFromAvatar: this.user.avatar,
              replyContent: this.replyContent,
              replyToUserName: replyToUserName,
              replyTime: response.data.time,
              replyId: response.data.data.replyId,
              replyCommentId: this.comment.commentId
            });
            this.replyContent = "";
          }
        });
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
}
.comment-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: text-bottom;
}
.reply-avatar {
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: text-bottom;
}
.comment-content {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 40px;
}
.reply-content {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  margin: 5px 0;
}
.reply-comment {
  margin: 0 0 10px 40px;
  border-left: 3px #5db2ff solid;
  padding-left: 5px;
}
input:disabled {
  color: aliceblue;
  opacity: 0.8;
  cursor: not-allowed;
}
</style>