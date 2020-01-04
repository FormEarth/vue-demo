<template>
  <demo-transition>
    <div v-if="visible" class="message" :class="type">
      <!-- <mu-icon value="info" color="success" size="20"></mu-icon> -->
      <span class="content">{{content}}</span>
      <mu-icon v-if="hasClose" value="close" class="icon" size="20" @click="visible=false"></mu-icon>
    </div>
  </demo-transition>
</template>

<script>
import DemoTransition from '@/components/public/common/DemoTransition';
export default {
  name: "DemoNotify",
  data() {
    return {
      content: "",
      time: 3000,
      visible: false,
      type: "info", //'success','warning','error'
      hasClose: true
    };
  },
  mounted() {
    this.close();
  },
  methods: {
    close() {
      // window.setTimeout(() => {
        this.visible = false;
      // }, this.time);
    }
  },
  components:{
    DemoTransition
  }
};
</script>

<style scoped>
.message {
  font-size: 16px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;
  max-width: 300px;
  background-color: rgba(0, 0, 0, 0.8);
  color: azure;
  border-radius: 3px;
}
.content {
  line-height: 20px;
  margin-left: 5px;
}
.icon {
  margin-left: 50px;
}
</style>