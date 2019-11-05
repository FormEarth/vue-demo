<template>
  <div>
    <div class="dynamic-area">
      <p>标签</p>
      <demo-input v-model="tag.tagText" placeholder="标签"></demo-input>
      <p>描述</p>
      <mu-text-field
        v-model="tag.tagWiki"
        :rows="2"
        :rowsMax="10"
        full-width
        multi-line
        placeholder="文字描述（必须）"
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
      <mu-button
        full-width
        color="primary"
        :disabled="tag.tagText.length<1||tag.tagWiki.length<1"
        @click="createNewTag"
      >添加</mu-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import util from "@/util/util"
export default {
  name: "TagAdd",
  data() {
    return {
      colors: util.tagColor,
      tag: {
        tagCategory: "",
        tagText: "",
        tagWiki: "",
        tagColor: ""
      }
    };
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
            this.$router.back(-1);
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
.mu-text-field-textarea{
    background-color: #ffffff;
}
</style>