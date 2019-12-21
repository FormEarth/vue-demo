<template>
  <mu-container>
    <div class="dynamic-imgs">
      <p class="img-title">图片暂时无法修改或调整</p>
      <div class="table-list">
        <!-- 显示图片 -->
        <div class="img-div" v-for="(img,index) in atlas.atlasPictures" :key="index">
          <!-- <div class="delete">
            <mu-icon value="clear" color="white" size="20" @click="deleteImg(index)"></mu-icon>
          </div>-->
          <img class="img-content" :src="img" />
        </div>
        <!-- 这里就是那个加号图片，isAddImg控制是否显示 -->
        <!-- <div class="add-div" v-show="isAddImg">
          <label for="upload" class="label-upload">
            <mu-icon value="add" size="36" color="primary" style="margin-top: 26px;"></mu-icon>
          </label>
          <input
            id="upload"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            multiple
            @change="addFile($event)"
            style="display: none;"
          />
        </div>-->
      </div>
    </div>
    <div class="dynamic-imgs" style="padding-bottom:15px;">
      <p class="img-title">修改描述</p>
      <mu-text-field
        v-model="atlas.atlasContent[atlas.atlasContent.length-1]"
        :rows="2"
        :rowsMax="20"
        max-length="255"
        full-width
        multi-line
        placeholder="文字描述（可选）"
        solo
      ></mu-text-field>
      <!-- <div v-if="atlas.atlasContent[0].length>=255" style="text-align:center;color:red;">字数已达上限</div> -->
    </div>
    <div class="dynamic-imgs">
      <p class="img-title">修改标签</p>
      <div>
        <demo-tag
          v-for="(tag,index) in atlas.atlasTags"
          :key="index"
          optional
          @deleteTag="atlas.atlasTags.splice(index,1)"
        >{{tag.tagText}}</demo-tag>
        <div v-show="!searchPanel">
          <mu-icon value="add" color="success" @click="searchPanel=true;"></mu-icon>
        </div>
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
              :disabled="atlas.atlasTags.length>=10"
              small
              flat
              @click="addAtlasTags({tagId:-1,tagText:searchText})"
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
              :disabled="atlas.atlasTags.length>=10"
              @click="addAtlasTags(tag)"
            >添加</mu-button>
          </div>
          <!-- <mu-divider></mu-divider> -->
        </div>
        <div style="text-align:right;">
          <span v-show="atlas.atlasTags.length>=10" style="color:gray;font-size:12px;">标签不能更多了哦</span>
          <mu-button
            small
            flat
            color="success"
            @click="searchPanel=false;searchText='';tags=initTags;"
          >完成</mu-button>
        </div>
      </div>
    </div>
    <div class="dynamic-imgs">
      <div class="flex-content">
        <div>允许评论</div>
        <mu-switch v-model="atlas.comment" :ripple="false"></mu-switch>
      </div>
      <div class="flex-content">
        <div>仅自己可见</div>
        <mu-switch v-model="atlas.personal" :ripple="false"></mu-switch>
      </div>
    </div>
    <div class="dynamic-imgs">
      <mu-button color="info" full-width :disabled="!allowSubmit" @click="editAtlas">编辑完成</mu-button>
      <p class="img-title">当下即是最好的历史，你无法编辑过去，正如你无法改变它</p>
    </div>
    <mu-dialog
      width="600"
      max-width="80%"
      title="修改成功"
      transition="slide-left"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="releaseSucessDialog"
    >
      您的修改已生效
      <mu-button slot="actions" color="primary" flat @click="goNewArticle">查看文章</mu-button>
      <!-- </div> -->
    </mu-dialog>
  </mu-container>
</template>
<script>
export default {
  name: "AtlasEdit", //图集编辑
  data() {
    return {
      searchText: "", //tag搜素输入的内容
      searchPanel: false, //tag搜索区域的开合标识
      isSelectImg: false, //开启弹窗标志
      releaseSucessDialog: false, //发送弹框是否打开
      atlas: {
        atlasPictures: [], //存放添加图片
        atlasContent: [],
        comment: true, //允许评论
        atlasTags: [],
        personal: false //仅自己可见
      },
      initTags: [], //初始化加载的推荐tags数组，即在输入框为空时显示的列表
      initAtlasContent: "", //初始化的图集，用来做对比
      tags: ["日记", "原创", "123", "2333"]
    };
  },
  created() {
    //初始化热门标签
    this.searchTagsWithText(true);
    //初始化数据
    this.$http.atlas
      .queryAtlasById(this.$route.params.atlasId)
      .then(response => {
        if (response.data.code == "2000") {
          this.atlas = response.data.data.atlas;
          let length = this.atlas.atlasContent.length;
          this.initAtlasContent = this.atlas.atlasContent[length - 1];
          if (this.atlas.atlasTags == null) {
            this.atlas.atlasTags = [];
          }
        } else {
        }
      })
      .catch(error => {});
  },
  computed: {
    allowSubmit() {
      var length = this.atlas.atlasContent.length;
      //   console.log(length)
      //   console.log(this.atlas.atlasContent[length - 1]);
      //   console.log(
      //     this.atlas.atlasContent[length - 1] ==
      //       this.initAtlas.atlasContent[length - 1]
      //   );
      //图片为空时文字不能为空
      if (
        this.atlas.atlasPictures.length == 0 &&
        this.atlas.atlasContent[length - 1] == ""
      ) {
        return false;
      }
      if (this.atlas.atlasContent[length - 1] == this.initAtlasContent) {
        return false;
      }
      return true;
    }
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
    addAtlasTags(tag) {
      console.log(tag.tagId);
      this.atlas.atlasTags.push({ tagId: tag.tagId, tagText: tag.tagText });
    },
    // 去查看新写的文章
    goNewArticle() {
      this.releaseSucessDialog = false;
      this.$router.replace("/atlas/detail/" + this.$route.params.atlasId);
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
    },
    //编辑图集
    editAtlas() {
      //   let content = this.atlas.atlasContent
      //   this.atlas.atlasContent = null
      //   this.atlas.content = content
      this.$http.atlas.modifyAtlas(this.atlas).then(response => {
        if (response.data.code == "2000") {
          this.releaseSucessDialog = true
        } else {
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  /* max-width: 500px; */
  min-width: 350px;
}
.mu-form-item-label {
  padding-right: 0px;
}
.dynamic-imgs {
  box-sizing: border-box;
  /* min-height: 152px; */
  width: 100%;
  background-color: #ffffff;
  padding: 5px 15px 5px 15px;
  margin-bottom: 6.5px;
}
.img-title {
  margin-bottom: 12px;
  font-size: 14px;
  /* color: #666666; */
  letter-spacing: 0.16px;
}
.table-list {
  /* width: 100%; */
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
}
.img-content {
  height: 100%;
  width: 100%;
  object-fit: cover;
  /* margin-left: 5px;
  margin-bottom: 5px; */
}
.add-div {
  width: 96px;
  height: 96px;
  margin-left: 5px;
  text-align: center;
  border: 3px dashed rgb(172, 172, 171);
}
.img-div {
  width: 96px;
  height: 96px;
  margin-left: 5px;
  margin-bottom: 5px;
  position: relative;
}
a {
  color: #2979ff;
}
.flex-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  letter-spacing: 0.16px;
}
.label-upload:hover {
  cursor: pointer;
}
@media screen and (min-width: 993px) {
  .container {
    padding: 10px 10%;
  }
}
</style>

