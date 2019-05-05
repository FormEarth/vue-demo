<template>
  <mu-paper :z-depth="0">
    <div class="atlas-item">
      <div class="atlas-item-header">
        <div class="header-left" style="cursor: pointer;" @click="goInfo">
          <img :src="atlas.avatar" :onerror="defaultImg">
        </div>
        <div class="header-center">
          <div style="font-size:15px;line-height:15px;">
            {{atlas.author}}
            <!-- <span class="follow-button">关注</span> -->
          </div>
          <div style="line-height:16px;">
            上海市 松江区
            {{atlas.sendTime|time}}
          </div>
        </div>
        <div class="header-right">
          <mu-icon size="30" value="more_vert" @click="openAlertDialog" style="cursor: pointer;"></mu-icon>
        </div>
      </div>
      <!-- 轮播图模式 -->
      <div v-if="atlas.proportion">
        <van-swipe @change="onChange" :loop="false">
          <van-swipe-item v-for="(image, index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg" style="width: 100%;object-fit: cover;">
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{pictureArray.length}}</div>
        </van-swipe>
      </div>
      <!-- 预览模式 -->
      <div v-else>
        <div v-if="pictureArray.length==1">
          <div class="atlas-item-img-1" v-for="(image,index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg">
          </div>
        </div>
        <div v-else-if="pictureArray.length==2" style="display:flex;">
          <div class="atlas-item-img-2" v-for="(image,index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg">
          </div>
        </div>
        <div v-else style="display:flex;flex-wrap:wrap;">
          <div class="atlas-item-img-3" v-for="(image,index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg">
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
      <mu-chip style="line-height: 22px;margin-right: 5px;">#王者荣耀</mu-chip>
      <mu-chip style="line-height: 22px;margin-right: 5px;">#王者荣耀</mu-chip>
      <br>
      <div class="atlas-content" :class="fold ? 'fold' : 'unfold'">
        <div>
          <span style="font-weight: bold;">{{atlas.author}}:</span>
          <span>{{atlas.content}}</span>
        </div>
      </div>
      <div v-if="showButton">
        <div class="show" @click="handleFold" v-show="fold">更多</div>
        <div class="show" @click="handleFold" v-show="!fold">收起</div>
      </div>
    </div>123条评论
    <mu-dialog
      width="90%"
      :esc-press-close="false"
      :open.sync="openAlert"
      dialog-class="dialog-style"
    >
      <!-- <div class="menu-item"> <mu-icon value="star"></mu-icon>关注 {{atlas.author}}</div>
    <div class="menu-item">联系 {{atlas.author}}</div>
    <div class="menu-item">不看</div>
      <div class="menu-item">举报 </div>-->
      <mu-list>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="star_border"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>关注 {{atlas.author}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="mail_outline"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>mailto {{atlas.author}}</mu-list-item-title>
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
      </mu-list>
    </mu-dialog>
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
          <mu-list-item-title>其它</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @item-click="closeBottomSheet">
          <mu-list-item-title>取消</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </mu-paper>
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
export default {
  name: "AtlasList", //图集列表组件
  props: {
    atlas: {
      //图集对象
      type: Object
    }
  },
  data() {
    return {
      current: 0,//轮播图当前图片的索引
      openAlert: false,
      open: false,
      fold: true
    };
  },
  computed: {
    // 根据文本长度决定是否展示更多与收起按钮
    showButton: function() {
      return this.atlas.content.length >= 40 ? true : false;
    },
    //返回图片数组
    pictureArray: function() {
      var atlas;
      if (
        !this.atlas.picture ||
        this.atlas.picture == "undefined" ||
        this.atlas.picture == "null"
      ) {
        atlas = "";
      } else {
        atlas = this.atlas.picture;
      }
      return atlas.split("|");
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
    //   var url = "/home/artice/detail/" + id;
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
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    handleFold() {
      this.fold = !this.fold;
    },
    onChange(index) {
      this.current = index;
    }
  }
};
</script>
<style scoped>
.mu-paper {
  min-width: 350px;
  max-width: 500px;
  width: 100%;
  /* height: 125px; */
  /* max-height: 130px; */
}
.atlas-item-header {
  display: flex;
  height: 34px;
  padding: 2px 2px;
}
.header-left {
  width: 10%;
}
.header-center {
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 10px;
}
.header-right {
  width: 30%;
  text-align: right;
}
.header-left img {
  width: 30px;
  height: 30px;
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
}
.atlas-item-footer .footer-left {
  width: 60%;
}
.atlas-item-footer .footer-right {
  width: 40%;
  text-align: right;
}
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
</style>
