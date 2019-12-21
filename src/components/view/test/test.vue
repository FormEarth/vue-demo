<template>
  <!-- <div class="test-all"> -->
  <!-- <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>
    <div>
      <mu-button color="redA700" @click="change">
        <mu-icon value="add"></mu-icon>
      </mu-button>
      <mu-button color="redA700" @click="change">
        <mu-icon value="remove"></mu-icon>
      </mu-button>
    </div>
    <div v-for="int in array" :key="int">
      <transition name="slide-fade">
        <div class="blank" v-show="show">transition test{{int}}</div>
      </transition>
    </div>
    <transition-group
      name="list"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >
      <div
        class="blank"
        v-show="show"
        v-for="(n,index) in array"
        :key="n"
        :data-delay="index*100"
        data-y="100%"
      >{{n}}</div>
    </transition-group>
    <div style="display:inline-block;width:100%;">
      <div id="show-content"></div>
  </div>-->
  <!-- <div class="box-container">
      <transition-group class="box-container" name="box" tag="div">
        <div class="box" v-for="(num,index) in array" :key="index+2">
          <div style="width:100%;height:70%;background-color:pink;">图片</div>
          <div style="width:100%;height:15%;">说明{{index}}</div>
          <div style="width:100%;height:15%;">说明{{num}}</div>
        </div>
      </transition-group>
    </div>
    <div>
      <mu-button color="redA700" @click="add">
        <mu-icon value="add"></mu-icon>
      </mu-button>
      <mu-button color="redA700" @click="remove">
        <mu-icon value="remove"></mu-icon>
      </mu-button>
    </div>
  </div>-->
  <!-- <div style="width:100%;display:flex;">
    <div style="width:30%;position:fixed;" >123</div>
    <div style="width:70%;position:fixed;right:0;top:75px;bottom:0;overflow-y: auto;">123</div>
  </div>-->
  <div class="root">
    <div class="test-shadow">
      <div
        class="text-ellipsis"
        :style="{lineClamp: line}"
        ref="test"
      >没有什么是永恒的\n\n散落在指尖的阳光，我试着轻轻抓住光影掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = "Hello World!" \n\nSystem.out.println(str);\n```\n> 没有什么是永恒的\n\n**文字加粗了</div>
      <div v-if="showButton">
        <div class="show" @click="handleFold" v-show="line!=100">展开更多</div>
        <div class="show" @click="handleFold" v-show="line==100">收起</div>
      </div>
    </div>
    <div style="with:100%;background-color:green;padding:10px;display:flex;flex-wrap:wrap;
            flex-direction:row;">
      <!-- <img
        src="http://192.168.2.105:9090/static/thumbnail/atlas/a7d8fefa9e2b44619e3c0a558bb505c8.jpg"
        style="max-width:100%;max-height:300px;vertical-align: middle;"
      /> -->
      <div>111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
      <div>22222222222222222222222222222222222222</div>
      <div>3333333333333</div>
    </div>
    <transition name="bottom-top">
      <div v-show="show" class="blur-effect">
        <div class="footer">
          <div style="display:flex;justify-content: space-around;">
            <div>
              <mu-icon value="post_add" color="red700"></mu-icon>
              <p>发布长文</p>
            </div>
            <div>
              <mu-icon value="burst_mode" color="Green"></mu-icon>
              <p>发布图集</p>
            </div>
            <div>
              <mu-icon value="notes" color="Orange"></mu-icon>
              <p>发布动态</p>
            </div>
          </div>
          <mu-icon value="close" size="38" @click="show=!show"></mu-icon>
        </div>
      </div>
    </transition>
    <mu-button fab @click="show=!show">
      <mu-icon value="add" size="38"></mu-icon>
    </mu-button>
    <div style="width:100%;height:200px;border: 1px black solid;padding:10px;">
      <div
        style="width:100px;height:100px;border-radius:50%;background-color:gray;position:relative;"
      >
        <div
          style="width:25px;height:25px;border-radius:50%;background-color:red;position:absolute;bottom:4px;right:4px;padding:3px 0 0 5px;"
        >V8</div>
      </div>
    </div>
    <div>
      路末丶长安
      <span class="level-block">Lv.3</span>
    </div>
    <!-- <article-card-view></article-card-view> -->
    <div style="margin:20px;">123</div>
    <div style="with:100%;background-color:pink;padding:10px;">
      <div
        style="background-color:#fff;border-radius:5px;width:145px;text-align:center;padding:7px 0;"
      >
        <img
          src="http://192.168.2.105:9090/static/thumbnail/avatar/bd940c1f374a4111b5856fa7404d92f2.jpg"
          style="width:50px;height:50px;border-radius:50%;"
        />
        <br />
        <label>路末丶长安</label>
        <h5 style="margin:10px 0;">悲喜总无泪也，是人间白发，剑胆成灰</h5>
        <!-- <mu-button :ripple="false" round small>关注</mu-button> -->
        <van-button type="info" size="mini" round plain style="width:45%;">关注</van-button>
        <br />
        <van-button type="info" size="mini" round style="width:45%;">已关注</van-button>
      </div>
    </div>
    <demo-image-upload></demo-image-upload>
    <demo-tag-select :selectTags.sync="selectTags"></demo-tag-select>
    <div contenteditable="true" style="border:1px solid #000">123</div>
    <div>
      <span class="qwerty">1234</span>
    </div>
  </div>
</template>
<script>
import ArticleCardView from "@/components/public/article/ArticleCardView.vue";
export default {
  data() {
    return {
      line: 100,
      show: false,
      isShow: true,
      array: [1, 2, 3, 4, 5, 6],
      content:
        '> 没有什么是永恒的\n\n散落在指尖的阳光，我试着轻了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = "Hello World!" \n\nSystem.out.println(str);\n```\n> 没有什么是永恒的\n\n**文字加粗了**',
      converter: null,
      showButton: false,
      fold: true,
      scroll: 0,
      selectTags:[]
    };
  },
  watch: {
    content: "contentChanged"
  },
  created() {},
  mounted() {
    let initHight = this.$refs.test.offsetHeight;
    console.log(initHight);
    // 44是两行的高度,当溢出时才显示展示更多按钮
    if (initHight > 44) {
      this.showButton = true;
      this.line = 2;
    }
    // window.addEventListener("scroll", this.handleScroll);
    //监听页面变化时是否溢出
    // window.onresize = () => {
    //   console.log("页面宽度改变了");

    //   let height = this.$refs.contentText.offsetHeight;
    //   console.log("span高度：" + height);
    //   if (height > 38.4) {
    //     _this.showButton = true;
    //   } else {
    //     _this.showButton = false;
    //   }
    // };
  },
  //keep-alive页面进入触发
  activated() {
    console.log("in:"+this.scroll)
    // if (this.scroll > 0) {
      // window.scrollTo(0, this.scroll);
      // this.scroll = 0;
      window.addEventListener("scroll", this.handleScroll);
    // }
  },
  //keep-alive页面销毁触发
  deactivated() {
    console.log("out:"+this.scroll)
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scroll =
        document.documentElement && document.documentElement.scrollTop;

      console.log(this.scroll);
    },
    handleFold() {
      this.line = this.line == 100 ? 2 : 100;
    },
    contentChanged() {
      var html = this.converter.makeHtml(this.content);
      document.getElementById("show-content").innerHTML = html;
    },
    change() {
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
    add() {
      this.array.push(1);
    },
    remove() {
      this.array.splice(this.array.length - 1, 1);
    }
    //让我们在 beforeEnter enter afterEnter 钩子里，把 vue 帮我们做的事，自己做一遍:
    //添加移除 class 类名，监听 transitionend 事件。
    // beforeEnter(dom) {
    //   dom.classList.add("list-enter", "list-enter-active");
    // },
    // enter(dom, done) {
    //   let delay = dom.dataset.delay;
    //   setTimeout(function() {
    //     dom.classList.remove("list-enter");
    //     dom.classList.add("list-enter-to");
    //     //监听 transitionend 事件
    //     var transitionend = window.ontransitionend
    //       ? "transitionend"
    //       : "webkitTransitionEnd";
    //     dom.addEventListener(transitionend, function onEnd() {
    //       dom.removeEventListener(transitionend, onEnd);
    //       done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
    //     });
    //   }, delay);
    // },
    // afterEnter(dom) {
    //   dom.classList.remove("list-enter-to", "list-enter-active");
    // }
  },
  components: {
    ArticleCardView
  }
};
</script>
<style scoped>
.root {
  /* background: #d9d9d9; */
}
.qwerty{
  background-color: blue;
  color: white;
  opacity: 0.35;
}
.qwerty:hover{
  opacity: 1.0;
}
.level-block {
  vertical-align: middle;
  letter-spacing: 0.2em;
  border-radius: 3px;
  font-family: "Times New Roman";
  margin-left: 0.25em;
  padding: 0.1em;
  font-size: 10px;
  color: white;
  background-color: hsl(240, 75%, 58%);
}
.blur-effect {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  /* background-image: url("http://192.168.149.110:9090/static/upload/images/thumbnail/a7d8fefa9e2b44619e3c0a558bb505c8.jpg"); */
  z-index: 99;
}
.blur-effect::before {
  /* 设置高斯模糊 */
  filter: blur(20px);
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.bottom-top-enter-active {
  transition: all 0.2s ease-in;
}
.bottom-top-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.bottom-top-enter {
  /* .slide-fade-leave-active for below version 2.1.8 */
  /* transform: translateY(20px); */
  transform: rotate(50deg);
  opacity: 0;
}
.bottom-top-leave-to {
  transform: scale(0.1);
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
}
.text-ellipsis {
  /*! autoprefixer: off */
  -webkit-box-orient: vertical; /** 这个属性在build时会被删除，需要特别处理 */
  /* autoprefixer: on */
  display: -webkit-box;
  -webkit-line-clamp: 10;
  text-overflow: ellipsis;
  overflow: hidden;
}
.test-shadow {
  margin-bottom: 15px;
  border-radius: 3px;
  /* border: black 1px solid; */
  padding: 5px;
  border-top: 0.5px rgba(0, 0, 0, 0.5) solid;
  border-left: 0.5px rgba(0, 0, 0, 0.5) solid;
  border-right: 0.5px rgba(0, 0, 0, 0.5) solid;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
  /* box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.4) ; */
}
.fold {
  -webkit-line-clamp: 2;
}
.unfold {
  -webkit-line-clamp: 10;
}
html,
.box-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box {
  margin-left: 10px;
  margin-top: 10px;
  width: 165px;
  height: 165px;
  padding: 10px;
  background-color: white;
  border: 1px #d9d9d9 solid;
}
.box:hover {
  transform: scale(1.1); /* 元素放大1.4倍 */
  transition: all 0.5s; /* 元素在0.5s内完成动画 */
  cursor: pointer;
}
.blank {
  width: 100%;
  height: 100px;
  margin-bottom: 5px;
  background-color: aquamarine;
}
.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.list-enter {
  opacity: 0;
  transform: translateY(100%);
}
.list-enter-active {
  transition: 0.3s;
}
/* enter-to其实可以不用写, 没有显性写明，就是默认的opacity: 1;transform: none;  */
.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.test-all {
  width: 100%;
  height: 100%;
  background-color: azure;
}
.box-enter-active {
  transform: translateY(-110px);
  transition: all 0.1s ease-in;
}
.box-leave,
.box-leave-active {
  transform: scale(0.1);
  transition: all 0.5s linear;
}
</style>


