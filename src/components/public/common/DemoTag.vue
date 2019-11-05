<template>
  <a class="demo-tag" :style="randomObject">
    <slot>示例标签</slot>
  </a>
</template>
    
<script>
import util from "@/util/util";
export default {
  name: "DemoTag",
  props: {
    // tag: {
    //   type: String,
    //   default: "[tag]"
    // },
    color: {
      type: String,
      default: "blue"
    },
    random: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    //颜色定义，当传入color时，random不再生效
    randomObject: function() {
      // console.log(this.color)
      if (this.random) {
        var max = util.tagColor.length - 1;
        var random = Math.random();
        var num = Math.round(random * max);
        var color = util.tagColor[num].color;
        return {
          color: util.tagColor[num].color,
          background:util.tagColor[num].background
        };
      }
      if (this.color) {
        for (var i = 0, len = util.tagColor.length; i < len; i++) {
          if (this.color == util.tagColor[i].name) {
            return {
              color: util.tagColor[i].color,
              background:util.tagColor[i].background
            };
          }
        }
        // return {}
      }
      
    }
  }
};
</script>

<style scoped>
.demo-tag {
  margin: 0 0.1em;
  padding: 0.3em 1em;
  color: rgb(0, 140, 255);
  background: rgba(33, 150, 243, 0.08);
  /* opacity:0.08; */
  font-size: 12px;
  /* 换行时保证标签完整性 */
  white-space: pre;
}
.demo-tag::before {
  content: "#";
}
.demo-tag:hover{
  cursor: pointer;
  /* color: black; */
  /* opacity: 1; */
}
</style>