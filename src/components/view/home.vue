<template>
  <mu-container>
    <mu-paper :z-depth="0" class="home-paper">
      <mu-appbar color="redA700">
        <mu-button icon slot="left">
          <mu-icon value="whatshot"></mu-icon>
        </mu-button>
        <mu-button icon slot="right">
          <mu-icon value="search"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list textline="three-line" dense style="background-color: rgb(207, 207, 218);">
        <mu-sub-header style="background-color: white">热门推荐</mu-sub-header>
        <div v-for="artice in artices" :key="artice.id">
          <artice-list
            style="margin-bottom:3px;"
            :artice="artice"
            :type="artice.type"
          ></artice-list>
        </div>
      </mu-list>
      <!-- <mu-button fab class="writeArtice" color="redA700" to="/home/artice/add">
      <mu-icon value="add" size="36"></mu-icon>
      </mu-button>-->
      <div class="addButton">
        <mu-slide-left-transition>
          <mu-button v-show="this.open" style="margin-bottom:8px;">
            发布图集
            <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
          </mu-button>
        </mu-slide-left-transition>
        <mu-slide-right-transition>
          <mu-button v-show="this.open" to="/home/artice/add" style="margin-bottom:8px;">
            写长文
            <!-- <mu-icon right value="edit" color="redA700"></mu-icon> -->
          </mu-button>
        </mu-slide-right-transition>
        <mu-slide-bottom-transition>
          <mu-button v-show="this.open" style="margin-bottom:8px;">写短文</mu-button>
        </mu-slide-bottom-transition>
        <mu-scale-transition>
        <mu-button fab color="redA700" v-if="!open" @click="change">
          <mu-icon value="add" size="38"></mu-icon>
        </mu-button>
        <mu-button fab color="redA700" v-else @click="change">
          <mu-icon value="close" size="38"></mu-icon>
        </mu-button>
        </mu-scale-transition>
      </div>
    </mu-paper>
    <app-footer param="home"></app-footer>
    <!-- <router-view></router-view> -->
  </mu-container>
</template>
<script>
import ArticeList from "@/components/public/ArticeList.vue";
export default {
  name: "home",
  data() {
    return {
      open: false, //写文章按钮是否展开,
      selects: [],
      picture: require("@/assets/images/carousel1.jpg"),
      artices: [
        {
          id: "123",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/carousel1.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "“您太天真了，所有死物的命运不过是受活人需要来驱动罢了，您认为能够流传的，不过是它们还有被需要和利用的价值而已，所以说永恒才是最虚假的玄幻啊。”西装笔挺的秘书长摘掉了他的眼镜，文质彬彬的气息一下子从他身上流走了。取而代之的是一种不可见底的深不可测。",
          sendTime: "2019-04-08 20:33:14",
          tags:"原创|历史"
        },
        {
          id: "124",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/carousel1.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          sendTime: "2019-04-08 20:33:14",
          tags:"日记"
        },
        {
          id: "130",
          type:"atlas",//类型为图集
          title: "这是个图集",
          picture:"http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://www.lzshuli.com/game_images/105317829.jpeg|http://img3.imgtn.bdimg.com/it/u=234200694,2958848013&fm=26&gp=0.jpg|https://www.xiazaiba.com/uploadfiles/content/2017/1117/water_1510903919594499.png|http://image.9game.cn/2017/11/13/18553901.jpg",
          author: "高天原",
          url: "/home/artice",
          content:"今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩",
          sendTime: "2019-04-08 20:33:14",
          tags:"原创|图集"
        },
        {
          id: "125",
          title: "盛名之下，其实难却",
          picture: require("@/assets/logo.png"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          sendTime: "2019-04-08 20:33:14",
          tags:"读书笔记|西游记"
        },
        {
          id: "126",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/404.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          tags:"原创|历史"
        },
        {
          id: "127",
          title: "盛名之下，其实难却",
          picture: "",
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "“您太天真了，所有死物的命运不过是受活人需要来驱动罢了，您认为能够流传的，不过是它们还有被需要和利用的价值而已，所以说永恒才是最虚假的玄幻啊。”西装笔挺的秘书长摘掉了他的眼镜，文质彬彬的气息一下子从他身上流走了。取而代之的是一种不可见底的深不可测。",
          tags:"原创|历史"
        },
        {
          id: "128",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/test1.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          tags:"原创|历史"
        },
        {
          id: "129",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/test2.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？"
        }
      ]
    };
  },
  methods: {
    changeUrl(url) {
      this.$router.push(url);
    },
    goArticle(id) {
      var url = "/home/artice/get/" + id;
      this.$router.push(url);
    },
    goRegister() {
      this.$router.push("/register");
    },
    change() {
      this.open ? (this.open = false) : (this.open = true);
    }
  },
  components: {
    "artice-list": ArticeList
  }
};
</script>
<style scoped>
.container {
  /* background-color: azure; */
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width:350px;
}
.home-paper {
  padding-top: 58px;
  padding-bottom: 56px;
  width: 100%;
  /* max-width可能会导致大屏幕填充不满的情况 */
  max-width: 500px;
  overflow: hidden;
}
.mu-appbar {
  max-width: 500px;
  min-width:350px;
  width: 100%;
  position: fixed;
  top: 0px;
}
.mu-avatar img {
  /* color: rgb(207, 207, 218); */
  border-radius: 0%;
}
.addButton {
  width: 20%;
  position: fixed;
  right: 12px;
  bottom: 60px;
  display: flex;
  flex-direction: column;
}
</style>

