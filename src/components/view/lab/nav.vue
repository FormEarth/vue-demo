<template>
  <demo-transition>
    <div class="demooo-nav" :style="{backgroundImage: 'url(' + image + ')'}">
      <!-- <div class="demooo-nav"> -->
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
        <mu-menu placement="left-start" :open.sync="setting_open"
          style="position: absolute;right:0;top: 1em;right: 1em;">
          <mu-icon value="settings" color="white" @click="setting_open=!setting_open"></mu-icon>
          <mu-list slot="content" style="min-width:10em">
            <mu-list-item button>
              <mu-list-item-title>更换壁纸</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title>设置</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
        <!-- </div> -->
      </div>
      <div class="root-node">
        <div>
          <div :class="['search-area',focus?'search-shadow':'']">
            <div class="select-box">
              <mu-select filterable solo v-model="selected_engine" style="width:100px;">
                <mu-option v-for="(engine,index) in engines" :key="index" :label="engine" :value="index"></mu-option>
              </mu-select>
            </div>
            <div class="search-box">
              <input class="search-input" type="text" placeholder="输入搜索内容" v-model="keyword" @focus="focus=true"
                @blur="focus=false" />
              <mu-icon value="search" size="30" class="search-icon" @click="SearchGo"></mu-icon>
            </div>
          </div>
          <div></div>
          <div style="margin-top: 40px;display:flex;">
            <div class="net-item" v-for="item in net_array">
              <div :title="item.name" @click="open_net(item.address)">
                <img style="width:50px;height:50px;vertical-align: middle;border-radius: 5px;" :src="item.icon" />
              </div>
              <!-- {{item.name}} -->
            </div>
            <div class="net-item" style="display: flex;justify-content: center;flex-direction: column;">
              <mu-icon value="add" size="40" title="添加网站" @click="show_net_modal=true;"></mu-icon>
            </div>
          </div>
          <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false"
            :open.sync="show_net_modal">
            <div slot="title">Add Net</div>
            <mu-text-field v-model="net_form.name" placeholder="Web Name"></mu-text-field>
            <mu-text-field v-model="net_form.address" placeholder="Web Address"></mu-text-field>
            <input id="upload" type="file" accept="image/png,image/jpg,image/jpeg,image/gif"
              @change="addFile($event)" />
            <mu-button slot="actions" flat color="primary" @click="show_net_modal=false;">Cancel</mu-button>
            <mu-button slot="actions" flat color="primary" @click="submit_data">Save</mu-button>
          </mu-dialog>
        </div>
      </div>
    </div>
  </demo-transition>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        engines: ["bing", "google", "baidu"],
        selected_engine: 0,
        keyword: "",
        setting_open: false,
        image: require("@/assets/images/albedo.png"),
        focus: false,
        net_array: [
        ],
        net_form: {
          name: '',
          address: '',
          file: null
        },
        show_net_modal: false
      };
    },
    created() {
      this.query_bookmark()
    },
    methods: {
      SearchGo() {
        if (this.keyword == "") {
          this.$demo_notify("请输入搜索内容");
          return;
        }
        if (this.selected_engine == 0) {
          window.open("https://cn.bing.com/search?q=" + this.keyword);
        } else if (this.selected_engine == 1) {
          window.open("https://www.google.com.hk/search?q=" + this.keyword);
        } else if (this.selected_engine == 2) {
          window.open("https://www.baidu.com/s?wd=" + this.keyword);
        }
      },
      getURLInfo() {
        //   html_string = response.content.decode(automatic_detect(url));
        //   var titleRegx = /<title>(.+)<\/title>/;
        //   var title = reg.exec(html_string)[0]
        //   console.log(title)
      },
      // 添加本地图片
      addFile(event) {
        var file = event.target.files[0]
        let fileType = file.type ? file.type : "image/jpg"
        console.log("文件类型:" + fileType);
        var regex = /image\/jpg|png|jpeg|gif/;
        if (!regex.test(fileType)) {
          this.$demo_notify("文件类型不匹配," + fileType);
          return;
        }
        let fileSize = file.size;
        if (fileSize / 1024 / 1024 > 5) {
          this.$demo_notify("文件不能超过3M");
          return;
        }
        this.net_form.file = file
        event.target.value = ""; //清空内容，解决无法二次上传同一文件问题
      },
      query_bookmark() {
        this.$http.user.query_bookmark().then(res => {
          if (res.data.code == "2000") {
            this.net_array = res.data.data.list
          }
        })
      },
      submit_data() {
        let formData = new FormData()
        for (let key in this.net_form) {
          formData.append(key, this.net_form[key])
        }
        this.$http.user.add_bookmark(formData).then(res => {
          if (res.data.code == "2000") {
            this.net_array.push(res.data.data.bookmark)
            this.show_net_modal = false;
            this.$demo_notify("新增成功");
          }
        })
      },
      open_net(address){
        console.log(address)
        window.open(address)
      }
    },
  };
</script>

<style scoped>
  .demooo-nav {
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
    /* display: inline-block; */
    display: flex;
    /* min-width: 40em; */
    width: 60%;
    background-color: #ffffff;
    position: relative;
    border-radius: 3px;
    transition: all 0.5s ease-out;
    padding-left: 1em;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  }

  /* .search-box:focus-within {
  width: 40em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} */

  .search-input {
    height: 100%;
    width: 100%;
    border: none;
    outline: 0;
    /* padding: 0.3em 0.4em; */
    transition: all 0.5s;
    background-color: transparent;
  }

  /* .search-input:focus > .search-box{
  background-color: #fac230;
} */
  .select-box {
    width: 90px;
  }

  .search-box {
    padding-left: 8px;
    flex: 1;
    display: inline-block;
    /* min-width: 35em; */
    transition: all 0.5s;
  }

  .search-shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .search-icon {
    position: absolute;
    top: 9px;
    right: 5px;
    vertical-align: middle;
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

  .lab-card {
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #eee;
    height: 204px;
    padding: 20px;
    /* position: absolute; */
    width: 296px;
    background-color: #ffffff;
  }

  .net-item {
    color: white;
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
  }
</style>