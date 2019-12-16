<template>
  <div>
    <label for="upload" class="label-upload">
      <slot>
        <mu-icon value="folder" size="36" color="primary"></mu-icon>
      </slot>
    </label>
    <input
      id="upload"
      type="file"
      accept="image/png, image/jpg, image/jpeg"
      @change="selectLocalFile($event, 1)"
      style="display: none;"
    />
    <mu-dialog
      width="360"
      :padding="0"
      :open.sync="openFullscreen"
      transition="slide-bottom"
      fullscreen
      scrollable
    >
      <mu-appbar color="info" title="图片裁剪">
        <mu-button slot="left" icon @click="openFullscreen = false;">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="width:100%;height:400px;">
        <vueCropper
          ref="cropper"
          :img="image"
          :canMove="false"
          :autoCrop="true"
          :canScale="false"
          :fixedNumber="[4,3]"
          centerBox
          fixed
        ></vueCropper>
      </div>
      <div class="button-group">
        <div>
          <mu-button color="success" @click="cutImage">确认</mu-button>
        </div>
        <div>
          <mu-button color="info" @click="openFullscreen = false;">取消</mu-button>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
//图片裁剪插件
import { VueCropper } from "vue-cropper";
export default {
  //图片裁剪组件
  name: "DemoImageUpload",
  data() {
    return {
      openFullscreen: false,
      image: ""
    };
  },
  props: {},
  components: {
    VueCropper
  },
  methods: {
    //选择本地图片
    selectLocalFile(e, num) {
      this.image = "";
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/.test(e.target.value)) {
        this.$toast("图片类型必须是jpeg,jpg,png中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        _this.image = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
      this.openFullscreen = true;
      e.target.value = ""; //清空内容，解决第二次无法选择同一文件问题
    },
    //裁剪选择图片
    cutImage() {
      var _this = this;
      //调用父组件方法
      this.$refs.cropper.getCropBlob(data => {
        // _this.image = window.URL.createObjectURL(data);
        _this.$emit("setBlobData", data);
        _this.openFullscreen = false;
      });
    }
  }
};
</script>

<style scoped>
.vue-cropper {
  background-image: none;
}
.button-group {
  margin: 10px 20px;
  display: flex;
  justify-content: space-around;
}
</style>