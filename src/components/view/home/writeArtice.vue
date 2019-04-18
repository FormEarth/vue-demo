<template>
  <mu-container>
    <mu-appbar color="white" title="写文章(Markdown长文)" textColor="black" z-depth="1">
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
import API from "@/axios/api";

export default {
  name: "writeArtice",
  data() {
    return {
      preview: false, //预览是否打开
      defaultData: "preview",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        // subfield: true, // 单双栏模式
        preview: true // 预览
      },
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
        comment: true,
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
      API.craeatArtice(this.form)
        .then(result => {})
        .catch(error => {});
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
  min-width: 350px;
}
.mu-form-item-label {
  padding-right: 0px;
}
</style>
