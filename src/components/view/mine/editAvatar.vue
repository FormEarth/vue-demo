<template>
  <mu-container class="main-content">
    <img
      v-if="$route.name=='personalAvataredit'"
      class="original-avatar"
      :src="$store.state.current_user.avatar"
      width="100%"
    />
    <img v-else class="original-avatar" :src="$store.state.current_user.frontCover" width="100%" />
    <div style="width:100%;margin-top:10px;">
      <label class="ui-upload">
        {{$route.name=='personalAvataredit'?'选择新的头像':'选择新的封面'}}
        <input
          type="file"
          :value="imgFile"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="selectLocalFile($event, 1)"
          style="display: none;"
        />
      </label>
    </div>
    <mu-dialog
      width="360"
      :padding="0"
      transition="slide-bottom"
      fullscreen
      scrollable
      :open.sync="openFullscreen"
    >
      <mu-appbar color="primary" title="图片裁剪">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <!-- <mu-button slot="right" flat @click="closeFullscreenDialog">Done</mu-button> -->
      </mu-appbar>
      <div style="width:100%;height:400px;">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :canMove="false"
          :autoCrop="true"
          :canScale="false"
          centerBox
          fixed
          :fixedNumber="fixedNumber"
        ></vueCropper>
      </div>
      <div style="margin:10px 20px;">
        <mu-button full-width @click="uploadImage">上传</mu-button>
      </div>
      <div style="margin:10px 20px;">
        <mu-button full-width @click="closeFullscreenDialog">取消</mu-button>
      </div>
    </mu-dialog>
  </mu-container>
</template>

<script>
//图片裁剪插件
import { VueCropper } from "vue-cropper";
// import { Toast } from "vant";
export default {
  name: "EditAvatar",
  data() {
    return {
      openFullscreen: false,
      // image: "",
      imgFile: "",
      fileName: "",
      option: {
        img: "",
        // fixedNumber: [1, 1]
      }
    };
  },
  computed:{
    fixedNumber(){
      if(this.$route.name=="frontcoverEdit"){
        return [4,3]
      }else{
        return [1,1]
      }
    }
  },
  components: {
    VueCropper
  },
  methods: {
    closeFullscreenDialog() {
      this.openFullscreen = false;
      this.imgFile = "";
      this.option.img = "";
    },
    //选择本地图片
    selectLocalFile(e, num) {
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/.test(e.target.value)) {
        // alert("图片类型必须是jpeg,jpg,png中的一种");
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
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.option.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
      this.openFullscreen = true;
    },
    //上传图片（点击上传按钮）
    uploadImage() {
      let _this = this;
      let formData = new FormData();
      let type = (this.$route.name == "personalAvataredit" ? "AVATAR" : "FRONTCOVER");
      // 输出
      this.$refs.cropper.getCropBlob(data => {
        formData.append("image", data, this.fileName);
        formData.append("type", type);
        _this.$http.user
          .modifyOwnAvatar(formData)
          .then(response => {
            if (response.data.code == "2000") {
              //更新用户信息
              var user = _this.$store.state.current_user;
              if (this.$route.name == "personalAvataredit") {
                user.avatar = response.data.data.relativePath;
              } else {
                user.frontCover = response.data.data.relativePath;
              }
              sessionStorage.setItem("current_user", JSON.stringify(user));
              _this.$store.commit("save_user", user);
              // 轻提示弹框
              _this.$toast("上传成功");
              _this.$router.back(-1);
            } else {
            }
          })
          .catch(error => {});
      });
    }
  }
};
</script>

<style scoped>
.main-content {
  text-align: center;
  padding: 0;
}
.vue-cropper {
  background-image: none;
}
.ui-upload {
  height: 30px;
  width: 100px;
  background-color: #fff;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  border-radius: 2px;
  color: rgb(99, 95, 95);
  /* border: 1px rgba(136, 133, 133, 0.658) solid; */
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  /* margin-left: 20px; */
}
@media screen and (min-width: 800px) {
  /* .main-content {
    padding: 10px 10%;
  } */
  .original-avatar {
    width: 30%;
  }
}
</style>