<template>
  <mu-container>
    <mu-appbar color="white" textColor="black" title="图集详情" :z-depth="0">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-menu slot="right">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content" style="font-size:15px;width:150px">
          <mu-list-item button>
            <mu-list-item-content v-if="star" @click="starArtice(star)">
              <mu-icon value="turned_in" color="green" size="16"></mu-icon>已收藏
            </mu-list-item-content>
            <mu-list-item-content v-else @click="starArtice(star)">
              <mu-icon value="turned_in_not" color="black" size="16"></mu-icon>收藏
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>不感兴趣</mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="openBotttomSheet">
            <mu-list-item-content>举报</mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-divider></mu-divider>
    <mu-card>
      <div style="display:flex;height:30px;margin:5px 0 9px 0">
        <div style="display:flex;width:70%;padding-left:10px;">
          <div>
            <img :src="picture" style="width:30px;height:30px;border-radius:50%;">
          </div>
          <div style="margin:6px 0px 0px 2px;color:#2979ff;" @click="goInfo">{{artice.author}}</div>
          <div style="margin-top:5px;margin-left:8px;">
            <van-button plain type="danger" size="mini">关注</van-button>
            <!-- <van-button type="danger" size="mini">已关注</van-button> -->
          </div>
        </div>
        <div style="width:30%;margin-top:6px;text-align:right;padding-right:10px;">123 阅读</div>
      </div>
      <div v-if="artice.proportion">
        <van-swipe @change="onChange">
          <van-swipe-item v-for="(image, index) in picturesArray" :key="index">
            <img :src="image">
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/{{picturesArray.length}}
          </div>
        </van-swipe>
      </div>
      <div class="img-container" v-else>
        <div class="img-item" v-for="(image, index) in picturesArray" :key="index">
          <img :src="image" @click="showImagePreview(index)">
        </div>
      </div>
      <div style="padding:5px 10px 5px 10px;">
        <mu-chip class="demo-chip" v-for="tag in tagArray" :key="tag">#{{tag}}</mu-chip>
      </div>
      <mu-card-text>{{artice.content}}</mu-card-text>
      <div style="padding-left:10px;font-size:12px;">
        发布于&nbsp;{{artice.datatime}}&nbsp; 
        <mu-icon value="place" size="16"></mu-icon>{{artice.place}}
      </div>
      <div style="display:flex;justify-content:center;padding-top:15px">
        <mu-badge content="12" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge content="0" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_down"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge content="1" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="share"></mu-icon>
          </mu-button>
        </mu-badge>
      </div>
      <mu-divider></mu-divider>
      <div v-if="!artice.comment" style="text-align:center;font-size:16px;padding-top:5px;">
        <mu-icon value="speaker_notes_off"></mu-icon>
        <br>评论已被作者关闭
      </div>
      <!-- <mu-divider></mu-divider> -->
      <div style="text-align:center;padding-top:5px;">
        作品由作者发布于本平台，版权属作者所有，该作不代表本站观点，若有侵权，请联系管理员
      </div>
    </mu-card>
    <!-- <app-footer param="home"></app-footer> -->
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>举报原因：</mu-sub-header>
        <mu-list-item button>
          <mu-list-item-title>政治有害类</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>侵权</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>广告、不健康信息信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>其他</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </mu-container>
</template>
<script>
import ArticeContent from "@/components/public/ArticeContent.vue";
import { ImagePreview } from 'vant';
export default {
  name: "artice",
  data() {
    return {
      current: 0,
      picture: require("@/assets/images/carousel1.jpg"),
      picture1: require("@/assets/images/404.jpg"),
      star: false,
      open: false,
      artice: {
        proportion:false,//这个字段用来判断图文中图片是否是等比例的，true则使用轮播图，false则使用预览
        style: "googlecode",
        title: "午后时光",
        comment: false,//评论
        datatime: "2019-3-17 16:03",//发布时间
        author: "花间舞",
        place:"上海 浦东",
        tags: "原创|王者荣耀|云淡风轻",
        pictures:"http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://www.lzshuli.com/game_images/105317829.jpeg|http://img3.imgtn.bdimg.com/it/u=234200694,2958848013&fm=26&gp=0.jpg|https://www.xiazaiba.com/uploadfiles/content/2017/1117/water_1510903919594499.png|http://image.9game.cn/2017/11/13/18553901.jpg",
        content:
          " 散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！"
      }
    };
  },
  mounted(){//这里必须是mouted钩子

  },
  computed: {
    // 将标签字符串切割成数组
    tagArray: function() {
      return this.artice.tags.split("|");
    },
    // 将图片地址字符串切割成数组
    picturesArray: function() {
      return this.artice.pictures.split("|");
    }
  },
  methods: {
    starArtice(star) {
      star ? (this.star = false) : (this.star = true);
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    onChange(index) {
      this.current = index;
    },
    goInfo() {
      this.$router.push("/mine/info");
    },
    showImagePreview(position) {
      const images = this.picturesArray;
      const instance = ImagePreview({
        images,
        startPosition: typeof position === 'number' ? position : 0
      });
    }
  },
  components: {
    "artice-content": ArticeContent
  },
  filters: {
    formateDate(value){

    }
  }
};
</script>
<style scoped>
.van-swipe-item img{
  max-width: 100%;
  max-height: 100%;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.mu-appbar {
  width: 100%;
  /* left:0px;
  bottom:0px; */
}
.mu-card {
  /* padding-top: 58px; */
  padding-left: 0px;
  padding-right: 0px;
}
.demo-chip {
  line-height: 22px;
  margin-right: 5px;
}
.mu-card-text {
  padding: 0px 10px 0px 10px;
}
.mu-card-actions {
  padding-top: 18px;
}
.badge-list-wrap {
  width: 100%;
  max-width: 360px;
  background-color: #fff;
  margin: 0 auto;
}
.demo-icon-badge {
  padding: 0px 15px 0px 15px;
  margin: 0px 16px 0px 16px;
}
.demo-badge-content {
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, .1);
}
.img-container{
  display:flex; /* 弹性布局 */
  flex-wrap:wrap;/* 换行 */
  /* border:solid 1px black; */
  /* margin-left:3%; */
  padding-left:6%;
}
.img-container .img-item {
  width:30%;
  height:28vw;
  /* border:solid 1px black; */
  margin:0px 5px 5px 0px;
  max-height:143px;
  min-height:100px;
  /* text-align: center; */
  overflow: hidden;
}
.img-container .img-item img{
  height:100%;
  width:100%;
  object-fit:cover;
}
/* 1 3 1 1 3 1 1 3 1 */
/* 1 2 2 1 */
</style>