<template>
  <div class="root-node">
    <!-- <mu-button @click="test">123</mu-button> -->
    <div id="vditor" style="min-height:400px;"></div>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  name: "ArticleVditor", //vditor的文章编辑器组件
  props: {
    editable: {
      //是否可编辑
      type: Boolean,
      default: true
    },
    initMarkdown: {
      //初始化时的值
      type: String,
      default: ""
    }
  },
  data() {
    return {
      vditor: null
    };
  },
  async mounted() {
    let _this = this;
    if (this.editable) {
      //创建可编辑editor
      this.vditor = new Vditor("vditor", {
        debugger: false,
        placeholder: "立即开始创作之旅吧~~",
        height: "auto",
        toolbar: [
          "headings",
          "bold",
          "italic",
          "strike",
          "line",
          "quote",
          "list",
          "ordered-list",
          "check",
          "code",
          "inline-code",
          "undo",
          "redo",
          "upload",
          "link",
          "table",
          "edit-mode"
        ],
        preview: {
          markdown: {
            toc: true
          }
        },
        value: _this.initMarkdown,
        mode: "ir",
        tab: "\t",
        upload: {
          accept: "image/*",
          handler(files) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append("image", files[0]);
            _this.$http.article.uploadArticleImage(formdata).then(response => {
              if (response.data.code == "2000") {
                var url = response.data.data.relativePath;
                console.log(url);
                _this.url = url;
                // return null;
                let str = "![图片](" + url + ")";
                _this.vditor.insertValue(str, true);
              } else {
                _this.vditor.tip("图片上传失败", 2);
              }
            });
          },
          filename(name) {
            return name
              .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
              .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
              .replace("/\\s/g", "");
          }
        }
      });
    } else {
      //调用静态方法创建创建预览
      this.vditor = Vditor.preview(
        document.getElementById("vditor"),
        this.initMarkdown,
        {
          hljs: {
            style: "native",
            lineNumber: true
          }
        }
      );
    }
  },
  methods: {
    //获取markdown内容
    getMarkdownValue() {
      return this.vditor.getValue();
    },
    //清空内容以及localStorage
    clearValue() {
      this.vditor.setValue("");
      this.vditor.clearCache();
    },
    test(){
     let ert = this.vditor.getCursorPosition()
     console.log(ert.top,ert.left)
    }
  }
};
</script>

<style scoped>
.root-node >>> .vditor-toolbar__item {
  margin-right: 5px;
}
</style>