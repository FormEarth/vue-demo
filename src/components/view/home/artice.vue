<template>
  <mu-container>
    <mu-appbar color="white" textColor="black" :title="artice.title">
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
    <mu-card>
      <mu-card-media>
        <img :src="picture">
      </mu-card-media>
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
        <div style="width:30%;margin-top:5px;text-align:right;padding-right:10px;">123 阅读</div>
      </div>
      <div style="padding:5px 10px 5px 10px;">
        <mu-chip class="demo-chip" color="blue100" v-for="tag in tagArray" :key="tag">#{{tag}}</mu-chip>
      </div>
      <mu-card-text>
        <!-- <artice-content :content="value" :artice-style="artice.style"></artice-content> -->
        <mavon-editor v-model="value1" :toolbarsFlag="false" :boxShadow="false" 
          :codeStyle="artice.codeStyle" :subfield="false" :defaultOpen="defaultOpen" />
      </mu-card-text>
      <!-- <mu-divider></mu-divider> -->
      <mu-card-actions style="white-space: nowrap">
        <mu-badge content="12" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge content="999+" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="thumb_down"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-badge content="1" circle class="demo-icon-badge">
          <mu-button icon>
            <mu-icon value="share"></mu-icon>
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
import ArticeContent from "@/components/public/ArticeContent.vue";

export default {
  name: "artice",
  data() {
    return {
      picture: require("@/assets/images/carousel1.jpg"),
      star: false,
      open: false,
      toTopIsShow: false,
      defaultOpen: "preview",
      artice: {
        codeStyle: "googlecode",
        title: "午后时光",
        comment: false,
        datatime: "2019-3-17 16:03",
        author: "花间舞",
        tags:"原创|文学|读书笔记",
        content:
          "散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！"
      },
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
      value1: "> 没有什么是永恒的\n\n散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = \"Hello World!\" \n\nSystem.out.println(str);\n```\n\n**文字加粗了**"
    };
  },
  computed:{
    //切割标签为数组
    tagArray:function(){
      if(this.artice.tags==''){
        return;
      }
      return this.artice.tags.split("|");
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
    toTop() {
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop = 0;
      }
    },
    goInfo(){
      this.$router.push("/mine/info");
    }
  },
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
  },
  components: {
    "artice-content": ArticeContent
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
</style>