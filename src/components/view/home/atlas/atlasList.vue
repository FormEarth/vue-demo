<template>
  <div
    v-if="!dataIsLoaded"
    style="width:100%;height:100%;padding-top:200px;"
    v-loading="initLoading"
    data-mu-loading-text="数据正在加载中……"
    @click="loadInitData"
  >
    <div v-show="!initLoading" style="text-align:center;">
      <span>数据加载失败，点击屏幕以重试</span>
      <br />
      <mu-icon size="56" value="refresh" color="blue100"></mu-icon>
    </div>
  </div>
  <div v-else class="demo-container">
    <van-list
      v-model="loading"
      :finished="loadedAll"
      :immediate-check="false"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="load"
      style="background-color:rgba(128, 128, 128, 0.5);"
    >
      <mu-sub-header style="background-color: white">图集推荐</mu-sub-header>
      <div v-for="(atlas,index) in atlases" :key="atlas.atlasId">
        <atlas-item
          style="margin-bottom:3px;"
          :atlas="atlas"
          :arrayIndex="index"
          @remove="removeAtlasFromArray"
        ></atlas-item>
      </div>
    </van-list>
  </div>
</template>

<script>
import AtlasItem from "@/components/public/AtlasItem.vue";
export default {
  name: "AtlasList",
  props: {
    withUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 0,
      total: 0, //数据总条数
      loadedAll: false, //下拉加载数据时，数据是否已加载完毕
      loading: false, //上滑加载更多时是否在加载状态
      refreshing: false, //下拉更新时是否在加载状态
      atlases: [], //图集列表数据
      refreshTime: "", //初始化加载数据的时间，下次加载时上送
      initLoading: false, //初始化是否显示加载遮罩层
      dataIsLoaded: false, //初始化请求页面是否成功
      error: false,
      scroll: 0
    };
  },
  created() {
    //图集初始化加载
    this.loadInitData();
  },
  //keep-alive页面进入触发
  activated() {
    document.querySelector(".right-panel").scrollTo(0, this.scroll);
    document
      .querySelector(".right-panel")
      .addEventListener("scroll", this.handleScroll);
  },
  //keep-alive页面销毁触发
  deactivated() {
    document
      .querySelector(".right-panel")
      .removeEventListener("scroll", this.handleScroll);
  },
  components: {
    "atlas-item": AtlasItem
  },
  methods: {
    handleScroll() {
      let scrollTo = document.querySelector(".right-panel").scrollTop;
      // console.log("scrollTop:" + scrollTo);
      this.scroll = scrollTo;
    },
    //初始化数据加载
    loadInitData() {
      this.initLoading = true;
      this.$http.atlas
        .queryAllAtlas(
          this.currentPage,
          this.withUser,
          this.$route.params.userId
        )
        .then(response => {
          if (response.data.code == "2000") {
            console.log(response.data);
            this.atlases = response.data.data.atlases;
            this.total = response.data.data.total;
            this.refreshTime = response.data.time;
            this.dataIsLoaded = true;
            if (this.atlases.length >= this.total) {
              this.loadedAll = true;
            }
          } else {
            this.initLoading = false;
          }
        })
        .catch(error => {
          this.initLoading = false;
        });
    },
    //顶部下拉更新数据
    refresh() {
      this.refreshing = true;
      let refreshMessage = "";
      this.$http.atlas
        .queryLastedAtlas(this.refreshTime)
        .then(response => {
          if (response.data.code == "2000") {
            let atlasArray = response.data.data.atlases;
            if (atlasArray.length == 0) {
              refreshMessage = "暂时没有更多内容了哦";
            } else {
              refreshMessage = "为您更新了" + atlasArray.length + "条数据";
              //数据已经按照时间排序，需要从尾部遍历
              for (let i = atlasArray.length - 1; i >= 0; i--) {
                this.atlases.unshift(response.data.data.atlases[i]);
              }
              this.refreshTime = response.data.time; //每次刷新成功都更新下最新的刷新时间
            }
            //头部提示
            this.$notify({
              message: refreshMessage,
              duration: 3000,
              background: "#2196f3"
            });
            this.refreshing = false;
          }
        })
        .catch(error => {
          this.refreshing = false;
        });
    },
    //滑到底部时加载数据
    load() {
      this.currentPage = this.currentPage + 1;
      console.log("当前加载页数：" + this.currentPage);
      this.loading = true;
      //图集分页加载
      this.$http.atlas
        .queryAllAtlas(
          this.currentPage,
          this.withUser,
          this.$route.params.userId
        )
        .then(response => {
          if (response.data.code == "2000") {
            if (response.data.data.atlases.length == 0) {
              this.loadedAll = true;
            }
            for (let i = 0; i < response.data.data.atlases.length; i++) {
              this.atlases.push(response.data.data.atlases[i]);
            }
            if (this.atlases.length >= this.total) {
              this.loadedAll = true;
            }
            this.loading = false;
          } else {
            this.loading = false;
            this.error = true;
            this.currentPage = this.currentPage - 1;
          }
        })
        .catch(error => {
          this.loading = false;
          this.error = true;
          this.currentPage = this.currentPage - 1;
        });
    },
    //将图集从数组中移除
    removeAtlasFromArray(index) {
      console.log("移除了：" + index);
      this.atlases.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.mu-list {
  padding-bottom: 0;
}
@media screen and (min-width: 800px) {
  /* .demo-container {
    padding: 10px 16%;
  } */
}
@media screen and (max-width: 600px) {
  .demo-container {
    padding-bottom: 56px;
  }
}
</style>