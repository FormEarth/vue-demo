<template>
  <div>
    <!-- 已选标签展示 -->
    <div>
      <demo-tag
        v-for="(tag,index) in selectTags"
        :key="index"
        optional
        @deleteTag="selectTags.splice(index,1)"
      >{{tag.tagText}}</demo-tag>
      <mu-icon
        :value="searchPanel?'close':'add'"
        color="success"
        @click="searchPanel=!searchPanel;"
      ></mu-icon>
    </div>
    <div v-show="searchPanel">
      <demo-input
        v-model.trim="searchText"
        placeholder="搜索或自定义标签（可选）"
        max="10"
        @input="searchTags"
        style="margin-bottom:4px;"
      ></demo-input>
      <div v-show="tags.length==0" style="display:flex;justify-content: space-between;">
        <div>
          <demo-tag>{{searchText}}</demo-tag>
        </div>
        <div>
          <mu-button
            color="info"
            small
            flat
            :disabled="selectTags.length>=10"
            @click="addNewTags({tagId:-1,tagText:searchText})"
          >添加新标签</mu-button>
        </div>
      </div>
      <div v-show="!searchText" style="margin-bottom:4px;color:gray;font-size:12px;">最近的热门标签</div>
      <div
        v-for="(tag,index) in tags"
        :key="index"
        style="display:flex;justify-content: space-between;"
      >
        <div>
          <demo-tag :color="tag.tagColor">{{tag.tagText}}</demo-tag>
        </div>
        <div>
          <mu-button
            small
            flat
            color="primary"
            :disabled="selectTags.length>=10"
            @click="addNewTags(tag)"
          >添加</mu-button>
        </div>
        <!-- <mu-divider></mu-divider> -->
      </div>
      <div style="text-align:right;">
        <span
          v-show="selectTags.length>=10"
          style="color:rgba(0,0,0,0.38);font-size:12px;"
        >标签最多只有10个哦</span>
        <mu-button
          small
          flat
          color="success"
          @click="searchPanel=false;searchText='';tags=initTags;"
        >完成</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoTagSelect", //标签选取组件
  created() {
    this.searchTagsWithText(true);
  },
  props: {
    //已选标签，使用:selectTags.sync进行绑定
    selectTags: {
      type: Array
    }
  },
  data() {
    return {
      initTags: [], //初始化的使用最多的标签
      tags: [], //模糊查询服务端返回的标签
      searchText: "", //tag搜素输入的内容
      searchPanel: false //tag搜索区域的开合标识
    };
  },
  methods: {
    //输入内容改变时，请求服务端进行模糊搜索
    searchTags() {
      console.log("触发了搜索");
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.searchText) {
        this.timer = setTimeout(() => {
          this.searchTagsWithText(false);
        }, 500);
      } else {
        // 输入框中的内容被删为空时触发，此时会展示页面初始化加载的搜索结果
        this.tags = this.initTags;
      }
    },
    //点击列表中的某项后将该标签加入输入框
    addNewTags(tag) {
      console.log(tag.tagId);
      this.selectTags.push({ tagId: tag.tagId, tagText: tag.tagText });
    },
    //请求服务端模糊查询标签
    searchTagsWithText(isInit) {
      this.$http.tag
        .queryTagsByText(this.searchText)
        .then(response => {
          if (response.data.code == "2000") {
            this.tags = response.data.data.tags;
            //初始化加载进行缓存
            if (isInit) {
              this.initTags = this.tags;
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.mu-icon {
  vertical-align: middle;
  /* float: right; */
}
</style>