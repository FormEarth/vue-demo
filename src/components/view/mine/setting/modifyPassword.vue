<template>
  <div class="root-node">
    <!-- <mu-form ref="form" :model="form"> -->
    <mu-text-field
      type="password"
      v-model.trim="form.oldPassword"
      label="原密码"
      help-text="当前密码"
      max-length="10"
      :error-text="oldPasswordError"
      label-float
      full-width
    ></mu-text-field>
    <mu-text-field
      type="password"
      v-model.trim="form.newPassword"
      label="新密码"
      help-text="新密码，6~10位，数字或字母"
      max-length="10"
      :error-text="newPasswordError"
      label-float
      full-width
    ></mu-text-field>
    <mu-text-field
      type="password"
      v-model.trim="form.repeatPassword"
      label="确认密码"
      help-text="再次输入新密码"
      max-length="10"
      :error-text="repeatPasswordError"
      label-float
      full-width
    ></mu-text-field>
    <br />
    <br />
    <mu-button color="#1565c0" :disabled="disabled" full-width @click="modifyPassword">修改</mu-button>
    <!-- <mu-button>重置</mu-button> -->
    <!-- </mu-form> -->
  </div>
</template>

<script>
export default {
  name: "ModifyPassword",
  data() {
    return {
      form: {
        newPassword: "",
        oldPassword: "",
        repeatPassword: ""
      },
      newPasswordError: "",
      oldPasswordError: "",
      repeatPasswordError: "",
      disabled: true
    };
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (this.validitData(newVal)) {
          this.disabled = false;
        }
      },
      deep: true
    }
  },
  methods: {
    //修改密码
    modifyPassword() {
      if (this.$options.methods.validitData(this)) {
        this.$http.user.modifyOwnPassword(this.form).then(response => {
          if (response.data.code == "2000") {
            this.$toast("密码修改成功！");
            this.$router.back(-1);
          }
        });
      }
    },
    //数据校验
    validitData(_this) {
      //   console.log(
      //     "_this:" +
      //       _this.oldPassword +
      //       "," +
      //       _this.newPassword +
      //       "," +
      //       _this.repeatPassword
      //   );
      let regex = /^[0-9a-zA-Z]{6,10}$/;
      if (_this.oldPassword == "") {
        this.oldPasswordError = "原密码不能为空";
        return false;
      } else {
        if (!regex.test(_this.oldPassword)) {
          this.oldPasswordError = "只能为6~10位的字母或数字";
          return false;
        } else {
          this.oldPasswordError = "";
        }
      }

      if (_this.newPassword == "") {
        this.newPasswordError = "新密码不能为空";
        return false;
      } else {
        if (!regex.test(_this.newPassword)) {
          this.newPasswordError = "只能为6~10位的字母或数字";
          return false;
        } else {
          this.newPasswordError = "";
        }
      }

      if (_this.repeatPassword == "") {
        this.repeatPasswordError = "密码不能为空";
        return false;
      } else {
        if (regex.test(_this.repeatPassword)) {
          if (_this.repeatPassword != _this.newPassword) {
            this.repeatPasswordError = "两次输入的新密码不一致";
            return false;
          } else {
            this.repeatPasswordError = "";
          }
        } else {
          this.repeatPasswordError = "只能为输入6~10位的字母或数字";
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
.root-node {
  padding: 0 10px;
  max-width: 400px;
}
</style>