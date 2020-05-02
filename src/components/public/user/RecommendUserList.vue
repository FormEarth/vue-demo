<template>
  <div class="recommend-user-list">
    <p>您可能感兴趣</p>
    <recommend-card v-for="(user,index) in users" :key="index" :user="user"></recommend-card>
    <div class="more">发现更多</div>
  </div>
</template>

<script>
import RecommendCard from "@/components/public/user/RecommendCard.vue";
export default {
  name: "RecommendUserList",
  data() {
    return {
      users: [
        {
          avatar:
            "http://127.0.0.1:9090/static/thumbnail/avatar/bd940c1f374a4111b5856fa7404d92f2.jpg",
          userName: "raining_heavily",
          sign: "something for nothing"
        },
        {
          avatar:
            "http://127.0.0.1:9090/static/thumbnail/avatar/bd940c1f374a4111b5856fa7404d92f2.jpg",
          userName: "raining_heavily",
          sign: "something for nothing"
        },
        {
          avatar:
            "http://127.0.0.1:9090/static/thumbnail/avatar/bd940c1f374a4111b5856fa7404d92f2.jpg",
          userName: "raining_heavily",
          sign: "something for nothing"
        }
      ]
    };
  },
  components: {
    RecommendCard
  }
};
</script>

<style scoped>
.recommend-user-list {
  background-color: aliceblue;
  padding: 10px;
  overflow-y: auto;
  white-space: nowrap;
}
p{
    margin-top: 0;
}
.more {
  display: inline;
}
</style>