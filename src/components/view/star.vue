<template>
  <mu-container>
    <mu-paper :z-depth="0" class="home-paper">
      <mu-appbar color="primary">
        <mu-button icon slot="left">
          <mu-icon value="whatshot"></mu-icon>
        </mu-button>
        <mu-button icon slot="right">
          <mu-icon value="search"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list textline="three-line" dense style="background-color: rgb(201, 223, 218);">
        <!-- <mu-sub-header style="background-color: white">图集推荐</mu-sub-header> -->
        <div v-for="atlas in atlases" :key="atlas.id">
          <atlas-list style="margin-bottom:3px;" :atlas="atlas"></atlas-list>
        </div>
      </mu-list>
    </mu-paper>
    <app-footer param="star"></app-footer>
  </mu-container>
</template>
<script>
import AtlasList from "@/components/public/AtlasList.vue";
import { artices } from "@/axios/api";

export default {
  name: "star",
  data() {
    return {
      open: false, //写文章按钮是否展开,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg"),
      atlases: [
        {
          id: "130",
            type: "atlas", //类型为图集
            proportion: false,//图片是否等比
            title: "这是个图集",
            picture:
              "http://image.9game.cn/2017/11/13/18553901.jpg",
            avatar: require("@/assets/images/carousel1.jpg"),
            author: "高天原",
            content1:"今天好高兴出来玩",
            content:
              "今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩",
            sendTime: "2019/05/01 15:33:14",
            tags: "原创|图集"
        },
        {
          id: "131",
            type: "atlas", //类型为图集
            proportion: true,//图片是否等比
            title: "这是个图集",
            picture:
              "http://image.9game.cn/2017/11/13/18553901.jpg|http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://www.lzshuli.com/game_images/105317829.jpeg",
            avatar: require("@/assets/images/carousel1.jpg"),
            author: "花间舞",
            content:"王者荣耀好好玩",
            sendTime: "2019/05/04 15:33:14",
            tags: "王者荣耀|图集"
        },
        {
          id: "132",
            type: "atlas", //类型为图集
            proportion: false,//图片是否等比
            title: "这是个图集",
            picture:
              "http://image.9game.cn/2017/11/13/18553901.jpg|http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg",
            avatar: require("@/assets/images/carousel1.jpg"),
            author: "花间舞",
            content:"王者荣耀好好玩",
            sendTime: "2019/05/04 19:33:14",
            tags: "王者荣耀|图集"
        },
        {
          id: "133",
            type: "atlas", //类型为图集
            proportion: false,//图片是否等比
            title: "这是个图集",
            picture:
              "http://image.9game.cn/2017/11/13/18553901.jpg|http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://image.9game.cn/2017/11/13/18553901.jpg",
            avatar: require("@/assets/images/carousel1.jpg"),
            author: "李白",
            content:"大河之剑天上来",
            sendTime: "2019/05/04 20:33:14",
            tags: "王者荣耀|图集"
        },
        {
          id: "134",
            type: "atlas", //类型为图集
            proportion: false,//图片是否等比
            title: "这是个图集",
            picture:
              "http://image.9game.cn/2017/11/13/18553901.jpg|http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://image.9game.cn/2017/11/13/18553901.jpg|http://image.9game.cn/2017/11/13/18553901.jpg",
            avatar: require("@/assets/images/carousel1.jpg"),
            author: "李信",
            content:"大河之剑天上来",
            sendTime: "2019/05/03 20:33:14",
            tags: "王者荣耀|图集"
        }
      ]
    };
  },
  //created()是一个函数
  created(){
    // artices().then(response => {
    //       const artices = response.data.data
    //       this.artices = artices
    //     });
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    goArticle(id) {
      var url = "/home/artice/get/" + id;
      this.$router.push(url);
    },
  },
  components: {
    "atlas-list": AtlasList
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.home-paper {
  padding-top: 58px;
  padding-bottom: 56px;
  width: 100%;
  /* max-width可能会导致大屏幕填充不满的情况 */
  max-width: 500px;
  overflow: hidden;
}
.mu-list{
  padding: 0px;
}
.mu-appbar {
  max-width: 500px;
  min-width: 350px;
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0px;
}
.mu-avatar img {
  /* color: rgb(207, 207, 218); */
  border-radius: 0%;
  background-color: rgb(201, 223, 218);
}

</style>