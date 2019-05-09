<template>
  <mu-container>
    <mu-appbar color="white" textColor="black" title="文章详情">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-menu slot="right">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="starArtice">
            <mu-list-item-content v-if="star" style="display:flex;">
              <mu-slide-top-transition>
                <mu-icon value="turned_in" color="green" size="24"></mu-icon>
              </mu-slide-top-transition>
              <div style="margin-top:3px;margin-left:5px;">已收藏</div>
            </mu-list-item-content>
            <mu-list-item-content v-else style="display:flex;">
              <mu-slide-top-transition>
                <mu-icon value="turned_in_not" color="black" size="24"></mu-icon>
              </mu-slide-top-transition>
              <div style="margin-top:3px;margin-left:5px;">收藏</div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content style="display:flex;">
              <mu-icon value="sentiment_very_dissatisfied" color="black" size="24"></mu-icon>
              <div style="margin-top:3px;margin-left:5px;">不感兴趣</div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="openBotttomSheet">
            <mu-list-item-content style="display:flex;">
              <mu-icon value="warning" color="redA700" size="24"></mu-icon>
              <div style="margin-top:3px;margin-left:5px;">举报</div>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-card>
      <mu-card-media>
        <img :src="picture">
      </mu-card-media>
      <div class="title">{{artice.title}}</div>
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
        <div
          style="width:30%;margin-top:5px;text-align:right;padding-right:10px;"
        >{{artice.readerNum}} 阅读</div>
      </div>
      <div style="padding:5px 10px 5px 10px;">
        <mu-chip
          class="demo-chip"
          color="blue100"
          text-color="black"
          v-for="tag in tagArray"
          :key="tag"
        >#{{tag}}</mu-chip>
      </div>
      <!-- <mu-card-text> -->
      <!-- <artice-content :content="value" :artice-style="artice.style"></artice-content> -->
      <!-- <mavon-editor
        class="editor"
        v-model="artice.content"
        :toolbarsFlag="false"
        :boxShadow="false"
        :codeStyle="artice.codeStyle"
        :subfield="false"
        :defaultOpen="defaultOpen"
      />-->
      <!-- </mu-card-text> -->
      <!-- <mu-divider></mu-divider> -->
      <vue-showdown
        class="artice-content"
        :markdown="content"
        flavor="vanilla"
        :options="{ emoji: true }"
      ></vue-showdown>
      <mu-card-actions style="white-space: nowrap">
        <mu-badge :content="artice.approval" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge :content="artice.oppose" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_down"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge :content="artice.favorite" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="favorite"></mu-icon>
          </mu-button>
        </mu-badge>
      </mu-card-actions>
      <mu-divider></mu-divider>
      <mu-card-actions v-if="!artice.comment" style="text-align:center;font-size:16px;">
        <mu-icon value="speaker_notes_off"></mu-icon>
        <br>评论已被作者关闭
      </mu-card-actions>
      <!-- <mu-divider></mu-divider> -->
      <mu-card-actions
        style="text-align:center;padding-top:0px;"
      >文章由作者发布于本平台，版权属作者所有，文章不代表本站观点，若有侵权，请联系管理员</mu-card-actions>
    </mu-card>
    <mu-button fab class="toTop" color="indigo" @click="toTop" v-show="toTopIsShow">
      <mu-icon value="arrow_upward"></mu-icon>
    </mu-button>
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
import { VueShowdown } from "vue-showdown";
import { articeDetail } from "@/axios/api";

export default {
  name: "artice",
  data() {
    return {
      picture: require("@/assets/images/carousel1.jpg"),
      star: false,
      open: false,
      toTopIsShow: false,
      defaultOpen: "preview",
      artice: {},
      content:
        '# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n> 没有什么是永恒的,散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影\n\n[一个链接](www.baidu.com)散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。`强调`我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\nString str = "Hello World!" \nSystem.out.println(str);\n```\n> 没有什么是永恒的\n\n1. 1.第一\n2. 2.第二\n3. 3.第三\n\n- 1\n- 2\n- 3\n\n**文字加粗了**\n==标记==',
      converter: null,
      value: `<blockquote><p>引言</p></blockquote>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            <code>
            jdesktop.browse(new URI("http://www.baidu.com"));
				    desktop.edit(new File("F:/1.txt"));
				    desktop.open(new File("F:/1.txt"));
            desktop.print(new File("F:/1.txt"));</code>
        <blockquote>"散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！"
        </blockquote>
        <p>“那时候最大的梦想是一辈子和好友住在一起，大锅煮鸡，大屋同居。我想象那间大屋的外墙上爬满爬山虎，盛夏时是墨绿的，秋来是金黄的，我在下午的阳光里醒来推开窗，嘲笑那个刻苦的损友在院子里死读书。”——江南《此间的少年》</p>
        “那时候最大的梦想是一辈子和好友住在一起，大锅煮鸡，大屋同居。我想象那间大屋的外墙上爬满爬山虎，盛夏时是墨绿的，秋来是金黄的，我在下午的阳光里醒来推开窗，嘲笑那个刻苦的损友在院子里死读书。”——江南《此间的少年》`,
      value1:
        '> 没有什么是永恒的\n\n散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = "Hello World!" \n\nSystem.out.println(str);\n```\n\n**文字加粗了**'
    };
  },
  //created()在页面生成之前调用，一般是加载页面所需要的数据
  created() {
    var _this = this;
    window.onscroll = function() {
      //鼠标滚轮滚动距离超过10像素时，回到顶部按钮才显示
      if (document.documentElement.scrollTop > 10) {
        _this.toTopIsShow = true;
      } else {
        _this.toTopIsShow = false;
      }
    };
    articeDetail().then(response => {
      this.artice = response.data.data;
    });
  },
  //mounted()在页面生成之后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    //加载markdown转html
    // this.showmarkdown();
  },
  computed: {
    //切割标签为数组
    tagArray: function() {
      if (typeof this.artice.tags == "undefined") {
        return;
      }
      return this.artice.tags.split("|");
    }
  },
  methods: {
    showmarkdown() {
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      this.converter = converter;
      var html = this.converter.makeHtml(this.content);
      document.getElementById("show-content").innerHTML = html;
    },
    starArtice() {
      console.log(this.star);
      if (this.star) {
        this.star = false;
        this.$toast.success("取消收藏成功");
        //Toast.success('取消收藏成功');
      } else {
        this.star = true;
        this.$toast.success("收藏成功");
      }
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    toTop() {
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop = 0;
      }
    },
    goInfo() {
      this.$router.push("/mine/info");
    }
  },
  components: {
    "vue-showdown": VueShowdown
  }
};
</script>
<style scoped>
a {
  color: blue;
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
.title {
  padding-top: 3px;
  padding-left: 10px;
  /* font-size: 18px; */
  font-size: larger;
  font-weight: bold;
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
  padding: 0px;
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
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.demo-badge-content {
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;
}
.toTop {
  position: fixed;
  z-index: 2;
  right: 16px;
  bottom: 60px;
}
.artice-content >>> {
  color: #34495e;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6rem;
  letter-spacing: 0;
  margin: 0;
  overflow-x: hidden;
}
.artice-content >>> p {
  line-height: 1.6rem;
  word-spacing: 0.05rem;
}
.artice-content >>> blockquote {
  border-left: 4px solid #42b983;
  padding: 10px 15px;
  color: #777;
  background-color: rgba(66, 185, 131, 0.1);
  margin-inline-start: 0;
  margin-inline-end: 0;
}
.artice-content >>> a {
  color: #42b983;
  font-weight: 600;
  padding: 0 2px;
  text-decoration: none;
}
.artice-content >>> h1,
h2,
h3,
h4,
h5 {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  line-height: 1.4;
  cursor: text;
}
.artice-content >>> h1 {
  font-size: 1.4rem;
  line-height: 1.4;
}
.artice-content >>> h2 {
  font-size: 1.3rem;
  line-height: 1.3;
  margin: 25px 0 15px;
  padding-bottom: 0.5em;
  /* border-bottom: 1px solid #ddd; */
}
.artice-content >>> h3 {
  font-size: 1.2rem;
  line-height: 1.2;
  margin: 20px 0 7px;
}
.artice-content >>> h4 {
  font-size: 1.1rem;
}
.artice-content >>> h5 {
  font-size: 1rem;
}
.artice-content >>> code,
tt {
  margin: 0 2px;
  padding: 2px 4px;
  border-radius: 2px;
  font-family: Roboto Mono, Source Sans Pro, Monaco, courier, monospace !important;
  font-size: 0.92rem;
  color: #e96900;
  background-color: #f8f8f8;
}
.artice-content >>> ol li {
  text-indent: 0.5rem;
}
.artice-content >>> ul:first-child,
.artice-content >>> ol:first-child {
  margin-top: 30px;
}
.artice-content >>> p,
blockquote,
ul,
ol,
dl,
table {
  margin: 0.8em 0;
}
.artice-content >>> li{
  list-style:square;
}
.artice-content >>> li > ol,
li > ul {
  margin: 0 0;
}
.artice-content >>> li p.first {
  display: inline-block;
}
.artice-content >>> ul,
ol {
  padding-left: 30px;
}
.artice-content >>> ul:first-child,
ol:first-child {
  margin-top: 0;
}
.artice-content >>> ul:last-child,
ol:last-child {
  margin-bottom: 0;
}
</style>

