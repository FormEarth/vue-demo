<template>
  <div class="search-icon">
    <mu-icon class="middle" value="search" color="white" size="30" @click="showSearch"></mu-icon>
    <demo-transition type="lr">
      <div class="search-area" v-show="open">
        <!-- <div class="search-appbar"> -->
        <!-- <mu-icon class="middle" value="close" color="white" size="30" @click="closeEvent"></mu-icon> -->
        <span class="cancel" @click="hideSearch">取消</span>
        <input name id type="text" class="search-box" v-model="search_txt" placeholder="输入搜索内容" />
        <mu-icon class="middle" value="search" color="white" size="30"></mu-icon>
      </div>
    </demo-transition>
  </div>
</template>

<script>
export default {
  name: "SearchIcon", //搜索组件
  data() {
    return {
      open: false,
      search_txt: ""
    };
  },
  methods: {
    showSearch() {
      this.open = true;
    },
    hideSearch() {
      this.open = false;
    }
  }
};
</script>

<style scoped>
.search-area {
  position: fixed;
  top: 0;
  /* left: 0; */
  /* right: 0; */
  width: 100%;
  z-index: 100;
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