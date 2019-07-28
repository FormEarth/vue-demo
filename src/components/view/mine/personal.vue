<template>
  <mu-container>
    <!-- <mu-appbar color="white" textColor="black" title="个人信息" z-depth="1">
      <mu-button icon slot="left" >
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
    </mu-appbar>-->
    <!-- <mu-paper :z-depth="1" class="demo-list-wrap"> -->
    <mu-appbar :z-depth="0" :color="this.$store.state.current_theme_color">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>个人信息
      <mu-button icon slot="right">
        <mu-icon value="view_quilt"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-list textline="two-line">
      <!-- <mu-sub-header>Folders</mu-sub-header> -->
      <mu-list-item avatar button :ripple="false" style="background:#ffffff;">
        <!-- <mu-list-item-action>
            <mu-avatar color="yellow600">
              <mu-icon value="insert_chart"></mu-icon>
            </mu-avatar>
        </mu-list-item-action>-->
        <mu-list-item-content>
          <mu-list-item-title>头像</mu-list-item-title>
          <!-- <mu-list-item-sub-title>Jan 10, 2014</mu-list-item-sub-title> -->
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="person"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
      </mu-list-item>
      <van-cell-group>
        <van-field
          v-model="user.name"
          maxlength="6"
          label="用户名"
          placeholder="请输入用户名"
          :disabled="disabled"
          right-icon="arrow"
          @click-right-icon="changeDisabled"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="user.sign"
          maxlength="30"
          label="个性签名"
          placeholder="请输入个性签名"
          :disabled="disabled"
          right-icon="arrow"
          @click-right-icon="changeDisabled"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="user.synopsis"
          maxlength="50"
          label="简介"
          placeholder="请输入简介"
          type="textarea"
          autosize
          :disabled="disabled"
          right-icon="arrow"
          @click-right-icon="changeDisabled"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="user.birthday"
          maxlength="10"
          label="生日"
          placeholder="请选择生日"
          readonly
          right-icon="arrow"
          @click-right-icon="showPopup"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="user.sex"
          maxlength="10"
          label="性别"
          placeholder="请选择性别"
          disabled
          right-icon="arrow"
          @click-right-icon="showDialog"
        />
      </van-cell-group>
    </mu-list>
    <!-- <mu-divider></mu-divider> -->
    <mu-list textline="two-line">
      <mu-sub-header>更多</mu-sub-header>
      <mu-list-item button :ripple="false">
        <!-- <mu-list-item-action>
            <mu-avatar color="blue">
              <mu-icon value="assignment"></mu-icon>
            </mu-avatar>
        </mu-list-item-action>-->
        <mu-list-item-content>
          <mu-list-item-title>Vacation itinerary</mu-list-item-title>
          <mu-list-item-sub-title>Jan 20, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="info"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item avatar button :ripple="false">
        <mu-list-item-action>
          <mu-avatar color="yellow600">
            <mu-icon value="insert_chart"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>Kitchen remodel</mu-list-item-title>
          <mu-list-item-sub-title>Jan 10, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="info"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <van-popup v-model="show_popup" position="bottom" :style="{ height: '37%' }">
      <van-datetime-picker
        title="选择出生日期"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate()"
        @cancel="closePopup"
      />
    </van-popup>
    <van-popup round v-model="show_dialog" :style="{ height: '25%',width: '70%' }">
      <div style="text-align:center;margin:5px 0">选择你的性别</div>
      <van-radio-group v-model="user.sex">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = '男'">
            <van-radio slot="right-icon" name="男" />
          </van-cell>
          <van-cell title="女" clickable @click="radio = '女'">
            <van-radio slot="right-icon" name="女" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- </mu-paper> -->
  </mu-container>
</template>
<script>

export default {
  name: "setting",
  data() {
    return {
      user: {
        name: "花间舞",
        sign: "爱也好，恨也罢，不过是我们想象出来强加于自己的幻像",
        synopsis:
          "油腻的师姐油腻的师姐油腻的师姐油腻的师姐油腻的师姐油腻的师姐油腻的师姐", //简介
        birthday: null,
        sex: ""
      },
      show_popup: false,
      show_dialog: false,
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(), //不单独设置会导致选值选不到
      errorMessage: "",
      disabled:true
    };
  },
  created() {
    console.log(
      "this.$store.state.current_theme:" + this.$store.state.current_theme
    );
    theme.use(this.$store.state.current_theme);
  },
  methods: {
    starArtice(star) {
      star ? (this.star = false) : (this.star = true);
    },
    //显示底部弹出层
    showPopup() {
      this.show_popup = true;
    },
    //隐藏底部弹出层
    closePopup() {
      this.show_popup = false;
    },
    confirmDate() {
      this.user.birthday = this.$options.methods.formatDate(this.currentDate); //注意在vue中method的调用方法
      this.show_popup = false;
    },
    formatDate(date) {
      var strDate = date.getFullYear() + "-";
      strDate += date.getMonth() + 1 + "-";
      strDate += date.getDate();
      return strDate;
    },
    showDialog() {
      this.show_dialog = true;
    },
    changeDisabled(){
      this.disabled=false
    }
  }
};
</script>
<style scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 500px;
  min-width: 350px;
}
.mu-appbar {
  width: 100%;
}
</style>