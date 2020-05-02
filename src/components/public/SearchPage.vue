<template>
  <div class="search-page">
    <div class="search-appbar">
      <!-- <mu-icon class="middle" value="close" color="white" size="30" @click="closeEvent"></mu-icon> -->
      <span class="cancel" @click="closeEvent">取消</span>
      <input name id type="text" class="search-box" v-model="search_txt" placeholder="输入搜索内容" />
      <mu-icon class="middle" value="search" color="white" size="30" @click="goSearch"></mu-icon>
    </div>
    <div style="padding: 12px;">
      <van-panel title="热门标签">
        <demo-tag>日记</demo-tag>
        <demo-tag>标题一</demo-tag>
        <br />
        <div class="hot-search">标题一</div>
        <div class="hot-search">标题一</div>
        <br />
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage", //搜索组件,
  data() {
    return {
      search_txt: ""
    };
  },
  methods: {
    closeEvent() {
      this.$emit("close");
    },
    goSearch() {}
  }
};
</script>

<style scoped>
.search-appbar {
  height: 60px;
  line-height: 60px;
  background-color: #0066cc;
  padding: 0 15px;
}
.cancel {
  color: white;
}
.middle {
  vertical-align: middle;
}
.search-box {
  margin-left: 10px;
  height: 32px;
  outline: 0;
  border: none;
  border-radius: 100px;
  color: black;
  font-size: 16px;
  padding: 0 15px;
  min-width: 300px;
  transition: all 0.5s ease-in-out;
}
.search-box:focus {
  min-width: 450px;
}
</style>