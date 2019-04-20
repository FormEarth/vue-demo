<template>
  <mu-container>
    <mu-appbar title="发布图集" textColor="black" z-depth="1">
      <mu-button icon slot="left" @click="$router.back(-1)" :ripple="false">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-button icon slot="right" :ripple="false">
        <mu-icon value="send" color="primary"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="dynamic-imgs">
      <p class="img-title">添加图片({{dynamicPics.length}}/9)</p>
      <div class="table-list">
        <!-- 显示图片 -->
        <div class="img-div" v-for="(img,index) in dynamicPics" :key="index">
          <div class="delete">
            <mu-icon value="clear" color="white" size="20" @click="deleteImg(index)"></mu-icon>
          </div>
          <img class="img-add" :src="img">
        </div>
        <!-- 这里就是那个加号图片，isAddImg控制是否显示，上传图片用van-uploader -->
        <div class="add-div" v-show="isAddImg">
          <van-uploader
            :before-read="isMax"
            :after-read="onRead"
            accept="image/gif, image/jpeg"
            multiple
          >
            <mu-icon value="add" size="36" color="primary" style="margin-top: 26px;"></mu-icon>
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="dynamic-imgs">
      <p class="img-title">添加描述</p>
      <van-field
        v-model="content"
        type="textarea"
        placeholder="文字描述"
        rows="3"
        :autosize="autosize"
        maxlength="255"
      />
      <span v-if="content.length>=255" style="float:right;color:red;">字数已达上限</span>
      <span v-else style="float:right;">{{content.length}}/255字</span>
    </div>
    <div>
      <van-cell-group>
        <van-switch-cell v-model="proportion" title="使用预览模式"/>
      </van-cell-group>
    </div>
    <div class="dynamic-imgs">
      <p class="img-title">
        若您的图片尺寸一致(各图片的宽高比误差小于0.1),将启用轮播图模式，否则将使用预览模式，了解更多请点击
        <a href>这里</a>
      </p>
    </div>
  </mu-container>
</template>
<script>
import API from "@/axios/api";

export default {
  name: "atlas-add",
  data() {
    return {
      dynamicPics: [], //存放添加图片
      isSelectImg: false, //开启弹窗标志
      autosize: { minheight: 50 },
      content: "",
      proportion: false,
    };
  },
  computed: {
    isAddImg() {
      //如果已经9张了，isAddImg为false，隐藏加号
      if (this.dynamicPics.length >= 9) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //判断是否已经达到选图上限
    isMax(files) {
      let imgNum = this.dynamicPics.length + files.length;
      if (imgNum > 9) {
        return false;
      } else {
        return true;
      }
    },
    onRead(files) {
      //添加图片，这里需要注意，当上传一张照片时files是一个file对象而不是数组，因此先判断一下
      if (files instanceof Array) {
        for (let i = 0; i < files.length; i++) {
          this.dynamicPics.push(files[i].content);
        }
      } else {
        this.dynamicPics.push(files.content);
      }
    },
    //删除图片
    deleteImg(index) {
      this.dynamicPics.splice(index, 1); //删除起始下标为index，长度为1的一个值
    }
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
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
  min-height: 152px;
  width: 100%;
  background-color: #ffffff;
  padding: 5px 15px 15px 15px;
  margin-bottom: 6.5px;
}
.img-title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0.16px;
}
.table-list {
  /* width: 100%; */
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
}
.img-add {
  width: 96px;
  height: 96px;
  margin-left: 5px;
  margin-bottom: 5px;
}
.add-div {
  width: 96px;
  height: 96px;
  margin-left: 5px;
  text-align: center;
  border: 3px dashed rgb(172, 172, 171);
}
.img-div {
  width: 101px;
  height: 101px;
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
</style>

