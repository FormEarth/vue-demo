<template>
  <mu-paper :z-depth="0">
    <div class="long-artice" v-if="type=='long-artice'" @click="goArticle(artice.id)">
      <div class="header">
        <span style="font-size:15px;font-weight:bold;">{{artice.title}}</span>
        <mu-chip color="blue100" text-color="black" v-show="getFirstTag!=''">#{{getFirstTag}}</mu-chip>
        <!-- <mu-icon value="close" sixe="12" style="float:right;"></mu-icon> -->
      </div>
      <div class="list-item" v-if="hasPicture">
        <div class="left">
          <img :src="artice.picture" :onerror="defaultImg">
        </div>
        <div class="right">
          <div class="right-top" style="height: 73%;">{{artice.content}}</div>
          <div class="right-bottom">
            <span style="position:absolute;bottom:0px; ">{{artice.author}}&nbsp;{{artice.sendTime}}</span>
            <!-- <span style="position:absolute;right:0px;bottom:0px;">123 阅读</span> -->
          </div>
        </div>
      </div>
      <div class="list-item" v-else>
        <div class="only-font">
          <div class="right-top">{{artice.content}}</div>
          <div>
            <span>{{artice.author}}</span>
          &nbsp;{{artice.sendTime}}
          <!-- <span style="float:right">123 阅读</span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 以下是图集 -->
    <div class="atlas" v-if="type=='atlas'" @click="goPictures(artice.id)">
      <div class="flag flag-left">图集</div>
      <div class="atlas-item">
        <div class="atlas-item-content">
          <div class="atlas-item-img" v-for="(image,index) in pictureArray" :key="index">
            <img :src="image" :onerror="defaultImg">
          </div>
        </div>
        <div class="atlas-item-header">
          <div class="van-ellipsis">{{artice.content}}</div>
        </div>
        <div class="atlas-item-footer">
          <mu-chip color="green300" text-color="black" v-show="getFirstTag!=''">#{{getFirstTag}}</mu-chip>
          <span>{{artice.author}}</span>
          &nbsp;{{artice.sendTime}}
          <!-- <span style="float:right">123 阅读 &nbsp;</span> -->
        </div>
      </div>
    </div>
  </mu-paper>
</template>
<script>
export default {
  name: "ArticeList", //首页列表组件
  props: {
    artice: {
      //作品对象
      type: Object
    },
    type: {
      //类型，区分长文和图文
      type: String,
      default: "long-artice"
    }
  },
  data() {
    return {};
  },
  computed: {
    // 计算属性，判断文章是否有图片
    hasPicture: function() {
      return this.artice.picture == "" ? false : true;
    },
    //将tags字符串转换为数组
    getFirstTag: function() {
      //若没有tags，将值转换成空字符串
      if (
        !this.artice.tags ||
        this.artice.tags == "undefined" ||
        this.artice.tags == "null"
      )
        this.artice.tags = "";
      return this.artice.tags.split("|")[0];
    },
    //返回前三张图片数组
    pictureArray: function() {
      var pictures;
      if (
        !this.artice.picture ||
        this.artice.picture == "undefined" ||
        this.artice.picture == "null"
      ) {
        pictures = "";
      } else {
        pictures = this.artice.picture;
      }
      const temp = pictures.split("|");
      return temp.slice(0, 4);
    },
    //默认加载的图片
    defaultImg () {
      return 'this.src="'+ require('@/assets/broken_image.jpg') +'"'
    }
  },
  filters: {
  },
  methods: {
    goArticle(id) {
      var url = "/home/artice/detail/" + id;
      this.$router.push(url);
    },
    goPictures(id) {
      var url = "/home/atlas/detail/" + id;
      this.$router.push(url);
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
.list-item {
  display: flex;
  padding-right: 8px;
  padding-left: 8px;
}
.left {
  width: 30%;
  min-height: 80px;
  max-height: 100px;
  max-width: 150px;
}
.left img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.right {
  width: 70%;
  max-height: 100px;
  padding-left: 3px;
  /* height: 100px; */
}
.right-top {
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;/* 行数 */
}
.right .right-bottom {
  position: relative;
  height: 27%;
}
.header {
  padding-right: 8px;
  padding-left: 8px;
  /* border-bottom: 1px solid rgb(219, 216, 216); */
}
.mu-chip {
  line-height: 18px;
}
.atlas {
  position: relative;
  overflow: hidden;
}
.atlas .flag {
  position: absolute; /*绝对定位*/
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 74px;
  background-color: #81c784;
  color: #fff;
}
.atlas .flag-left {
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  left: -18px;
  top: 9px;
}
.atlas-item .atlas-item-content {
  display: flex;
  padding-left: 8px;
}
.atlas-item .atlas-item-content .atlas-item-img {
  /* border: 1px solid black; */
  width: 25%;
  height: 22vw;
  max-height: 116.25px;
  min-height: 81.38px;
  margin: 0 0.5% 0 0.5%;
}
.atlas-item-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.atlas-item .atlas-item-footer {
  padding-left: 8px;
}
.atlas-item .atlas-item-header{
  padding-left: 8px;
}
</style>
