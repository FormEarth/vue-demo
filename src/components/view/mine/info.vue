<template>
  <mu-container>
      <div class="user-card" :style="header" style="z-index:1000;">
        <div style="display:flex;justify-content:space-between;height:50px;">
          <mu-button icon slot="left" :ripple="false" @click="$router.back(-1)">
            <mu-icon value="arrow_back" color="white"></mu-icon>
          </mu-button>
          <mu-button icon slot="right">
            <mu-icon value="more_vert" color="white"></mu-icon>
          </mu-button>
        </div>
        <div>
          <div class="user-avatar" style="display:flex;z-index:100;">
            <img :src="user.avatar" alt="用户头像" />
            <div style="text-align:right;padding:14px 10px 0 0;width:100%;">
              <!-- <mu-button round color="greenA700" small>关注</mu-button> -->
              <mu-button color="white" textColor="black" round small>
                <mu-icon value="edit"></mu-icon>编辑
              </mu-button>
              <!-- <mu-button fab small >
              <mu-icon value="email"></mu-icon>
              </mu-button>-->
            </div>
          </div>

          <div style="color:rgba(255,255,255,0.9);padding-left:3%;z-index:100;">
            <div style="margin:20px 0 0px 0;letter-spacing:0.1em;">
              <div class="user-name">{{user.userName}}</div>
              <div>{{user.sign}}</div>
              <div>个人简介:</div>
              {{user.personalProfile}}
            </div>
            <div>
              <div class="data-item" :z-depth="0">
                12
                <label>&nbsp;关注</label>
              </div>
              <div class="data-item" :z-depth="0">
                99
                <label>&nbsp;粉丝</label>
              </div>
              <div class="data-item" :z-depth="0">
                23
                <label>&nbsp;动态</label>
              </div>
              <div class="data-item" :z-depth="0">
                12k
                <label>&nbsp;获赞</label>
              </div>
            </div>
            <demo-tag color="white" ellipse small></demo-tag>
            <demo-tag color="white" ellipse small>一个 绅士</demo-tag>
          </div>
        </div>
      </div>
    <mu-tabs
      :value.sync="active"
      indicator-color="red"
      inverse
      full-width
      style="position:sticky;top:0;"
    >
      <mu-tab>图集</mu-tab>
      <mu-tab>文章</mu-tab>
      <mu-tab>喜欢</mu-tab>
    </mu-tabs>
    <atlas-list withUser></atlas-list>

    <div class="demo-text" v-if="active === 0">
      <p>“……是的，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
    </div>
    <div class="demo-text" v-if="active === 1">
      <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
      <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
      <p>“那么就去地狱找到你，我绝对不逃！”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
    </div>
    <div class="demo-text" v-if="active === 2">
      <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
      <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
      <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
      <p>“也许吧，未来……给你了。”</p>
    </div>
  </mu-container>
</template>
<script>
import AtlasList from "@/components/view/home/atlas/atlasList.vue";

export default {
  name: "info",
  data() {
    return {
      showHeader: true,
      open: "send",
      active: 0,
      user: {
        name: "Nidhogg",
        sign: "曾经沧海难为水，除却巫山不是云",
        avatar: require("@/assets/images/carousel2.jpg")
      },
      header: {
        backgroundImage: "url(" + require("@/assets/images/test6.jpg") + ")",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
        // height: "250px"
      },
      articles: [
        {
          id: "129",
          title: "盛名之下，其实难却",
          picture: require("@/assets/images/test2.jpg"),
          from: "历史之窗",
          author: "Nidhogg",
          url: "/home/article",
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
          url: "/home/article",
          content:
            "今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩今天好高兴出来玩",
          sendTime: "2019-04-08 20:33:14",
          tags: "原创|图集"
        }
      ],
      favorites: []
    };
  },
  created() {
    console.log(this.$route.params.userId);
    if (this.$store.getters.isLogin) {
      this.user = this.$store.state.current_user;
    } else {
      //TODO 查询用户
    }
    // 获取地理位置信息,（需要https支持……）
    // navigator.geolocation.getCurrentPosition(this.geoHandler, this.errorHandler, {
    //   enableHighAccuracy: true,
    //   maximumAge: 1000
    // })
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll, false);
  },
  components: {
    AtlasList
  },
  methods: {
    scroll() {
      // var offsetTop = document.querySelector('#searchBar').offsetTop;
      // console.log("offsetTop:"+offsetTop)
      if (document.documentElement.scrollTop > 249) {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    },
    geoHandler(position) {
      var geoMsg = "";
      geoMsg += "timestamp属性为：" + position.timestamp;
      // 获取Coordinates对象，该对象里包含了详细的地理位置信息
      var coords = position.coords;
      // 遍历Coordinates对象的所有属性
      for (var prop in coords) {
        geoMsg += prop + "-->" + coords[prop];
      }
      // 输出地理位置信息
      console.log(geoMsg);
    },
    errorHandler(error) {
      // 为不同错误代码定义错误提示
      var errMsg = {
        1: "用户拒绝了位置服务",
        2: "无法获取地址位置信息",
        3: "获取地理位置信息超时"
      };
      // 弹出错误提示
      alert(errMsg[error.code]);
    }
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
/* .user-card {
  width: 100%;
  height: 120px;
} */
.user-card .user-avatar {
  width: 100%;
  height: 62px;
  padding-top: 0px;
  padding-left: 6%;
}
.user-card .user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid white;
}
.user-name {
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
.data-item {
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
}
.data-item label {
  font-size: 14px;
  font-weight: bolder;
}
</style>