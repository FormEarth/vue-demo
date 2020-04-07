<template>
  <!-- 根节点 -->
  <div class="main-view">
    <!-- 比例一致使用轮播图展示（图片过高会带来展示问题） 
    <div v-if="identical">
      <van-swipe @change="onChange" :loop="false">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" style="width: 100%;" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{images.length}}</div>
      </van-swipe>
    </div>-->
    <!-- 比例不一致则自定义 -->
    <div :class="['image-item-'+imgLength,'show-view']">
      <div
        v-for="(image,index) in images"
        :key="index"
        :class="['each-item-'+index,'default-item']"
        @click="current=index;showPreview=true;"
      >
        <img v-lazy="image" />
      </div>
      <van-image-preview
        v-model="showPreview"
        :images="images"
        :loop="false"
        :start-position="current"
        :closeOnPopstate="true"
        @change="onChange"
      >
        <template v-slot:index>第{{ current }}页</template>
        <div slot="cover">text</div>
      </van-image-preview>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";

export default {
  name: "DemoAtlasView", //图集图片数组的展览组件
  props: {
    images: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      //图片预览组件是否打开
      showPreview: false,
      current: 0
    };
  },
  computed: {
    imgLength() {
      return this.images.length;
    }
  },
  methods: {
    onChange(index) {
      this.current = index;
    }
    // showImagePreview(position) {
    //   if (this.images.length == 1) return;
    //   const images = this.images;
    //   const instance = ImagePreview({
    //     images,
    //     startPosition: typeof position === "number" ? position : 0,
    //     loop: false,
    //     closeOnPopstate: true
    //   });
    // }
  }
};
</script>

<style scoped>
/* 轮播图的索引插槽 */
.custom-indicator {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.1);
}
.default-item {
  width: 33.3%;
  height: 33.3vw;
  /* max-height: 166.5px; */
  max-height: 200px;
  /* min-height: 116.5px; */
  padding-right: 3px;
  margin-bottom: 1%;
}
.show-view {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  /* margin-bottom: 3px; */
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px 0;
  border-radius: 4px;
  cursor: zoom-in;
}
/* 1张图片 */
.image-item-1 .each-item-0 {
  /* width: 100%; */
  width: 100%;
  height: 100%;
  max-height: 100%;
  /* background-color: rgb(26, 24, 24); */
  /* text-align: center; */
}
.image-item-1 img {
  width: 100%;
  /* height: 100%; */
  /* max-width: 100%; */
  max-width: 100%;
  /* max-height: 100%; */
  /* object-fit: contain; */
  vertical-align: middle;
}
/* 2张图片 */
.image-item-2,
.image-item-4,
.image-item-5,
.image-item-6,
.image-item-7,
.image-item-8,
.image-item-9
 {
  max-width: 500px;
}
.image-item-7 .each-item-0{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 35%;
}
.image-item-2 .each-item-0,
.image-item-2 .each-item-1,
.image-item-4 .each-item-0,
.image-item-4 .each-item-1,
.image-item-4 .each-item-2,
.image-item-4 .each-item-3,
.image-item-5 .each-item-0,
.image-item-5 .each-item-1,
.image-item-8 .each-item-0,
.image-item-8 .each-item-1
 {
  position: relative;
  width: 49.5%;
  height: 0;
  padding-top: 49.5%;
}
.image-item-2 .each-item-0,
.image-item-3 .each-item-0,
.image-item-3 .each-item-1,
.image-item-4 .each-item-0,
.image-item-4 .each-item-2,
.image-item-5 .each-item-0,
.image-item-5 .each-item-2,
.image-item-5 .each-item-3,
.image-item-6 .each-item-0,
.image-item-6 .each-item-1,
.image-item-6 .each-item-3,
.image-item-6 .each-item-4,
.image-item-7 .each-item-1,
.image-item-7 .each-item-2,
.image-item-7 .each-item-4,
.image-item-7 .each-item-5,
.image-item-8 .each-item-0,
.image-item-8 .each-item-2,
.image-item-8 .each-item-3,
.image-item-8 .each-item-5,
.image-item-8 .each-item-6,
.image-item-9 .each-item-0,
.image-item-9 .each-item-1,
.image-item-9 .each-item-3,
.image-item-9 .each-item-4,
.image-item-9 .each-item-6,
.image-item-9 .each-item-7
 {
  margin-right: 1%;
}
.image-item-2 img,
.image-item-3 img,
.image-item-4 img,
.image-item-5 img,
.image-item-6 img,
.image-item-7 img,
.image-item-8 img,
.image-item-9 img
{
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
} 
/* 3张图片 */
.image-item-3 .each-item-0,
.image-item-3 .each-item-1,
.image-item-3 .each-item-2,
.image-item-5 .each-item-2,
.image-item-5 .each-item-3,
.image-item-5 .each-item-4,
.image-item-6 .each-item-0,
.image-item-6 .each-item-1,
.image-item-6 .each-item-2,
.image-item-6 .each-item-3,
.image-item-6 .each-item-4,
.image-item-6 .each-item-5,
.image-item-7 .each-item-1,
.image-item-7 .each-item-2,
.image-item-7 .each-item-3,
.image-item-7 .each-item-4,
.image-item-7 .each-item-5,
.image-item-7 .each-item-6,
.image-item-8 .each-item-2,
.image-item-8 .each-item-3,
.image-item-8 .each-item-4,
.image-item-8 .each-item-5,
.image-item-8 .each-item-6,
.image-item-8 .each-item-7,
.image-item-9 .each-item-0,
.image-item-9 .each-item-1,
.image-item-9 .each-item-2,
.image-item-9 .each-item-3,
.image-item-9 .each-item-4,
.image-item-9 .each-item-5,
.image-item-9 .each-item-6,
.image-item-9 .each-item-7,
.image-item-9 .each-item-8
 {
  position: relative;
  width: 32.66%;
  height: 0;
  padding-top: 32.66%;
}
/* 4张图片（同2） */
/* 5张图片 */
@media screen and (min-width: 768px) {
  .image-item-1 img {
    max-width: 225px;
    cursor: zoom-in;
  }
}
</style>