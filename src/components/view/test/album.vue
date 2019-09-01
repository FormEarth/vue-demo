<template>
  <div class="album-container">
    <div class="pop-container" v-show="showpop" @click="closePop" @touchmove.prevent>
      <!-- @click.stop阻止click事件冒泡，即click事件在此处什么都不会做 -->
      <div class="show-container" @click.stop>
        <img :src="picture" />
      </div>
    </div>
    <div class="nav-container">
      <div>过往&序章</div>
    </div>
    <!-- <div class="photos-container"> -->
    <transition-group name="photo" class="photos-container">
      <div class="photo-item" v-for="img in imgs" :key="img" @click="showPop()">
        <img :src="picture" alt="图片" />
      </div>
    </transition-group>
    <mu-flex justify-content="center">
      <mu-pagination raised circle :total="100" :page-count="5" :current.sync="current"></mu-pagination>
    </mu-flex>
    <!-- </div> -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "@/components/public/Footer";

export default {
  name: "album",
  data() {
    return {
      imgs: [1, 2, 3, 4, 5,6,7,8],
      picture: require("@/assets/images/test5.jpg"),
      showpop: false,
      current: 1
    };
  },
  methods: {
    showPop() {
      this.showpop = true;
    },
    closePop() {
      this.showpop = false;
    },
    addElement() {
      this.imgs.push(this.imgs.length + 1);
    },
    subtractElement() {
      this.imgs.pop();
    }
  },
  components: {
    //自定义组件的名称不能和已有的html标签重复，否则无法解析
    "my-footer": Footer
  }
};
</script>

<style>
.album-container {
  height: 100%;
  width: 100%;
  /* margin: 0 5%; */
  background-color: gainsboro;
  padding-top: 20px;
}
.pop-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.nav-container {
  height: 7%;
  width: 90%;
  margin: 0 5% 20px 5%;
  background-color: rgba(240, 238, 238, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  transition: all 2s;
  -webkit-transition: all 2s;
}
.nav-container:hover {
  color: red;
  transition: all 1s;
}
.photos-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0px 5%;
}
.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s;
}
.show-container img {
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 800px) {
  .show-container {
    margin-top: 3%;
    width: 60%;
    margin-left: 20%;
  }
  .photo-item {
    width: 23%;
    background-color: azure;
    border: 8px white solid;
    /* padding: 10px; */
    margin: 1%;
  }
  .photo-item img:hover {
    transform: scale(1.1); /* 元素放大1.4倍 */
    transition: all 1s; /* 元素在0.5s内完成动画 */
    cursor: pointer;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .show-container {
    margin-top: 12%;
    width: 80%;
    margin-left: 10%;
  }
  .photo-item {
    width: 31%;
    background-color: azure;
    border: 5px white solid;
    /* padding: 10px; */
    margin: 1%;
  }
}
@media screen and (max-width: 600px) {
  .album-container {
    height: 130%;
  }
  .show-container {
    margin-top: 25%;
    width: 100%;
    /* margin-left: 20%; */
  }
  .photo-item {
    width: 48%;
    background-color: azure;
    border: 5px white solid;
    /* padding: 10px; */
    margin: 1%;
  }
}
</style>