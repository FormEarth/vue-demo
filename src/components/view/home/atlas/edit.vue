<template>
  <mu-container>
    <div class="dynamic-imgs">
      <div>
        <div style="display:inline-block;">
          <p class="img-title">添加图片({{altas.images.length}}/9)</p>
        </div>
        <div v-show="altas.images.length>1" style="display:inline-block;float:right;">
          <p class="delete-text" @click="deleteAll">全部删除</p>
        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- 清除浮动，否则float会对之后的布局产生影响 -->
      <div class="table-list">
        <!-- 显示图片 -->
        <div class="img-div" v-for="(img,index) in altas.images" :key="index">
          <div class="delete">
            <mu-icon value="clear" color="white" size="20" @click="deleteImg(index)"></mu-icon>
          </div>
          <img class="img-content" :src="getObjectURL(img)" />
        </div>
        <!-- 这里就是那个加号图片，isAddImg控制是否显示 -->
        <div class="add-div" v-show="isAddImg">
          <label for="upload" class="label-upload">
            <mu-icon value="add" size="36" color="primary" style="margin-top: 26px;"></mu-icon>
          </label>
          <input
            id="upload"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            multiple
            @change="addFile($event)"
            style="display: none;"
          />
        </div>
      </div>
    </div>
    <!-- TODO mu-select在手机端表现很糟糕 -->
    <div class="dynamic-imgs">
      <p class="img-title">添加标签</p>
      <mu-select
        multiple
        chips
        full-width
        filterable
        tags
        v-model="altas.atlasTags"
        help-text="选择标签，或者自定义标签"
      >
        <template slot="selection" slot-scope="scope">
          <demo-tag :selected="scope.selected">{{scope.label}}</demo-tag>
        </template>
        <mu-option v-for="tag in tags" :key="tag.tagId" :label="tag.tagText" :value="tag.tagText"></mu-option>
      </mu-select>
    </div>
    <div class="dynamic-imgs" style="padding-bottom:15px;">
      <p class="img-title">添加描述</p>
      <mu-text-field
        v-model="altas.atlasContent"
        :rows="2"
        :rowsMax="10"
        max-length="255"
        full-width
        multi-line
        placeholder="文字描述（可选）"
        solo
      ></mu-text-field>
      <div v-if="altas.atlasContent.length>=255" style="text-align:center;color:red;">字数已达上限</div>
      <!-- <div v-else style="text-align:right;">{{altas.atlasContent.length}}/255字</div> -->
    </div>
    <div class="dynamic-imgs">
      <div class="flex-content">
        <div>允许评论</div>
        <mu-switch v-model="altas.comment" :ripple="false"></mu-switch>
      </div>
      <div class="flex-content">
        <div>仅自己可见</div>
        <mu-switch v-model="altas.personal" :ripple="false"></mu-switch>
      </div>
    </div>
    <div class="dynamic-imgs">
      <mu-button
        color="info"
        full-width
        :disabled="altas.images.length<1"
        @click="createNewAltas"
      >发布</mu-button>
      <p class="img-title" style="color:#666666;">
        若您的图片尺寸一致(各图片的宽高比误差小于0.1),将启用轮播图模式，否则将使用预览模式，了解更多请点击
        <a href>这里</a>
      </p>
    </div>
  </mu-container>
</template>
<script>
import util from "@/util/util";
import { Toast } from "vant";
export default {
  name: "atlas-add",
  data() {
    return {
      isSelectImg: false, //开启弹窗标志
      autosize: { minheight: 50 },
      altas: {
        images: [], //存放添加图片
        atlasContent: "",
        comment: true, //允许评论
        atlasTags: [],
        personal: false //仅自己可见
      },
      tags: []
    };
  },
  created() {
    this.$http.tag.queryAllTags().then(response => {
      if (response.data.code == "2000") {
        this.tags = response.data.data.tags;
      }
    });
  },
  computed: {
    isAddImg() {
      //如果已经9张了，isAddImg为false，隐藏加号
      if (this.altas.images.length >= 9) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    addFile(event) {
      var fileList = event.target.files; // (利用console.log输出看file文件对象)
      console.log(this.altas.images.length + fileList.length);
      let allowNum = 0;
      //最多只能选择9张，超出的不要了
      if (this.altas.images.length + fileList.length > 9) {
        // 轻提示弹框
        Toast({
          message: "最多可选择9张图片",
          duration: 2000,
          forbidClick: true
        });
        allowNum = 9 - this.altas.images.length;
      } else {
        allowNum = fileList.length;
      }
      for (let i = 0; i < allowNum; i++) {
        this.altas.images.push(fileList[i]);
      }
    },
    //删除图片
    deleteImg(index) {
      this.altas.images.splice(index, 1); //删除起始下标为index，长度为1的一个值
    },
    //删除全部
    deleteAll() {
      this.altas.images = [];
    },
    //发布
    createNewAltas() {
      console.log("createNewAltas");
      let formData = new FormData();
      for (let i = 0; i < this.altas.images.length; i++) {
        formData.append("images", this.altas.images[i]);
      }
      formData.append("atlasContent", this.altas.atlasContent);
      formData.append("comment", this.altas.comment);
      formData.append("personal", this.altas.personal);
      for (let i = 0; i < this.altas.atlasTags.length; i++) {
        formData.append("atlasTags", this.altas.atlasTags[i]);
      }
      this.$http.atlas.createNewAltas(formData).then(response => {
        if (response.data.code == "2000") {
          // 轻提示弹框
          Toast({
            message: "发布成功",
            duration: 2000,
            forbidClick: true
          });
        }
      });
    },
    test() {
      console.log("test");
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
.imgUpload {
  height: 100vh;
  width: 100%;
  background: #f8f8f8;
  font-size: 14px;
  overflow-x: hidden;
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
.img-div .delete {
  width: 20px;
  height: 20px;
  background-color: #666666;
  color: white;
  position: absolute;
  top: 0;
  right: 0px;
}
a {
  color: #2979ff;
}
.delete-text {
  color: #ff0000;
  cursor: pointer;
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
@media screen and (min-width: 800px) {
  .container {
    padding: 10px 10%;
  }
}
</style>

