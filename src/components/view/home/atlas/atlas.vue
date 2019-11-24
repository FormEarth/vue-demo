<template>
  <mu-container>
    <div
      v-if="!dataIsLoaded"
      style="position:fixed;width:100%;height:100%;text-align:center;"
      v-loading="loading"
      data-mu-loading-text="数据正在加载中……"
      @click="loadData"
    >
      <div v-show="!loading" style="text-align:center;">
        <span>数据加载失败，点击屏幕以重试</span>
        <br />
        <mu-icon size="56" value="refresh" color="blue100"></mu-icon>
      </div>
    </div>
    <div v-else>
      <div style="display:flex;height:30px;margin:5px 0 9px 0">
        <div style="display:flex;width:70%;padding-left:10px;">
          <div>
            <img :src="atlas.user.avatar" style="width:30px;height:30px;border-radius:50%;" />
          </div>
          <div style="margin:6px 0px 0px 2px;color:#2196F3;" @click="goInfo">{{atlas.user.userName}}</div>
          <div style="margin-top:5px;margin-left:8px;">
            <van-button plain type="danger" size="mini">关注</van-button>
            <!-- <van-button type="danger" size="mini">已关注</van-button> -->
          </div>
        </div>
        <div style="width:30%;margin-top:6px;text-align:right;padding-right:10px;">123 阅读</div>
      </div>
      <demo-atlas-view :images="atlas.atlasPictures" :identical="atlas.identical"></demo-atlas-view>
      <div v-if="atlas.atlasPictures.length>0" style="padding:0 10px;">
        <demo-tag v-for="tag in atlas.atlasTags" :key="tag.tagId" small>{{tag.tagText}}</demo-tag>
      </div>
      <div style="white-space: pre-wrap;padding:0 5px;">
        <span v-html="atlas.atlasContent"></span>
        <demo-tag
          v-show="atlas.atlasPictures.length==0"
          v-for="tag in atlas.atlasTags"
          :key="tag.tagId"
          simple
        >{{tag.tagText}}</demo-tag>
      </div>
      <div style="margin-top:5px;padding-left:10px;font-size:12px;color:gray;">
        发布于&nbsp;{{atlas.sendTime}}&nbsp;
        <mu-icon value="place" size="16"></mu-icon>上海 浦东
      </div>
      <div style="display:flex;justify-content:center;padding-top:15px">
          <mu-button icon>
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
          <mu-button icon>
            <mu-icon value="thumb_down"></mu-icon>
          </mu-button>
          <mu-button icon>
            <mu-icon value="favorite"></mu-icon>
          </mu-button>
      </div>
      <!-- <mu-divider></mu-divider> -->
      <div v-if="!atlas.comment" style="text-align:center;font-size:16px;padding-top:5px;">
        <mu-icon value="speaker_notes_off"></mu-icon>
        <br />评论已被作者关闭
      </div>
      <div v-else style="padding:0 10px;">
        <demo-input placeholder="添加评论" v-model="comment" />
        <div style="margin-top:10px;">
          <input
            :disabled="comment.length==0"
            type="submit"
            value="提交"
            style="border:none;width:100%;background-color:#5db2ff;height:30px;"
          />
        </div>
      </div>
      <!-- <mu-divider></mu-divider> -->
      <div style="text-align:center;padding-top:5px;">作品由作者发布于本平台，版权属作者所有，该作不代表本站观点，若有侵权，请联系管理员</div>
    </div>
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
          <mu-list-item-title>广告、不健康信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>其他</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </mu-container>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  name: "atlas",
  data() {
    return {
      current: 0,
      picture: require("@/assets/images/carousel1.jpg"),
      picture1: require("@/assets/images/404.jpg"),
      star: true,
      open: false,
      atlas: {},
      comment: "",
      loading: true, //是否显示加载遮罩层
      dataIsLoaded: false
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    //这里必须是mouted钩子
  },
  computed: {
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$http.atlas
        .queryAtlasById(this.$route.params.atlasId)
        .then(response => {
          if (response.data.code == "2000") {
            this.atlas = response.data.data.atlas;
            this.dataIsLoaded = true;
          } else {
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
        });
    },
    starArticle() {
      console.log(this.star);
      if (this.star) {
        this.star = false;
        this.$toast.success("取消收藏成功");
        //Toast.success('取消收藏成功')
      } else {
        this.star = true;
        this.$toast.success("收藏成功");
      }
    },
    opeanToast() {
      console.log("looooogggggggggggggggggg");
      Toast.success("收藏成功");
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
      this.$router.push("/" + this.atlas.user.userId + "/homepage");
    },
    showImagePreview(position) {
      const images = this.atlas.atlasPictures;
      const instance = ImagePreview({
        images,
        startPosition: typeof position === "number" ? position : 0
      });
    }
  }
};
</script>
<style scoped>
.van-swipe-item img {
  max-width: 100%;
  max-height: 100%;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
  /* max-width: 500px; */
  min-width: 350px;
}
.mu-card-text {
  padding: 0px 10px 0px 10px;
}
.mu-card-actions {
  padding-top: 18px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.1);
}
.img-container {
  display: flex; /* 弹性布局 */
  flex-wrap: wrap; /* 换行 */
  /* border:solid 1px black; */
  /* margin-left:3%; */
  padding-left: 6%;
}
.img-container .img-item {
  width: 30%;
  height: 28vw;
  /* border:solid 1px black; */
  margin: 0px 5px 5px 0px;
  max-height: 143px;
  min-height: 100px;
  /* text-align: center; */
  overflow: hidden;
}
.img-container .img-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
@media screen and (min-width: 800px) {
  /* .container {
    padding: 0 10%;
  } */
}
/* 1 3 1 1 3 1 1 3 1 */
/* 1 2 2 1 */
</style>