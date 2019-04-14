<template>
  <mavon-editor class="editor"
    :value="content"
    :codeStyle= "articeStyle"
    :subfield="false"
    :defaultOpen="defaultData"
    :toolbarsFlag="false"
    :boxShadow="false"
  />
</template>
<script>
// import mavonEditor from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticeContent", //文章内容的组件
  props:{
    articeStyle:{
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
      value: `<code>String = "Hello World!"<code>`
    };
  },
  methods: {
  }
};
</script>
<style>
.editor  v-show-content  scroll-style{
  padding:8px 5px 15px 5px;
}

</style>


