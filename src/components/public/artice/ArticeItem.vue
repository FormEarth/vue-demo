<template>
  <div class="artice-item" @click="$router.push('/home/artice/detail/'+ artice.articeId)">
    <div class="artice-img">
      <img :src="image_access_url+artice.frontCover" alt="图片" />
    </div>
    <div class="artice-content">
      <div class="content-header">{{artice.title}}</div>
      <div class="content">{{artice.summary}}</div>
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
    artice: {}
  },
  data() {
    return {
      image_access_url : 'http://127.0.0.1:9090'
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

