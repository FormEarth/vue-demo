<template>
  <div class="root-nav" :style="{backgroundImage: 'url(' + image + ')'}">
    <div class="nav-header">
      <a href="./">
        <span>D</span>
        <span>E</span>
        <span>M</span>
        <span>O</span>
        <span>O</span>
        <span>O</span>
      </a>
      <span class="normal-font" style="font-weight: lighter;">导航</span>
      <!-- <div style="position: absolute;right:0;top: 1em;right: 1em;">  -->
      <mu-menu placement="left-start" :open.sync="setting_open" style="position: absolute;right:0;top: 1em;right: 1em;">
        <mu-icon value="settings" color="white" @click="setting_open=!setting_open"></mu-icon>
        <mu-list slot="content" style="min-width:10em">
          <mu-list-item button>
            <mu-list-item-title>关注</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>关注</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      <!-- </div> -->
    </div>
    <div class="root-node">
      <div>
        <div class="search-area">
          <select name id>
            <option value="Google">Google</option>
            <option value="Bing">Bing</option>
            <option value="Baidu">Baidu</option>
          </select>
          <input
            class="search-box"
            type="text"
            name="search-box"
            id="search-box"
            placeholder="输入搜索内容"
          />
          <mu-icon value="search" size="30" class="search-icon"></mu-icon>
        </div>
        <div style="margin-top: 40px;display:flex;">
          <div style="color:white;margin:0 10px;text-align:center;">
            <div style>
              <img
                style="width:50px;height:50px;"
                src="http://192.168.149.115:9090/static/app/bilibili.png"
              />
            </div>bilibili
          </div>
          <div style="color:white;margin:0 10px;text-align:center;">
            <img
              style="width:50px;height:50px;"
              src="http://192.168.149.115:9090/static/app/zhihu.jpg"
            />
            <br />知乎
          </div>
          <div style="color:white;margin:0 10px;text-align:center;">
            <img
              style="width:50px;height:50px;"
              src="http://192.168.149.115:9090/static/app/github_1.png"
            />
            <br />GitHub
          </div>
          <div style="color:white;margin:0 10px;text-align:center;">
            <img
              style="width:50px;height:50px;"
              src="http://192.168.149.115:9090/static/app/weibo.webp"
            />
            <br />weibo
          </div>
          <!-- <div class="bookmark">书签</div>
          <div class="bookmark">书签</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      setting_open: false,
      image: require("@/assets/images/albedo.png")
      // search_svg: require("@/assets/images/svg/search.svg")
    };
  },
  methods: {
    getURLInfo() {
      //   html_string = response.content.decode(automatic_detect(url));
      //   var titleRegx = /<title>(.+)<\/title>/;
      //   var title = reg.exec(html_string)[0]
      //   console.log(title)
    }
  }
};
</script>

<style scoped>
.root-nav {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.root-node {
  position: absolute;
  left: 30%;
  top: 20%;
  width: 70%;
}

.nav-header {
  padding: 10px 0 0 20px;
}

.nav-header a {
  color: black;
  text-decoration-line: none;
}

.nav-header a span {
  font-family: "Dressedless Three", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 2.8em;
  font-weight: lighter;
}

.nav-header a span:nth-child(1) {
  color: #4286f3;
}

.nav-header a span:nth-child(2) {
  color: #eb4537;
}

.nav-header a span:nth-child(3) {
  color: #fac230;
}

.nav-header a span:nth-child(4) {
  color: #55af7b;
}

label,
.normal-font {
  font-size: 1.6em;
}

select {
  border: none;
  outline: none;
}

.search-area {
  display: inline-block;
  min-width: 40em;
  background-color: #ffffff;
  position: relative;
  border-radius: 3px;
  transition: all 0.5s ease-out;
}

.search-area:focus-within {
  min-width: 50em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.search-area:focus-within .mu-icon {
  color: #4286f3;
}

.search-box {
  height: 2.9em;
  width: 80%;
  border: none;
  outline: 0;
  padding: 0.3em 0.4em;
  transition: all 0.5s;
}

.search-icon {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  cursor: pointer;
}

.bookmark {
  color: #dddada;
  font-size: 1.6em;
  display: block;
  background-color: rgba(0, 0, 0, 0.19);
  border-radius: 50px;
  max-width: 400px;
  height: 30px;
  margin: 10px 0;
  padding: 0 10px;
  line-height: 30px;
}
</style>