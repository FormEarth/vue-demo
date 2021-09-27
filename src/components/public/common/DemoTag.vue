<template>
  <div :class="['demooo-tag',editable?'editable':'']" :style="{backgroundColor:editable?'#fff':color,color:editable?'#000':font_color}">
    <div v-if="editable">
      <!-- input和icon不要换行 -->
      <input ref="tag_input" type="text" v-model.trim="tag_text" class="tag-input" placeholder="new tag" 
          @keyup.enter="edit_finish" @blur="edit_finish">
          <!-- <mu-icon value="close" size="16" style="vertical-align: middle;" @click="remove_tag"></mu-icon> -->
    </div>
    <div v-else>
      <!-- {{value}} -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "demo-tag",
    props: {
      value: {
        type: String,
        default: ''
      },
      editable: {
        type: Boolean,
        default: false
      },
      color:{
        type: String,
        default: '#12a182' 
      },
      font_color:{
        type: String,
        default: '#fff' 
      }
    },
    data() {
      return {
        tag_text: this.value,
        text_alter: false,
        lock_flag: false
      }
    },
    methods: {
      //回车或失去焦点表明编辑完成,回车和失焦使用的同一个function，只要触发一次就行
      edit_finish() {
        if(this.lock_flag) return
        this.lock_flag = true
        //传来就是空时s
        if(this.value == '' && this.tag_text == ''){
          this.$demo_notify('tag cannot be empty' )
          this.lock_flag = false
          return
        }
        this.$emit('edit_finish',this.tag_text)
        this.tag_text = this.value
        this.$refs.tag_input.blur()
        this.lock_flag = false
      },
      //移除tag
      remove_tag(){
        this.$emit('remove_tag')
      },
      click_tag(){
        console.log(this.editable)
        if(this.editable){
          this.$refs.tag_input.focus()
        }
      }
    },
  }
</script>
<style scoped>
  .demooo-tag {
    color: #fff;
    font-size: 12px;
    padding: 2.8px 8px;
    line-height: normal;
    border-radius: 0.2em;
    display: inline-block;
    margin: 4.2px 4.2px 4.2px 0;
  }

  .editable {
    background-color: #fff;
    color: #000;
    border: 1px dashed lightblue;
    padding: 1.8px 8px;
  }

  .tag-input {
    border: none;
    max-width: 50px;
    margin: 0;
    padding: 0;
  }
</style>