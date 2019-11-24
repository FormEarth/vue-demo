<template>
  <mavon-editor class="main-content"
    :value="content"
    :codeStyle= "articleStyle"
    :subfield="false"
    :defaultOpen="defaultData"
    :toolbarsFlag="false"
    :boxShadow="false"
    :boxShadowStyle="boxShadowStyle"
  ></mavon-editor>
  <!-- 通过 props 来设置 options -->
  <!-- <vue-showdown
    class="main-content"
    :markdown="content"
    flavor="vanilla"
    :options="{ tables: true }"
  ></vue-showdown> -->
</template>
<script>
export default {
  name: "ArticleContent", //文章内容的组件
  props: {
    articleStyle: {
      type: String,
      default: "github"
    },
    content: {
      type: String,
      default: "这里还什么都没有哦…^_^"
    }
  },
  data() {
    return {
      defaultData: "preview",
      codeStyle: "googlecode",
      boxShadowStyle: "0 2px 5px 0 rgba(0, 0, 0, 0.1)",
      htmlContent: `<code>String = "Hello World!"<code>`
    };
  },
  created() {},
  methods: {},
  components: {
  }
};
</script>
<style scoped>
.main-content >>> {
  color: #34495e;
  line-height: 1.6rem;
}
.main-content >>> .v-note-panel .v-note-show .v-show-content{
  background-color: #fff;
} 
.main-content >>> img {
  width: 100%;
}
.main-content >>> a {
  color: #42b983;
  font-weight: 600;
  padding: 0 2px;
  text-decoration: none;
}
.main-content >>> h1,
h2,
h3,
h4,
h5,
h6 {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  line-height: 1.4;
  cursor: text;
}
.main-content >>> h1 {
  padding-bottom: 0.4rem;
  font-size: 2.2rem;
  line-height: 1.3;
}

.main-content >>> h2 {
  font-size: 1.75rem;
  line-height: 1.225;
  margin: 35px 0 15px;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ddd;
}

.main-content >>> h3 {
  font-size: 1.4rem;
  line-height: 1.43;
  margin: 20px 0 7px;
}

.main-content >>> h4 {
  font-size: 1.2rem;
}

.main-content >>> h5 {
  font-size: 1rem;
}

.main-content >>> h6 {
  font-size: 1rem;
  color: #777;
}
.main-content >>> hr {
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
}
.main-content >>> blockquote {
  margin-left: 0;
  margin-left: 0;
    border-left: 4px solid #42b983;
    padding: 10px 15px;
    color: #777;
    background-color: rgba(66, 185, 131, .1);
}
.main-content >>> p code {
    margin: 0 2px;
    padding: 2px 4px;
    border-radius: 2px;
    font-family: Roboto Mono, Source Sans Pro, Monaco, courier, monospace !important;
    font-size: 0.92rem;
    color: red;
    background-color: transparent;
}
.main-content >>> pre {
    background-color: rgba(66, 185, 131, .1);
}
</style>


