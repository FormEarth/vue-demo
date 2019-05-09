<template>
  <div>
    <van-tabs v-model="active" swipeable>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      isShow: true,
      array: [1, 2, 3, 4, 5, 6],
      content: "> 没有什么是永恒的\n\n散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影.调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！\n```Java\n\nString str = \"Hello World!\" \n\nSystem.out.println(str);\n```\n> 没有什么是永恒的\n\n**文字加粗了**",
      converter:null
    };
  },
  watch: {
    content: "contentChanged"
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      this.converter = converter;
    },
    contentChanged() {
      var html = this.converter.makeHtml(this.content);
      document.getElementById("show-content").innerHTML = html;
    },
    change() {
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
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
  }
};
</script>
<style scoped>
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
</style>


