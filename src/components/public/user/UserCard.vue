<template>
  <div v-if="user" class="demo-card">
    <img :src="user.frontCover" />
    <div class="avatar-name">
      <img :src="user.avatar" />
      @
      <p>{{user.userName}}</p>
    </div>
    <div class="user-sign">
      <label>签名：{{user.sign}}</label><br /><label>简介：{{user.personalProfile}}</label>
    </div>
    <div class="some-data">
      <div class="data-item">
        <span>{{$store.state.current_user.user_watch_list.length}}</span>
        <h5>关注</h5>
      </div>
      <div class="data-item">
        <span>{{$store.state.current_user.user_like_list.length}}</span>
        <h5>喜欢</h5>
      </div>
      <div class="data-item">
        <span>{{$store.state.current_user.user_keep_list.length}}</span>
        <h5>收藏</h5>
      </div>
    </div>
  </div>
  <div v-else-if="icons" class="demo-card" style="padding:10px;">
      {{title}}
    <div class="icon-container">
     <div class="icon-item" v-for="icon in icons" :key="icon.text" @click="$router.push(icon.link)">
      <mu-icon :value="icon.icon"></mu-icon>
      <br />{{icon.text}}
     </div> 
    </div>
  </div>
  <div v-else class="demo-card default">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object
    },
    icons: {
      type: Array 
    },
    title: {
      type: String 
    }
  }
};
</script>

<style scoped>
.default {
  padding: 10px;
  white-space: pre-wrap;
}
.default::before {
  display: inline-block;
  margin-right: 8px;
  content: "";
  width: 4px;
  height: 22px;
  vertical-align: -6px;
  background-color: rgb(221, 24, 57);
}
.default:hover {
  background-color: rgb(221, 24, 57);
  color: white;
}
.demo-card {
  margin: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transition: 0.5s all;
  position: relative;
}
.demo-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
.avatar-name {
  position: absolute;
  top: 120px;
  left: 5px;
  font-size: 22px;
}
.avatar-name img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px white solid;
  vertical-align: bottom;
}
.avatar-name p {
  display: inline;
}
.avatar-name p:hover {
  color: #1565c0;
  cursor: pointer;
}
.user-sign {
  margin-top: 30px;
  /* padding-left: 55px; */
  padding-left: 5px;
  white-space: pre-wrap;
}
.some-data {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.data-item span {
  color: #1565c0;
}
.data-item h5 {
  margin-top: 5px;
}
.icon-container{
  display:flex;
  justify-content:space-around;
  text-align:center;
}
.icon-container .icon-item{
  font-size:12px;
  /* transition: 0.5s all;
  color:rgb(221, 24, 57); */
  cursor: pointer;
}
.icon-item .mu-icon{
  color:rgb(221, 24, 57);
  transition: 0.5s all ease-out;
}
.icon-item .mu-icon:hover{
  transform:rotate(360deg);
}
</style>