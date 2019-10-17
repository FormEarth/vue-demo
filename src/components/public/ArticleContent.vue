<template>
  <mavon-editor class="editor"
    :value="content"
    :codeStyle= "articleStyle"
    :subfield="false"
    :defaultOpen="defaultData"
    :toolbarsFlag="false"
    :boxShadow="false"
    :boxShadowStyle="boxShadowStyle"
  />
</template>
<script>
// import mavonEditor from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticleContent", //文章内容的组件
  props:{
    articleStyle:{
      type:String,
      default:'github'
    },
    content:{
      type:String,
      default:'这里还什么都没有哦…^_^'
    },
  },
  data() {
    return {
      defaultData: "preview",
      codeStyle: "rainbow",
      boxShadowStyle:"0 2px 5px 0 rgba(0, 0, 0, 0.1)",
      value: `<code>String = "Hello World!"<code>`
    };
  },
  methods: {
  }
};
</script>
<style>
.single-show >>> .v-show-content{
  padding:8px 0px 15px 0px;
}

</style>


