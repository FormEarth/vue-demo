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
    <div v-else style="background-color:#fff;padding:10px 20px;">
      <div class="atlas-item-header">
        <div style="display:flex;">
          <div
            class="header-left"
            style="cursor: pointer;"
            @click="$router.push('/'+atlas.user.userId+'/homepage')"
          >
            <img v-lazy="atlas.user.avatar" />
          </div>
          <div class="header-center">
            <div class="header-username">
              <span>{{atlas.user.userName}}</span>
              <!-- <span class="follow-button">关注</span> -->
            </div>
            <div style="height:23px;line-height:16px;padding-top:2px;">
              上海市 松江区&nbsp;来自demooo网页版
              <!-- {{atlas.sendTime|time}} -->
            </div>
          </div>
        </div>
      </div>
      <div class="main-area">
        <demo-atlas-view :images="atlas.atlasPictures" :identical="atlas.identical"></demo-atlas-view>
        <div v-if="atlas.atlasPictures.length>0">
          <demo-tag v-show="atlas.personal" color="red" small>仅自己可见</demo-tag>
          <demo-tag v-for="tag in atlas.atlasTags" :key="tag.tagId" small>{{tag.tagText}}</demo-tag>
        </div>
        <div v-for="(content,index) in reverseContent" :key="index">
          <div v-if="index==0">
            <span class="atlas-content" v-show="content!=''" v-html="content"></span>
            <demo-tag
              v-show="atlas.atlasPictures.length==0"
              v-for="tag in atlas.atlasTags"
              :key="tag.tagId"
              simple
            >{{tag.tagText}}</demo-tag>
          </div>
          <div v-else v-show="showHistory" style="color:gray;">
            <mu-divider style="margin-bottom:5px;"></mu-divider>
            <span class="atlas-content" v-html="content"></span>
          </div>
        </div>
        <div class="small-text">
          发布于&nbsp;{{atlas.sendTime}}&nbsp;
          <mu-icon value="place" size="16"></mu-icon>上海 浦东
        </div>
        <div class="small-text" v-show="atlas.atlasContent.length>1">
          已编辑·最后编辑于&nbsp;{{atlas.updateTime}}&nbsp;
          <span
            @click="showHistory=!showHistory"
          >{{showHistory?"收起编辑历史":"展开编辑历史"}}</span>
        </div>
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
        <!-- <mu-icon value="speaker_notes_off"></mu-icon> -->
        评论已被作者关闭
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
      <!-- <div style="text-align:center;padding-top:5px;">作品由作者发布于本平台，版权属作者所有，该作不代表本站观点，若有侵权，请联系管理员</div> -->
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
      dataIsLoaded: false,
      showHistory: false //是否展开编辑历史
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
    },
    reverseContent() {
      return this.atlas.atlasContent.reverse();
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
.atlas-item-header {
  display: flex;
  justify-content: space-between;
  height: 46px;
  padding: 2px 2px;
  /* background-color: rgb(160, 248, 186); */
  margin-bottom: 6px;
}
.header-center {
  /* display: flex;
  flex-direction: column; */
  /* width: 60%; */
  padding-left: 4px;
  font-size: 10px;
}
.header-right {
  /* width: 30%; */
  text-align: right;
}
.header-left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-username {
  font-family: Fangzhenglibian, "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  height: 23px;
  font-size: 16px;
  line-height: 15px;
  padding-top: 5px;
  color: red;
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
.atlas-content {
  white-space: pre-wrap;
  /* padding: 0 5px; */
}
.small-text {
  margin-top: 5px;
  /* padding-left: 5px; */
  font-size: 12px;
  color: gray;
}
@media screen and (min-width: 768px) {
  .main-area{
    padding:0 40px;
  }
}
/* 1 3 1 1 3 1 1 3 1 */
/* 1 2 2 1 */
</style>