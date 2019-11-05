<template>
  <div class="main-content">
    <div class="atlas-item">
      <div class="atlas-item-header">
        <div style="display:flex;">
          <div class="header-left" style="cursor: pointer;" @click="goInfo">
            <img :src="atlas.user.avatar" :onerror="defaultImg" />
          </div>
          <div class="header-center">
            <div style="height:23px;font-size:16px;line-height:15px;padding-top:5px;">
              {{atlas.user.userName}}
              <!-- <span class="follow-button">关注</span> -->
            </div>
            <div style="height:23px;line-height:16px;padding-top:2px;">
              上海市 松江区
              {{atlas.sendTime|time}}
            </div>
          </div>
        </div>
        <div class="header-right">
          <mu-icon size="35" value="more_vert" @click="openAlertDialog" style="cursor: pointer;"></mu-icon>
        </div>
      </div>
      <!-- 轮播图模式 -->
      <div v-if="atlas.proportion">
        <van-swipe @change="onChange" :loop="false">
          <van-swipe-item v-for="(image, index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg" style="width: 100%;object-fit: cover;" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{pictureArray.length}}</div>
        </van-swipe>
      </div>
      <!-- 预览模式 -->
      <div v-else>
        <div v-if="atlas.atlasPictures.length==1">
          <div class="atlas-item-img-1" v-for="(image,index) in atlas.atlasPictures" :key="index">
            <img :src="image" :onerror="defaultImg" />
          </div>
        </div>
        <div v-else-if="atlas.atlasPictures.length==2" style="display:flex;">
          <div class="atlas-item-img-2" v-for="(image,index) in atlas.atlasPictures" :key="index">
            <img :src="image" :onerror="defaultImg" @click="showImagePreview(index)" />
          </div>
        </div>
        <div v-else style="display:flex;flex-wrap:wrap;">
          <div class="atlas-item-img-3" v-for="(image,index) in atlas.atlasPictures" :key="index">
            <img :src="image" :onerror="defaultImg" @click="showImagePreview(index)" />
          </div>
        </div>
      </div>
      <div class="atlas-item-footer">
        <div class="footer-left">
          <mu-icon value="favorite_border" size="25"></mu-icon>
          <mu-icon value="turned_in_not" size="25"></mu-icon>
          <mu-icon value="open_in_new" size="25"></mu-icon>
        </div>
        <div
          class="footer-right"
          style="text-align:right;margin-top:3px;margin-right:3px;"
        >123&nbsp;次喜欢</div>
      </div>
      <demo-tag v-for="tag in atlas.atlasTags" :key="tag">{{tag}}</demo-tag>
      <br />
      <div class="atlas-content" :class="fold ? 'fold' : 'unfold'">
        <div>
          <span style="font-weight: bold;">{{atlas.user.userName}}:</span>
          <span>{{atlas.atlasContent}}</span>
        </div>
      </div>
      <div v-if="showButton">
        <div class="show" @click="handleFold" v-show="fold">更多</div>
        <div class="show" @click="handleFold" v-show="!fold">收起</div>
      </div>
    </div>123条评论
    <mu-dialog
      width="100%"
      max-width="90%"
      :esc-press-close="false"
      :overlay-opacity="0.6"
      :open.sync="openAlert"
    >
      <mu-list>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="star_border"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>关注 {{atlas.user.userName}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="mail_outline"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>发邮件给 {{atlas.user.userName}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="link"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>复制图集链接</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="visibility_off"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>不看</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false" @click="openBotttomSheet">
          <mu-list-item-action>
            <mu-icon value="warning"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>举报</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          v-show="this.$store.state.current_user.userId==this.atlas.creater"
        >
          <mu-list-item-action>
            <mu-icon value="edit"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>重新编辑</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          button
          :ripple="false"
          v-show="this.$store.state.current_user.userId==this.atlas.creater"
        >
          <mu-list-item-action>
            <mu-icon value="delete"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>删除</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-dialog>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>您正在举报{{atlas.user.userName}}，举报原因：</mu-sub-header>
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
          <mu-list-item-title>内容引起不适</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @item-click="closeBottomSheet">
          <mu-list-item-title>取消</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script>
/* 
图集列表组件
组件设计思路：
图集组件主要用来展示图集，已知的图片展示有轮播图和预览，需要考虑以下几种情况
1.没有图片，只有文字，展示固定100个文字，其余隐藏，可点击更多查看全部；若文字<100，不固定高度
2.一张图片的，100%宽度，等高度展示,文字展示同上
3.两张图片的，50%宽度，等高度展示，文字展示同上
4.三张图片的，30%宽度，等高度展示，文字展示同上
6.四张图片的，50%宽度，等高度展示，文字展示同上(已归为其它)
7.其它，30%宽度展示，等高度，文字展示同上
*/
import util from "@/util/util";
import { ImagePreview } from "vant";

export default {
  name: "AtlasItem", //图集列表组件
  props: {
    atlas: {
      //图集对象
      type: Object
    }
  },
  data() {
    return {
      current: 0, //轮播图当前图片的索引
      openAlert: false,
      open: false,
      fold: true
    };
  },
  computed: {
    // 根据文本长度决定是否展示更多与收起按钮
    showButton: function() {
      return this.atlas.atlasContent.length >= 40 ? true : false;
    },
    //默认加载的图片
    defaultImg() {
      return 'this.src="' + require("@/assets/broken_image.jpg") + '"';
    }
  },
  filters: {
    time: function(value) {
      return util.dateSubtract(value);
    }
  },
  methods: {
    // goArticle(id) {
    //   var url = "/home/article/detail/" + id;
    //   this.$router.push(url);
    // },
    goPictures(id) {
      var url = "/home/atlas/detail/" + id;
      this.$router.push(url);
    },
    goInfo() {
      this.$router.push("/mine/info");
    },
    openAlertDialog() {
      console.log(this.$store.state.current_user.userId);
      console.log(this.atlas.author);
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.openAlert = false;
      this.open = true;
    },
    handleFold() {
      this.fold = !this.fold;
    },
    onChange(index) {
      this.current = index;
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
.main-content {
  min-width: 350px;
  width: 100%;
}
.atlas-item-header {
  display: flex;
  justify-content: space-between;
  height: 46px;
  padding: 2px 2px;
  /* background-color: rgb(160, 248, 186); */
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
.atlas-item-img-1 img {
  width: 100%;
}
.atlas-item-img-2 {
  width: 50%;
  height: 50vw;
  max-height: 250px;
  min-height: 175px;
  overflow: hidden;
}
.atlas-item-img-2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 3px;
}
.atlas-item-img-3 {
  width: 33.3%;
  height: 33.3vw;
  max-height: 166.5px;
  min-height: 116.5px;
  overflow: hidden;
}
.atlas-item-img-3 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 3px;
  padding-bottom: 3px;
}
.atlas-item-footer {
  display: flex;
  justify-content: space-between;
}
/* .atlas-item-footer .footer-left {

}
.atlas-item-footer .footer-right {
  text-align: right;
} */
.atlas-item-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 行数 */
}
.follow-button {
  border: 1px solid rgb(204, 0, 0);
  color: rgb(204, 0, 0);
  height: 14px;
  letter-spacing: 4px;
  font-size: 12px;
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
}
.menu-item {
  width: 100%;
  /* text-align:center; */
  /* border-bottom: 1px solid black; */
}
.mu-dialog-wrapper >>> .mu-dialog-body {
  padding: 0;
}
.atlas-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* margin: 10px 0 10px 0; */
  font-size: 15px;
}
.atlas-content.fold {
  -webkit-line-clamp: 2;
}
.atlas-content.unfold {
  -webkit-line-clamp: 100;
}
.show {
  font-size: 13px;
  color: cornflowerblue;
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
.demo-chip {
  line-height: 22px;
  margin-right: 5px;
}
</style>
