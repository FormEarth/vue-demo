<template>
  <!-- 根节点 -->
  <div class="main-view">
    <!-- 比例一致使用轮播图展示（图片过高会带来展示问题） -->
    <div v-if="identical">
      <van-swipe @change="onChange" :loop="false">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" style="width: 100%;" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{images.length}}</div>
      </van-swipe>
    </div>
    <!-- 比例不一致则自定义 -->
    <div v-else :class="['image-item-'+imgLength,'show-view']">
      <div
        v-for="(image,index) in images"
        :key="index"
        :class="['each-item-'+index,'default-item',forbidOversize?'max-height':'']"
        @click="current=index;showPreview=true;"
      >
        <img v-lazy="image" />
      </div>
      <van-image-preview v-model="showPreview" :images="images"	:loop="false" :start-position="current"	:closeOnPopstate="true" @change="onChange">
        <template v-slot:index>第{{ current }}页</template>
        <div slot="cover">text</div>
      </van-image-preview>
    </div>
  </div>
</template>
//图集图片数组的展览组件
<script>
import { ImagePreview } from "vant";

export default {
  name: "DemoAtlasView",
  props: {
    images: {
      type: Array,
      default: []
    },
    identical: {
      type: Boolean,
      default: false
    },
    forbidOversize: {
      //单张图片是否限制长度，设置false原样展示
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //图片预览组件是否打开
      showPreview:false,
      current: 0,
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
    },
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
  min-height: 116.5px;
  padding-right: 3px;
  margin-bottom: 3px;
}
.show-view {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 3px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* padding-right: 3px; */
}
/* 一张图片 */
.image-item-1 {
}
.image-item-1 .each-item-0 {
  /* width: 100%; */
  width: 100%;
  height: 100%;
  /* max-height: 100%; */
  background-color: rgb(26, 24, 24);
  text-align: center;
  padding-right: 0;
}
.image-item-1 img {
  width: 100%;
  max-width: 100%;
  /* max-height: 100%; */
  object-fit: contain;
  vertical-align: middle;
}
.max-height {
  max-height: 300px;
}
/* .image-item-2 {
} */
.image-item-2 .each-item-0 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  /* padding-right: 3px; */
}
.image-item-2 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
/* .image-item-3 {
  overflow: hidden;
  margin-bottom: 3px;
} */
.image-item-3 .each-item-0 {
  width: 100%;
  height: 50vw;
  padding-right: 0;
}
.image-item-3 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  /* padding-right: 3px; */
}
.image-item-3 .each-item-2 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
/* .image-item-3 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
/* .image-item-4 {
  overflow: hidden;
  margin-bottom: 3px;
} */
.image-item-4 .each-item-0 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
}
.image-item-4 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
.image-item-4 .each-item-2 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
}
.image-item-4 .each-item-3 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
/* .image-item-4 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
/* .image-item-5 {
  overflow: hidden;
  margin-bottom: 3px;
} */
.image-item-5 .each-item-0 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
}
.image-item-5 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
.image-item-5 .each-item-2 {
}
.image-item-5 .each-item-3 {
}
.image-item-5 .each-item-4 {
  padding-right: 0;
}
/* .image-item-5 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
/* .image-item-6 {
  overflow: hidden;
  margin-bottom: 3px;
} */
.image-item-6 .each-item-0 {
  width: 100%;
  height: 40.3vw;
  max-height: 166.5px;
  min-height: 116.5px;
  padding-right: 0;
}
.image-item-6 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
}
.image-item-6 .each-item-2 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
.image-item-6 .each-item-3 {
}
.image-item-6 .each-item-4 {
}
.image-item-6 .each-item-5 {
  padding-right: 0;
}
/* .image-item-6 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
/* .image-item-7 {
  overflow: hidden;
  width: 100%;
  margin-bottom: 3px;
} */
.image-item-7 .each-item-0 {
  width: 100%;
  height: 40.3vw;
  max-height: 166.5px;
  min-height: 116.5px;
  padding-right: 0;
}
.image-item-7 .each-item-1 {
}
.image-item-7 .each-item-2 {
}
.image-item-7 .each-item-3 {
  padding-right: 0;
}
.image-item-7 .each-item-4 {
}
.image-item-7 .each-item-5 {
}
.image-item-7 .each-item-6 {
  padding-right: 0;
}
/* .image-item-7 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
/* .image-item-8 {
  overflow: hidden;
  width: 100%;
  margin-bottom: 3px;
} */
.image-item-8 .each-item-0 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
}
.image-item-8 .each-item-1 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  padding-right: 0;
}
.image-item-8 .each-item-2 {
}
.image-item-8 .each-item-3 {
}
.image-item-8 .each-item-4 {
  padding-right: 0;
}
.image-item-8 .each-item-5 {
}
.image-item-8 .each-item-6 {
}
.image-item-8 .each-item-7 {
  padding-right: 0;
}
</style>