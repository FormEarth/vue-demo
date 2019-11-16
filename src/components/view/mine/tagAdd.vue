<template>
  <div>
    <div class="dynamic-area">
      <p>标签</p>
      <demo-input
        v-model.trim="tag.tagText"
        max="10"
        placeholder="自定义一个标签"
        :error="errorMessage"
      ></demo-input>
      <p>描述</p>
      <mu-text-field
        v-model="tag.tagWiki"
        :rows="2"
        :rowsMax="10"
        full-width
        multi-line
        placeholder="文字描述（可选）"
        solo
      ></mu-text-field>
      <p>颜色</p>
      <!-- {{tag.color}} -->
      <!-- check_box_outline_blank -->
      <div>
        <div style="display:flex;margin-bottom:5px;" v-for="(color,index) in colors" :key="index">
          <mu-radio
            :value="color.name"
            v-model="tag.tagColor"
            uncheck-icon="check_box_outline_blank"
            checked-icon="check_box"
            :label="color.nameZh"
            :ripple="false"
            :color="color.color"
          ></mu-radio>
          <demo-tag :color="color.name">{{tag.tagText}}</demo-tag>
          <!-- <div style="padding:4px 0;"><div :style="{backgroundColor:color.color,width:'50px',height:'18px'}"></div></div> -->
        </div>
      </div>
      <mu-button full-width color="primary" :disabled="disabled" @click="createNewTag">添加</mu-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import util from "@/util/util";
export default {
  name: "TagAdd",
  data() {
    return {
      colors: util.tagColor,
      errorMessage: "",
      tag: {
        tagCategory: "",
        tagText: "",
        tagWiki: "",
        tagColor: ""
      }
    };
  },
  watch: {
    tagText(val, oldVal) {
      var regex = /^[\u4E00-\u9FA5|a-z|A-Z|0-9|_|/]+$/;
      if (val == "") {
        this.errorMessage = "标签内容不能为空";
      } else if (!regex.test(val)) {
        this.errorMessage = "标签内容只允许中文、英文和数字";
      } else {
        this.errorMessage = "";
      }
    }
  },
  computed: {
    //因为watch无法监听到某个对象的具体属性，所以使用计算属性获取
    tagText() {
      return this.tag.tagText;
    },
    disabled() {
      if (this.tag.tagText == "") {
        return true;
      } else {
        if (this.errorMessage.length > 0) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    createNewTag() {
      this.$http.tag
        .createNewTag(this.tag)
        .then(response => {
          if (response.data.code == "2000") {
            // 轻提示弹框
            Toast({
              message: "添加成功",
              duration: 2000,
              forbidClick: true
            });
            this.tag.tagText = "";
            this.tag.tagWiki = "";
            this.tag.tagColor = "";
            // this.$router.back(-1);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.dynamic-area {
  box-sizing: border-box;
  /* min-height: 152px; */
  width: 100%;
  /* background-color: #ffffff; */
  padding: 5px 15px 5px 15px;
  margin-bottom: 6.5px;
}
.mu-text-field-input {
  background: #ffffff;
}
.mu-text-field-input .mu-text-field-textarea {
  background-color: #ffffff;
}
</style>