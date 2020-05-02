<template>
  <mu-container>
    <mu-form :model="form" style="padding-top:10px;" label-position="left" label-width="80">
      <mu-form-item prop="input" label="文章标题" style="padding:0 10px;max-width:450px;">
        <mu-text-field v-model="form.title" placeholder="文章标题（必填项）" max-length="30"></mu-text-field>
      </mu-form-item>
      <article-vditor v-if="requestSuccess" ref="editor" :editable="true" :initMarkdown="form.content" :cache="false"></article-vditor>
      <mu-form-item prop="checkbox" label="隐私设置" style="padding:0 10px;">
        <mu-checkbox v-model="form.personal" :ripple="false" label="仅自己可见"></mu-checkbox>
        <mu-checkbox v-model="form.comment" :ripple="false" label="允许评论"></mu-checkbox>
        <mu-checkbox v-model="form.saveToFile" :ripple="false" label="生成静态页面"></mu-checkbox>
        <mu-checkbox v-model="form.anonymous" label="匿名文章" disabled></mu-checkbox>
      </mu-form-item>
      <mu-form-item label="选择标签" style="padding:0 10px;margin-bottom:0px;"></mu-form-item>
      <demo-tag-select :selectTags.sync="form.tags"></demo-tag-select>
      <mu-paper style="text-align:center">
        <!-- <mu-button flat color="#1565c0" @click="openPreview">
          <mu-icon value="visibility"></mu-icon>预览
        </mu-button>-->
        <mu-button flat color="#1565c0" @click="editArticle" :disabled="form.title.length<1">
          编辑完成<mu-icon value="near_me"></mu-icon>
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
          <img :src="previewCoverURL" width="100%" />
        </div>
      </div>
    </mu-form>
    <mu-dialog
      title="修改成功"
      width="600"
      max-width="80%"
      transition="slide-left"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="releaseSucessDialog"
    >
      修改已生效！
      <mu-button slot="actions" flat color="primary" @click="goNewArticle">查看文章</mu-button>
    </mu-dialog>
  </mu-container>
</template>
<script>
import ArticleContent from "@/components/public/ArticleContent";
import ArticleVditor from "@/components/public/ArticleVditor.vue";
export default {
  name: "editArticle",
  data() {
    return {
      releaseSucessDialog: false, //发送成功弹框是否打开
      // tags: ["原创", "Java", "Vue", "读书笔记", "日记"],
      previewCover:"",
      modifyFrontcover:false,
      requestSuccess:false,
      form: {
        title: "", //题目
        content: "", //内容
        personal: false, //仅自己可见
        anonymous: false, //匿名
        saveToFile: true,
        comment: true, //允许评论
        tags: [], //标签
        // frontCoverBlob: ""
      }
    };
  },
  created() {
    this.$http.writing
      .queryWritingById(this.$route.params.id, "edit")
      .then(response => {
        if (response.data.code == "2000") {
          this.form = response.data.data.writing;
          this.previewCover = response.data.data.writing.frontCover;
          // this.$refs.editor.initMarkdown()
          this.requestSuccess=true;
        }
      });
  },
  mounted() {
    // this.$refs.editor.setValue()
  },
  computed: {
    // 封面的展示
    previewCoverURL() {
      return this.modifyFrontcover
        ? window.URL.createObjectURL(this.previewCover)
        : this.form.frontCover;
    }
  },
  methods: {
    //设置裁剪后图片数据
    setFrontCoverBlob(data) {
      this.modifyFrontcover = true;
      this.previewCover = data;
    },
    // 编辑成功
    editArticle() {
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
      if (this.modifyFrontcover) {
        formData.delete("frontCoverBlob");
        formData.append("image", this.previewCover, "front-cover.jpg"); //这里直接给个名字，因为服务端用不到
      }
      formData.delete("user");
      //删去服务端时间类型的数据，否则会报转换错误
      formData.delete("sendTime")
      formData.delete("createTime")
      formData.delete("modifiedTime")
      formData.delete("updateTime")
      this.$http.article
        .editArticle(formData)
        .then(response => {
          if (response.data.code == "2000") {
            this.releaseSucessDialog = true;
          } else {
          }
        })
        .catch(error => {});
    },
    // 去查看编辑文章
    goNewArticle() {
      this.releaseSucessDialog = false;
      this.$router.replace("/writing/detail/" + this.form.writingId);
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
