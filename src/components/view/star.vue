<template>
  <div class="star">
    <recommend-user-list></recommend-user-list>
  </div>
</template>
<script>
import RecommendUserList from "@/components/public/user/RecommendUserList.vue";
export default {
  name: "star",
  data() {
    return {
    };
  },
  // mounted() {
  //   // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
  //   window.history.pushState(null, null, document.URL);
  //   // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
  //   window.addEventListener("popstate", this.onBrowserBack, false);
  // },
  // destroyed() {
  //   // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
  //   window.removeEventListener("popstate", this.onBrowserBack, false);
  // },
  // watch: {
  //   // 弹框监听，当弹框显示的时候，pushState添加一个历史，供返回键使用
  //   PopupShow: {
  //     handler(newVal, oldVal) {
  //       if (newVal.Terms === true) {
  //         window.history.pushState(null, null, document.URL);
  //       }
  //     },
  //     deep: true
  //   }
  // },
  //created()是一个函数
  created() {
    // articles().then(response => {
    //       const articles = response.data.data
    //       this.articles = articles
    //     });
  },
  methods: {
  },
  components:{
    RecommendUserList
  }
};
</script>
<style scoped>
.star{
  background-color: transparent;
}
</style>