<template>
  <div class="root-node">
    <div style="margin-bottom:90px;">
      <mu-slide-left-transition>
        <div class="opear-item" v-show="open">
          <mu-button  @click="$router.push('/atlas/add');open=false;">
            <mu-icon value="collections" color="error"></mu-icon>&nbsp;发布动态
          </mu-button>
        </div>
      </mu-slide-left-transition>
      <mu-slide-right-transition>
        <div class="opear-item" v-show="open">
          <mu-button @click="$router.push('/article/add');open=false;">
            <mu-icon value="post_add" color="error"></mu-icon>&nbsp;发布文章
          </mu-button>
        </div>
      </mu-slide-right-transition>
    </div>
    <mu-button fab small color="white" @click="open=!open" class="toggle-button">
      <mu-icon :value="open?'close':'create'" color="red"></mu-icon>
    </mu-button><br>
    <mu-button fab small color="white" @click="toTop" class="toggle-button" style="bottom:0;">
      <mu-icon value="navigation" color="red"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
export default {
  name: "FlatButton",
  data() {
    return {
      open: false
    };
  },
  methods:{
        toTop() {
          var dom = document.querySelector(".demo-content")
      if (dom.scrollTop > 0) {
        dom.scrollTop = 0;
      }
    },
  }
};
</script>

<style scoped>
.root-node {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}
.toggle-button {
  position: absolute;
  bottom: 55px;
  right: 0;
}
.opear-item {
  margin-bottom: 8px;
}
.mu-button-small{
  width: 45px;
  height: 45px;
}
</style>