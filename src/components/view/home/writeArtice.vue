<template>
  <mu-container>
    <mu-appbar color="white" title="写文章" textColor="black" z-depth="1">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-form :model="form" style="padding-top:10px;" label-position="left" label-width="80">
      <mu-form-item prop="input" label="文章标题">
        <mu-text-field v-model="form.input"></mu-text-field>
      </mu-form-item>
      <!-- <div>{{form.content}}</div> -->
      <mavon-editor
        v-model="form.content"
        placeholder="立即开始你的创作之旅吧……"
        :codeStyle="form.codeStyle"
        :subfield="false"
        :boxShadow="false"
      />
      <mu-form-item prop="switch" label="设为私密" help-text="设置为私密的文章发布后只有你能看到">
        <mu-switch v-model="form.personal"></mu-switch>
      </mu-form-item>
      <mu-form-item prop="switch" label="允许评论">
        <mu-switch v-model="form.comment"></mu-switch>
      </mu-form-item>
      <mu-form-item prop="switch" label="匿名文章" help-text="匿名文章将不会向他人暴露任何有关作者的信息">
        <mu-switch v-model="form.anonymous"></mu-switch>
      </mu-form-item>
      <mu-form-item label="代码风格">
        <mu-select v-model="form.codeStyle">
          <mu-option v-for="style in selectStyles" :key="style" :label="style" :value="style"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item label="选择标签">
        <mu-select v-model="form.tag" chips multiple tags>
          <mu-option v-for="style in tags" :key="style" :label="style" :value="style"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-paper style="text-align:center">
        <mu-button flat color="#1565c0" @click="openPreview">
          <mu-icon value="visibility"></mu-icon>预览
        </mu-button>
        <mu-button flat color="#1565c0" @click="craeatArtice">
          <mu-icon value="send"></mu-icon>发布
        </mu-button>
        <mu-button flat color="#1565c0">
          <mu-icon value="inbox"></mu-icon>暂存
        </mu-button>
      </mu-paper>
    </mu-form>
    <mu-dialog max-width="500" transition="scale" fullscreen :open.sync="preview">
      <mu-appbar title="文章预览" color="white" z-depth="1" textColor="black">
        <mu-button slot="left" icon @click="closePreview">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div v-if="form.content.length<1" style="text-align:center;margin-top:15px;">您还什么都没有写哦O_O</div>
      <div v-else>
        <artice-content :content="form.content" artice-style="form.codeStyle"></artice-content>
      </div>
    </mu-dialog>
  </mu-container>
</template>
<script>
import ArticeContent from "@/components/public/ArticeContent.vue";
import API from '@/axios/api'

export default {
  name: "writeArtice",
  data() {
    return {
      preview: false, //预览是否打开
      defaultData: "preview",
      selectStyles: [
        "github",
        "tomorrow",
        "school-book",
        "brown-paper",
        "googlecode",
        "atelier-heath-light"
      ],
      tags: ["原创", "Java", "Vue", "读书笔记", "日记"],
      form: {
        title: "",
        content: "",
        personal: false,
        anonymous: false,
        comment:true,
        codeStyle: "github",
        tag: ""
      }
    };
  },
  methods: {
    openPreview() {
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    },
    craeatArtice() {
      var description = "";
      for (var i in this.form) {
        var property = this.form[i];
        description += i + " = " + property + "\n";
      }
      alert(description);
      return;
      API.craeatArtice(this.form).then((result)=>{

      }).catch((error)=>{});
    }
  },
  components: {
    "artice-content": ArticeContent
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
}
.mu-form-item-label {
  padding-right: 0px;
}
</style>
