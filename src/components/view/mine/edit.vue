<template>
  <mu-container>
    <div class="detail-content">
      <!-- {{modifyValue}} -->
      <mu-text-field
        v-if="type=='userName'"
        v-model="modifyValue"
        placeholder="修改你的昵称"
        help-text="昵称可包含中文、英文、数字或“_”"
        :max-length="20"
        :error-text="errorMessage"
      ></mu-text-field>
      <mu-date-input
        v-else-if="type=='birthday'"
        icon="today"
        v-model="modifyValue"
        placeholder="修改你的生日"
        container="dialog"
        :max-date="maxBirthday"
        value-format="YYYY-MM-DD"
        no-display
        label-float
        actions
      ></mu-date-input>
      <mu-text-field
        v-else-if="type=='sign'"
        v-model="modifyValue"
        placeholder="修改你的签名"
        full-width
        :max-length="30"
      ></mu-text-field>
      <mu-text-field
        v-else-if="type=='personalProfile'"
        v-model="modifyValue"
        placeholder="修改你的简介"
        multi-line
        full-width
        :rows="2"
        :rows-max="3"
        :max-length="100"
      ></mu-text-field>
      <div v-else-if="type=='sex'">
        <mu-radio v-model="modifyValue" value="1" label="男"></mu-radio>
        <mu-radio v-model="modifyValue" value="2" label="女"></mu-radio>
      </div>
      <br />
      <mu-button small color="info" :disabled="!(validData&&validResult)" @click="modifyUserInfo">提交</mu-button>
      <!-- {{validData}}-{{validResult}} -->
    </div>
  </mu-container>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "PersonalInfoEdit",
  data() {
    return {
      type: this.$route.query.type,
      modifyValue: this.$route.query.modifyValue.toString(),
      maxBirthday: new Date(), //TODO 会出现跨天的时候无法选择今天的情况
      validResult: true,
      errorMessage: ""
    };
  },
  watch: {
    modifyValue(val, oldVal) {
      if (this.type == "userName") {
        //允许中文、字母、数字和_
        var reg = /^[\u4E00-\u9FA5|a-z|A-Z|0-9|_]+$/;
        // console.log("reg.test(val):" + reg.test(val))
        if (val == "") {
          this.errorMessage = "昵称不能为空";
        } else {
          if (reg.test(val)) {
            this.validResult = true;
            this.errorMessage = "";
            //TODO 实时校验用户名是否重复
          } else {
            this.validResult = false;
            this.errorMessage = "昵称只能包含中文、英文、数字和“_”";
          }
        }
      }
    }
  },
  created() {},
  computed: {
    user: function() {
      return this.$store.state.current_user;
    },
    validData: function() {
      if (this.modifyValue.trim() == this.user[this.type]) {
        return false;
      } else {
        return true;
      }
    },
    validUserName: function() {}
  },
  methods: {
    // 约束生日允许选择的日期,不允许选择今天之后的
    allowBirthdayDate() {
      if (typeof this.modifyValue != "string") {
        const now = new Date();
        return now.getTime() > this.modifyValue.getTime();
      }
    },
    //date对象格式化
    formateDate(date) {
      if (typeof date == "string") {
        return date;
      } else {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
    },
    modifyUserInfo() {
      console.log("sessionStorage:"+sessionStorage.getItem("Authorization-Sessionid"))
      var map = {};
      map[this.type] = this.modifyValue;
      map["userId"] = this.user.userId;
      // if (this.type == "birthday") {
      //   map[this.type] = this.$options.methods.formateDate(this.modifyValue);
      // }
      this.$http.user
        .updateUserInfo(map)
        .then(response => {
          if (response.data.code == "2000") {
            // 轻提示弹框
            Toast({
              message: "修改成功",
              duration: 2000,
              forbidClick: true
            });
            var newUser = response.data.data.user;
            sessionStorage.setItem("current_user", JSON.stringify(newUser));
            this.$store.commit("save_user", newUser);
            this.$router.back(-1);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.detail-content {
  padding-top: 10px;
}
@media screen and (min-width: 800px) {
  /* .detail-content {
    padding: 10px 10%;
  } */
}
</style>