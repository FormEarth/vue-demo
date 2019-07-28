<template>
  <div class="artice-item">
    <div class="artice-img">
      <img :src="artice.image" alt="图片" />
    </div>
    <div class="artice-content">
      <div class="content-header">{{artice.title}}</div>
      <div class="content">{{artice.content}}</div>
      <div class="content-footer">
        <span>{{artice.sendTime|time}}</span>
        <!-- <span>123<mu-icon size="18" value="local_offer" color="primary" style="margin-top:5px;"></mu-icon></span> -->
        <mu-chip
          class="demo-chip"
          color="blue100"
          text-color="black"
          v-for="tag in tagArray"
          :key="tag"
        >
          <mu-icon value="local_offer" color="primary" size="13"></mu-icon>
          {{tag}}
      </mu-chip>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util"
export default {
  name: "ArticeItem",
  props: {
    artices: {}
  },
  data() {
    return {
      artice: {
        image: require("@/assets/images/carousel1.jpg"),
        title: "这个是题目",
        content:
          "Windows 10 上一项功能 Windows 聚焦 ，它会自动随机下载并更换锁屏界面的壁纸 ，让你每次打开电脑都有不一样的视觉享受。这些高清锁屏壁纸往往都很精美，很多视觉冲击力十足，非常值得收藏，如果你遇到了非常喜欢的壁纸，不妨参考这个保存 Win10 锁屏壁纸的教程将其提取出来……",
        sendTime: "2019/05/01 15:33:14",
        tags:"Java|Springboot|restful"
      }
    };
  },
  filters:{
    time: function(value) {
      return util.dateSubtract(value);
    }
  },
  computed:{
    //切割标签为数组
    tagArray: function() {
      if (typeof this.artice.tags == "undefined") {
        return;
      }
      return this.artice.tags.split("|");
    }
  }
};
</script>

<style scoped>
.artice-item {
  display: flex;
  background-color: whitesmoke;
  border-radius: 5px;
  /* height: 110px; */
  margin-bottom: 10px;
}
.artice-item .artice-img {
  overflow: hidden;
  width: 27%;
}
.artice-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.artice-content .content-header {
  padding-left: 4px;
  font-size: 18px;
  /* font-weight: bold; */
}
.artice-content .content {
  padding: 0 10px;
  color: darkgray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 行数 */
}
.artice-content .content-footer {
  line-height: 1;
  padding-left: 4px;
  padding-bottom: 5px;
  color: rgb(88, 88, 88);
}
.demo-chip {
  line-height: 22px;
  margin-right: 5px;
}
@media screen and (min-width: 800px) {
  .artice-item .artice-img {
    width: 27%;
  }
  .artice-item .artice-content {
    width: 73%;
  }
  .artice-item .artice-content {
    width: 73%;
    border-left: 4px rgb(110, 110, 209) solid;
  }
  .artice-item:hover {
  /* transform: scale(1.1); 元素放大1.4倍 */
  transform: translateX(-10px);
  transition: all 1s; /* 元素在0.5s内完成动画 */
  cursor: pointer;
}
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .artice-item .artice-img {
    width: 27%;
  }
  .artice-item .artice-content {
    width: 73%;
  }
  .artice-item .artice-content {
    width: 73%;
    border-left: 4px rgb(110, 110, 209) solid;
  }
}
/* 宽度在300px~640px应用的css */
@media screen and (min-width: 300px) and (max-width: 600px) {
  .artice-item .artice-img {
    display: none;
  }
  .artice-item .artice-content {
    width: 100%;
  }
}
</style>

