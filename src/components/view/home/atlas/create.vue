<template>
  <mu-container>
    <div class="dynamic-imgs">
      <div>
        <div style="display:inline-block;">
          <p class="img-title">添加图片({{atlas.atlasPictures.length}}/9)</p>
        </div>
        <div v-show="atlas.atlasPictures.length>1" style="display:inline-block;">
          <p class="delete-text" @click="deleteAll">全部删除</p>
        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- 清除浮动，否则float会对之后的布局产生影响 -->
      <div class="table-list">
        <!-- 显示图片 -->
        <div class="img-div" v-for="(img,index) in atlas.atlasPictures" :key="index">
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
            accept="image/png,image/jpg,image/jpeg,image/gif"
            multiple
            @change="addFile($event)"
            style="display: none;"
          />
        </div>
      </div>
    </div>
    <div class="dynamic-imgs" style="padding-bottom:15px;">
      <p class="img-title">添加描述</p>
      <mu-text-field
        v-model="atlas.content"
        :rows="2"
        :rowsMax="20"
        max-length="300"
        full-width
        multi-line
        placeholder="文字描述（可选）"
        solo
      ></mu-text-field>
      <!-- <div v-if="atlas.content[0].length>=255" style="text-align:center;color:red;">字数已达上限</div> -->
    </div>
    <div class="dynamic-imgs">
      <p class="img-title">添加标签</p>
      <demo-tag-select ref="tag_select" :tag_group="atlas.tags" @change_tags="change_tags"></demo-tag-select>
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
      <mu-button
        color="info"
        full-width
        :disabled="atlas.atlasPictures.length<1&&atlas.content.length<1"
        @click="createNewatlas"
      >发布</mu-button>
      <p class="img-title" style="color:#666666;">
        最多可以上传9张图片（允许的格式为jpg、png、jpeg、gif，单张不超过5M。除gif外的图片格式会被转换为jpg）
        <br />最多可选择或创建10个标签
        <br />若您的图片尺寸一致,将启用轮播图模式，否则将使用预览模式，了解更多请点击
        <a href>这里</a>
      </p>
    </div>
    <mu-dialog
      width="600"
      max-width="80%"
      transition="slide-left"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="releaseSucessDialog"
    >
      <div slot="title">{{isRecommend?'发布成功':'发布中'}}</div>
      <div v-if="!isRecommend">
        <mu-linear-progress mode="determinate" :value="uploaProgress"></mu-linear-progress>正在努力发布中……
      </div>
      <!-- <div v-else> -->
      <span v-if="isRecommend">动态已发布成功！</span>
      <mu-button v-if="isRecommend" slot="actions" flat color="primary" @click="writeAnother">再写一篇</mu-button>
      <mu-button
        v-if="isRecommend"
        slot="actions"
        flat
        color="primary"
        @click="goNewArticle"
      >去查看新发布动态</mu-button>
      <!-- </div> -->
    </mu-dialog>
  </mu-container>
</template>
<script>
import util from "@/util/util";
import { Toast } from "vant";
export default {
  name: "atlasAdd",
  data() {
    return {
      searchText: "", //tag搜素输入的内容
      searchPanel: false, //tag搜索区域的开合标识
      isSelectImg: false, //开启弹窗标志
      autosize: { minheight: 50 },
      releaseSucessDialog: false, //发送弹框是否打开
      atlas: {
        atlasPictures: [], //存放添加图片
        content:"",
        comment: true, //允许评论
        tags: [],
        personal: false, //仅自己可见
      },
      initTags: [], //初始化加载的推荐tags数组，即在输入框为空时显示的列表
      tags: ["日记", "原创", "123", "2333"],
      uploaProgress: 0, //文件上传进度
      isRecommend: false, //是否发布成功
      writingId: "" //发布成功后服务端返回新图集Id
    };
  },
  created() {
    //初始化热门标签，添加标签时再初始化
    // this.searchTagsWithText(true);
  },
  computed: {
    isAddImg() {
      //如果已经9张了，isAddImg为false，隐藏加号
      if (this.atlas.atlasPictures.length >= 9) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    //将file对象转换成可本地预览的ObjectURL
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
    // 添加本地图片
    addFile(event) {
      var fileList = event.target.files; // (利用console.log输出看file文件对象)
      console.log(this.atlas.atlasPictures.length + fileList.length);
      let allowNum = 0;
      //最多只能选择9张，超出的不要了
      if (this.atlas.atlasPictures.length + fileList.length > 9) {
        // 轻提示弹框
        Toast({
          message: "最多可选择9张图片",
          duration: 2000,
          forbidClick: true
        });
        allowNum = 9 - this.atlas.atlasPictures.length;
      } else {
        allowNum = fileList.length;
      }
      //限制文件类型和大小
      for (let j = 0; j < allowNum; j++) {
        //TODO 因微信传过的图片有type为空的现象，这里先判空下，以后处理
        let fileType = fileList[j].type?fileList[j].type:"image/jpg"
        console.log("文件类型:" + fileType);
        var regex = /image\/jpg|png|jpeg|gif/;
        if (!regex.test(fileType)) {
          Toast({
            message: "文件类型不匹配,"+fileType,
            duration: 2000,
            forbidClick: true
          });
          return;
        }
        // alert("文件类型"+fileList[j])
        let fileSize = fileList[j].size;
        if (fileSize / 1024 / 1024 > 5) {
          Toast({
            message: "文件不能超过3M",
            duration: 2000,
            forbidClick: true
          });
          return;
        }
      }
      for (let i = 0; i < allowNum; i++) {
        this.atlas.atlasPictures.push(fileList[i]);
      }
      event.target.value = ""; //清空内容，解决无法二次上传同一文件问题
    },
    //删除图片
    deleteImg(index) {
      this.atlas.atlasPictures.splice(index, 1); //删除起始下标为index，长度为1的一个值
    },
    //删除全部
    deleteAll() {
      this.atlas.atlasPictures = [];
    },
    //发布新图集
    createNewatlas() {
      // 有图片上传，组装数据
      let formData = new FormData();
      for (let i = 0; i < this.atlas.atlasPictures.length; i++) {
        formData.append("images", this.atlas.atlasPictures[i]);
      }
      formData.append("content", this.atlas.content);
      formData.append("comment", this.atlas.comment);
      formData.append("personal", this.atlas.personal);
      formData.append("type", 2);
      for (let i = 0; i < this.atlas.tags.length; i++) {
        // formData.append("tags", this.atlas.tags[i]);
        formData.append("tags[" + i + "]",this.atlas.tags[i])
      }
      //获取user-agent
      let parser = require('ua-parser-js');
      let ua = parser(navigator.userAgent);
      let source = ua.os.name+ua.os.version+" "+ua.browser.name+ua.browser.version;
      formData.append("source", source);
      //组装数据结束
      this.releaseSucessDialog = true;
      this.$http.atlas
        .createNewAtlas(formData, this)
        .then(response => {
          if (response.data.code == "2000") {
            this.writingId = response.data.data.id;
            this.isRecommend = true;
          } else {
            this.releaseSucessDialog = false;
          }
        })
        .catch(error => {
          this.releaseSucessDialog = false;
        });
    },
    // 继续发布
    writeAnother() {
      this.releaseSucessDialog = false;
      //刷新当前页面
      //this.$router.go(0);
      //清空之前数据
      this.atlas.atlasPictures = [];
      this.atlas.content = "";
      this.atlas.tags = [];
      this.releaseSucessDialog = false;
      this.$refs.tag_select.clear_tags()
      this.$forceUpdate()
    },
    // 去查看新写的文章
    goNewArticle() {
      this.releaseSucessDialog = false;
      this.$router.replace("/writing/" + this.writingId);
    },
    change_tags(array){
      this.atlas.tags = array
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
.mu-expansion-panel-header {
  padding: 0;
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
  /* margin-bottom: 6.5px; */
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
  right: 0;
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
</style>

