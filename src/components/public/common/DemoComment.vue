<template>
  <div>
    <div class="comment">
        {{comment.userId}}&nbsp;&nbsp;{{comment.commentTime}}<br>
        {{comment.commentContent}}
    </div>
    <div class="replay-comment" v-for="reply in comment.replies" :key="reply.replyId">
        <div v-if="comment.commentId==reply.replyCommentId">
            {{reply.replyFromUserId}}&nbsp;&nbsp;{{reply.replyTime}}<br>
            :{{reply.replyContent}} <a>回复</a>
        </div>
        <div v-else>
            {{reply.replyFormUserId}}回复{{reply.replyToUserId}}:{{reply.replyContent}}:{{reply.replyContent}}<a>回复</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  //评论组件
  name: "DemoComment",
  props: {
    //评论对象
    comment: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped>
.replay-comment {
  margin-left: 20px;
  border-left: 3px #5db2ff solid;
}
</style>