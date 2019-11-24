<template>
  <mu-container>
    <mu-form :model="form" style="padding-top:10px;" label-position="left" label-width="80">
      <mu-form-item prop="input" label="文章标题">
        <mu-text-field v-model="form.title" placeholder="您的文章标题（必填项）" max-length="30"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="textarea" label="摘要">
        <mu-text-field
          v-model="form.summary"
          :rows-max="3"
          placeholder="您的文章摘要（必填项）"
          max-length="200"
          multi-line
        ></mu-text-field>
      </mu-form-item>
      <mavon-editor
        ref="md"
        @imgAdd="$imgAdd"
        v-model="form.content"
        placeholder="立即开始你的创作之旅吧……"
        codeStyle="googlecode"
        :subfield="false"
        :boxShadow="false"
        :autofocus="false"
      />
      <mu-form-item prop="checkbox" label="隐私设置">
        <mu-checkbox v-model="form.personal" :ripple="false" label="仅自己可见"></mu-checkbox>
        <mu-checkbox v-model="form.comment" :ripple="false" label="允许评论"></mu-checkbox>
        <mu-checkbox v-model="form.anonymous" label="匿名文章" disabled></mu-checkbox>
      </mu-form-item>
      <mu-form-item label="选择标签">
        <mu-select v-model="form.tags" chips tags filerable>
          <mu-option v-for="style in tags" :key="style" :label="style" :value="style"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-paper style="text-align:center">
        <mu-button flat color="#1565c0" @click="openPreview">
          <mu-icon value="visibility"></mu-icon>预览
        </mu-button>
        <mu-button
          flat
          color="#1565c0"
          @click="craeatArticle"
          :disabled="form.content.length<1||form.title.length<1"
        >
          <mu-icon value="send"></mu-icon>发布
        </mu-button>
        <mu-button flat color="#1565c0" :disabled="form.content.length<1">
          <mu-icon value="inbox"></mu-icon>暂存
        </mu-button>
      </mu-paper>
      <div>
        <div>文章封面,（默认为你的个人封面，点击图片右上角可自定义）</div>
        <div style="position: relative;width:60%;">
          <div class="image-edit">
            <mu-icon value="edit"></mu-icon>
          </div>
          <img :src="$store.state.current_user.frontCover" width="100%" />
        </div>
      </div>
    </mu-form>
    <mu-dialog max-width="500" transition="scale" fullscreen :open.sync="preview">
      <mu-appbar title="文章预览" color="white" z-depth="1" textColor="black">
        <mu-button slot="left" icon @click="closePreview">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div v-if="form.content.length<1" style="text-align:center;margin-top:15px;">您还什么都没有写哦O_O</div>
      <div v-else>
        <article-content :content="form.content" :article-style="'googlecode'"></article-content>
      </div>
    </mu-dialog>
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
export default {
  name: "writeArticle",
  data() {
    return {
      type: "add", //当前页面是新增还是修改，默认为新增
      preview: false, //预览是否打开
      releaseSucessDialog: false, //发送成功弹框是否打开
      defaultData: "preview",
      tags: ["原创", "Java", "Vue", "读书笔记", "日记"],
      newArticleId: "", //新增文章后返回的文章Id
      form: {
        title: "", //题目
        summary: "", //摘要
        content: "", //内容
        personal: false, //仅自己可见
        anonymous: false, //匿名
        comment: true, //允许评论
        codeStyle: "googlecode",
        tags: "" //标签
        // status: ""
      }
    };
  },
  created() {
    console.log("store.getters.isLogin:" + this.$store.getters.isLogin);
    if (this.$route.name == "articleEdit") {
      this.type = "edit";
      articleDetail().then(response => {
        console.log(response.data.data);
        this.form = response.data.data;
      });
    }
  },
  computed: {
    disabled: function() {
      return this.form.content == "" ? true : false;
    },
    pageTitle: function() {
      if (this.type == "add") {
        return "写文章(Markdown长文)";
      } else {
        return "编辑文章";
      }
    }
  },
  methods: {
    openPreview() {
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    },
    // 发布文章
    craeatArticle() {
      this.form.status = "1";
      this.$http.article.releaseArticle(this.form).then(response => {
        // alert("发布成功！")
        this.newArticleId = response.data.data.articleId;
        this.releaseSucessDialog = true;
      });
      // axios.post('http://192.168.149.110:9092/demo/api/article',this.form,{withCredentials:true});
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
      this.$router.replace("/article/detail/" + this.newArticleId);
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
    ArticleContent
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
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
  position:absolute;
  top:5px;
  right:10px;
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
