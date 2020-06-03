<template>
  <mu-container>
    <mu-form :model="form" style="padding-top:10px;" label-position="left" label-width="80">
      <mu-form-item prop="input" label="文章标题" style="padding:0 10px;max-width:450px;">
        <mu-text-field v-model="form.title" placeholder="文章标题（必填项）" max-length="30"></mu-text-field>
      </mu-form-item>
      <article-vditor ref="editor" :editable=true :initMarkdown="form.content" :cache=true></article-vditor>
      <mu-form-item prop="checkbox" label="隐私设置" style="padding:0 10px;">
        <mu-checkbox v-model="form.personal" :ripple="false" label="仅自己可见"></mu-checkbox>
        <mu-checkbox v-model="form.comment" :ripple="false" label="允许评论"></mu-checkbox>
        <mu-checkbox v-model="form.saveToFile" :ripple="false" label="生成静态页面"></mu-checkbox>
        <mu-checkbox v-model="form.anonymous" label="匿名文章" disabled></mu-checkbox>
      </mu-form-item>
      <mu-form-item label="选择标签" style="padding:0 10px;margin-bottom:0px;"></mu-form-item>
      <demo-tag-select :selectTags.sync="form.tags"></demo-tag-select>
      <mu-paper style="text-align:center">
        <mu-button flat color="#1565c0" @click="craeatArticle" :disabled="form.title.length<1">
          <mu-icon value="send"></mu-icon>发布
        </mu-button>
        <mu-button flat color="#1565c0" :disabled="form.content.length<1">
          <mu-icon value="inbox"></mu-icon>暂存
        </mu-button>
      </mu-paper>
      <div>
        <div>文章封面,（默认为你的个人封面，点击图片右上角可重新选取）</div>
        <div style="position: relative;width:60%;">
          <div class="image-edit">
            <demo-image-upload @setBlobData="setFrontCoverBlob">
              <mu-icon value="edit"></mu-icon>
            </demo-image-upload>
          </div>
          <img :src="previewCover" width="100%" />
        </div>
      </div>
    </mu-form>
    <mu-dialog
      title="发布成功"
      width="600"
      max-width="80%"
      transition="slide-left"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="releaseSucessDialog"
    >
      文章已发布成功！
      <mu-button slot="actions" flat color="primary" @click="writeAnother">再写一篇</mu-button>
      <mu-button slot="actions" flat color="primary" @click="goNewArticle">去查看新发布文章</mu-button>
    </mu-dialog>
  </mu-container>
</template>
<script>
import ArticleContent from "@/components/public/ArticleContent";
import ArticleVditor from "@/components/public/ArticleVditor.vue";
export default {
  name: "writeArticle",
  data() {
    return {
      releaseSucessDialog: false, //发送成功弹框是否打开
      defaultData: "preview",
      tags: ["原创", "Java", "Vue", "读书笔记", "日记"],
      newArticleId: "", //新增文章后返回的文章Id
      form: {
        title: "", //题目
        content: "", //内容
        personal: false, //仅自己可见
        anonymous: false, //匿名
        saveToFile: true,
        comment: true, //允许评论
        tags: [], //标签
        frontCoverBlob: ""
      }
    };
  },
  created(){
    this.form.content = localStorage.getItem(this.$store.state.current_user.userId)
  },
  computed: {
    //封面的展示
    previewCover() {
      return this.form.frontCoverBlob == ""
        ? this.$store.state.current_user.frontCover
        : window.URL.createObjectURL(this.form.frontCoverBlob);
    }
  },
  methods: {
    //设置裁剪后图片数据
    setFrontCoverBlob(data) {
      this.form.frontCoverBlob = data;
    },
    // 发布文章
    craeatArticle() {
      if (this.$refs.editor.getMarkdownValue().length < 1) {
        this.$demo_notify("文章内容为空");
        return;
      }
      this.form.content = this.$refs.editor.getMarkdownValue();
      // data.frontCoverBlob = "";
      //若是用户选择了本地封面，组装FormData进行图片上传
      let formData = new FormData();
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key]);
      });
      //重新组装数组数据
      formData.delete("tags");
      for (let i = 0; i < this.form.tags.length; i++) {
        formData.append("tags[" + i + "].tagId", this.form.tags[i].tagId);
        formData.append("tags[" + i + "].tagText", this.form.tags[i].tagText);
      }
      if (this.form.frontCoverBlob != "") {
        formData.delete("frontCoverBlob");
        formData.append("image", this.form.frontCoverBlob, "front-cover.jpg"); //这里直接给个名字，因为服务端用不到
      }
      let parser = require('ua-parser-js');
      let ua = parser(navigator.userAgent);
      let source = ua.os.name+ua.os.version+" "+ua.browser.name+ua.browser.version;
      formData.append("source", source);
      this.$http.article
        .releaseArticle(formData)
        .then(response => {
          if (response.data.code == "2000") {
            this.newArticleId = response.data.data.articleId;
            this.releaseSucessDialog = true;
            this.$refs.editor.clearValue();
          } else {
          }
        })
        .catch(error => {});
    },
    // 再写一篇
    writeAnother() {
      this.releaseSucessDialog = false;
      //刷新当前页面
      this.$router.go(0);
    },
    // 去查看新写的文章
    goNewArticle() {
      this.releaseSucessDialog = false;
      this.$router.replace("/writing/detail/" + this.newArticleId);
    },
    // 图片上传
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      // this.$http.article.uploadArticleImage(this.formdata)
      this.$http.article.uploadArticleImage(formdata).then(response => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        if (response.data.code == "2000") {
          var url = response.data.data.relativePath;
          console.log(
            "response.data.data.relativePath:" + response.data.data.relativePath
          );
          this.$refs.md.$img2Url(pos, url);
        }
      });
    }
  },
  components: {
    ArticleVditor
  }
};
</script>
<style scoped>
.container {
  padding-left: 10px;
  padding-right: 10px;
  /* max-width: 500px; */
  min-width: 350px;
  background: #fff;
}
.mu-form-item-label {
  padding-right: 0px;
}
.help-font {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  padding-left: 15px;
}
.image-edit {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
}
.image-edit:hover {
  color: #fff;
}
.mu-form >>> .v-note-wrapper .v-note-op {
  border: none;
  background: transparent;
}
.mu-form >>> .v-note-wrapper .v-note-panel {
  border: none;
  background: transparent;
}
</style>
