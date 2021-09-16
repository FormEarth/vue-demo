<template>
  <div>
    <!-- 已选标签展示 -->
    <demo-tag v-for="(tag,index) in tags" 
        :ref="'tag'+index" :key="index" :value="tag" :editable="edit_index==index"
        @edit_finish="tag_edit_finish" 
        @click.native="tag_click(index)">
        {{tag}}
    </demo-tag>
    <demo-tag v-if="tags.length<10" editable :value="new_tag" @edit_finish="add_new_tag"></demo-tag>
  </div>
</template>

<script>
  export default {
    name: "DemoTagSelect", //标签选取组件
    props: {
      //已选标签，使用:tag_group.sync进行绑定
      tag_group: {
        type: Array,
        // default:()=>{
        //   return []
        // }
      }
    },
    data() {
      return {
        initTags: [], //初始化的使用最多的标签
        searchText: "", //tag搜素输入的内容
        searchPanel: false, //tag搜索区域的开合标识
        tags: this.tag_group, //模糊查询服务端返回的标签
        new_tag: '',
        edit_index: -1,
      };
    },
    created() {
      // this.searchTagsWithText(true);
    },
    watch: {
      tag_group(newVal){
        this.tags = newVal
      }
    },
    methods: {
      add_new_tag(context) {
        this.tags.push(context)
        this.new_tag = ''
      },
      tag_click(index) {
        this.edit_index = index
        let key = `tag${index}`
        //直接执行子组件状态还没有改变
        setTimeout(()=>{this.$refs[key][0].click_tag()}, 200 )
        
      },
      tag_edit_finish(context) {
        console.log(context)
        if(context == ''){
          //没内容时删掉
          this.tags.splice(this.edit_index)
        }else{
          this.$set(this.tags,this.edit_index,context)
        }
        this.edit_index = -1
      },
      clear_tags(){
        //清空已有数组
        this.tags.splice(0,this.tags.length)
      },
      //输入内容改变时，请求服务端进行模糊搜索
      searchTags() {
        console.log("触发了搜索");
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (this.searchText) {
          this.timer = setTimeout(() => {
            this.searchTagsWithText(false);
          }, 500);
        } else {
          // 输入框中的内容被删为空时触发，此时会展示页面初始化加载的搜索结果
          this.tags = this.initTags;
        }
      },
      //点击列表中的某项后将该标签加入输入框
      addNewTags(tag) {
        console.log('+' + tag.tagId);
        this.tag_group.push({ tagId: tag.tagId, tagText: tag.tagText });
      },
      //删除标签
      deleteTag(index) {
        console.log('-' + index);
        this.tag_group.splice(index, 1)
      },
      //请求服务端模糊查询标签
      searchTagsWithText(isInit) {
        this.$http.tag
          .queryTagsByText(this.searchText)
          .then(response => {
            if (response.data.code == "2000") {
              this.tags = response.data.data.tags;
              //初始化加载进行缓存
              if (isInit) {
                this.initTags = this.tags;
              }
            }
          })
          .catch(error => { });
      }
    }
  };
</script>

<style scoped>
  .mu-icon {
    vertical-align: middle;
    /* float: right; */
  }
</style>