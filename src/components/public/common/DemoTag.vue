<template>
  <div v-if="simple" style="display:inline-block;">
    <a class="demo-tag simple">
      <slot>示例标签</slot>
    </a>
  </div>
  <span v-else class="root-node">
    <span>
      <img :src="leftTag" class="left-tag" />
      <slot>示例标签</slot>
      <img v-if="optional" :src="deleteSvg" class="delete-suffix" @click="deleteTag">
    </span>
    
    <!-- 不要换行，span的换行符会被渲染成空白 -->
  </span>
</template>
    
<script>
import util from "@/util/util";
export default {
  name: "DemoTag",
  props: {
    color: {
      type: String,
      default: "blue"
    },
    random: {
      type: Boolean,
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    ellipse: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      leftTag: require("@/assets/images/jinghao.png"),
      deleteSvg: require("@/assets/svg/x.svg")
    };
  },
  computed: {
    //颜色定义，当传入color时，random不再生效
    randomObject: function() {
      // console.log(this.color)
      // if (this.random) {
      //   var max = util.tagColor.length - 1;
      //   var random = Math.random();
      //   var num = Math.round(random * max);
      //   var color = util.tagColor[num].color;
      //   return {
      //     color: util.tagColor[num].color,
      //     background: util.tagColor[num].background
      //   };
      // }
      // if (this.color) {
      for (var i = 0, len = util.tagColor.length; i < len; i++) {
        if (this.color == util.tagColor[i].name) {
          if (this.simple) {
            return {
              color: util.tagColor[i].color
            };
          } else {
            return {
              color: util.tagColor[i].color,
              background: util.tagColor[i].background
            };
          }
        }
        // }
        // return {}
      }
    }
  },
  methods: {
    deleteTag() {
      this.$emit("deleteTag");
    }
  }
};
</script>

<style scoped>
.root-node {
  height: 20px;
  display: inline-block;
  margin-right: 6px;
  white-space: pre;
  border-radius: 16px;
  /* background-color: rgba(2, 153, 255, 0.06); */
  padding-right: 8px;
  align-items: center;
  line-height: 20px;
  color: rgb(2, 153, 255);
  font-size: 14px;
}
.left-tag {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-top: -3px;
}
.demo-tag {
  display: inline-block;
  /* margin: 0 0 3px 0.3em; */
  /* padding: 1px 10px; */
  /* background-color: #e0e0e0; */
  /* opacity:0.08; */
  /* font-size: 14px; */
  /* 换行时保证标签完整性 */

  /* font-family: Fangzhenglibian, "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif; */
  text-align: center;
}
.simple::before {
  content: "#";
}
.simple{
  color: rgb(2, 153, 255);
}
.simple,.root-node  {
  cursor: pointer;
  /* color: black; */
  /* opacity: 1; */
}
.delete-suffix {
  vertical-align: text-bottom;
  cursor: pointer;
}
.simple {
  background: transparent;
  padding: 0;
  margin: 0 0 0 0.3em;
  font-size: 14px;
}
@media screen and (min-width: 993px) {
}
</style>