<template>
  <mu-container>
    <mu-paper :z-depth="0">
      <div class="user-card" :style="header">
        <div class="user-top" style="height:50px;">
          <mu-button icon slot="left" :ripple="false" @click="$router.back(-1)">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
        </div>
        <div class="user-avatar">
          <img :src="user.avatar" alt="用户头像">
          <span class="user-name">{{user.name}}</span>
        </div>
      </div>
      <div class="user-other">
        <div class="user-mini-card">
          <div>
            <span>{{user.sign}}</span>
          </div>
          <div>
            <span>个人简介:</span>这个人还没有填写简介哦
          </div>
        </div>
      </div>
      <div style="padding-left:2%;">
        <div class="data-item" :z-depth="0">
          <label>12</label>关注
        </div>
        <div class="data-item" :z-depth="0">
          <label>99</label>粉丝
        </div>
        <div class="data-item" :z-depth="0">
          <label>23</label>动态
        </div>
        <div class="data-item" :z-depth="0">
          <label>12k</label>获赞
        </div>
      </div>
    </mu-paper>
    <van-tabs v-model="active" swipeable>
      <van-tab van-tab title="文章">
        <div class="demo-text" v-if="active === 0" style="background-color:rgb(207, 207, 218)">
          <div v-for="artice in artices" :key="artice.id">
            <artice-list style="margin-bottom:3px;" :artice="artice" :type="artice.type"></artice-list>
          </div>
        </div>
      </van-tab>
      <van-tab van-tab title="图集">
        <div class="demo-text" v-if="active === 1">
          <div v-if="pictures==''" style="text-align:center;margin-top:4px;">还没有发布图集哦</div>
          <div v-else>
            <div v-for="artice in pictures" :key="artice.id">
              <artice-list style="margin-bottom:3px;" :artice="artice" :type="artice.type"></artice-list>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab van-tab title="喜欢">
        <div class="demo-text" v-if="active === 2">
          <div v-if="favorites==''" style="text-align:center;margin-top:4px;">还没有喜欢哦</div>
          <div></div>
        </div>
      </van-tab>
    </van-tabs>
  </mu-container>
</template>
<script>
import ArticeList from "@/components/public/ArticeList.vue";

export default {
  name: "info",
  data() {
    return {
      open: "send",
      active: 0,
      user: {
        name: "Nidhogg",
        sign: "曾经沧海难为水，除却巫山不是云",
        avatar: require("@/assets/images/carousel2.jpg")
      },
      header: {
        backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "120px"
      },
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
          tags: "原创|历史"
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
          tags: "日记"
        },
        {
          id: "125",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/carousel1.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          sendTime: "2019-04-08 20:33:14",
          tags: "日记"
        },
        {
          id: "126",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/carousel1.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/artice",
          content:
            "忘记历史即意味着背叛，然而还有多少人记起那战火里的惨无人道呢？",
          sendTime: "2019-04-08 20:33:14",
          tags: "日记"
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
      ],
      pictures: [
        {
          id: "130",
          type: "atlas", //类型为图集
          title: "这是个图集",
          picture:
            "http://uploads.5068.com/allimg/1712/151-1G202120Q9-50.jpg|http://www.lzshuli.com/game_images/105317829.jpeg|http://img3.imgtn.bdimg.com/it/u=234200694,2958848013&fm=26&gp=0.jpg|https://www.xiazaiba.com/uploadfiles/content/2017/1117/water_1510903919594499.png|http://image.9game.cn/2017/11/13/18553901.jpg",
          author: "高天原",
          url: "/home/artice",
          content:
            "今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩",
          sendTime: "2019-04-08 20:33:14",
          tags: "原创|图集"
        }
      ],
      favorites: []
    };
  },
  components: {
    "artice-list": ArticeList
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.user-card {
  width: 100%;
  height: 120px;
}
.user-card .user-avatar {
  width: 100%;
  height: 62px;
  padding-top: 0px;
  padding-left: 6%;
}
.user-card .user-avatar img {
  width: 60px;
  height: 60px;
  border: 1px solid white;
}
.user-avatar .user-name {
  height: 18px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 9px;
  /* margin-left: calc(50% - 30px); */
  /* text-align: left; */
}
.user-other {
  margin-top: 7px;
  padding-left: 2%;
}
.data-item{
  display: inline-block;
  margin-right: 10px;
}
.data-item label{
  font-weight: bolder;
}
</style>