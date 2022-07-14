<template>
  <div class="loginPage">
    <div class="wifindText">WIFind 打卡系統</div>
    <div class="loginBar">
      <form>
        <span class="spanText">員工編號test</span>
        <input
          type="text"
          class="inputText"
          size="30"
          v-model="code"
          v-bind:class="{ 'is-invalid': codeError }"
        />
        <div class="invalid-feedback">{{ codeErrMsg }}</div>
        <br />
        <span class="spanText">&emsp;&emsp;密碼</span>
        <input
          type="password"
          class="inputText"
          size="30"
          v-model="password"
          v-bind:class="{ 'is-invalid': passwordError }"
        />
        <div class="invalid-feedback">{{ passwordErrMsg }}</div>
        <br />
        <button class="btn btn-primary" @click="submitAccount()" type="button">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      code: "",
      codeError: true,
      codeErrMsg: "請填入員編!",
      password: "",
      passwordError: true,
      passwordErrMsg: "請填入密碼!",
    };
  },
  watch: {
    code: function () {
      // const re =
      //   /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
      if (this.code == "") {
        this.codeError = true;
        this.codeErrMsg = "請填入員編!";
        // } else if (!re.test(this.code)) {
        //   this.codeError = true;
        //   this.codeErrMsg = "格式錯誤！";
      } else {
        this.codeError = false;
      }
    },
    password: function () {
      const re = /^[a-zA-Z0-9]+$/;
      if (this.password == "") {
        this.passwordError = true;
        this.passwordErrMsg = "請填入密碼!";
      } else if (!re.test(this.password)) {
        this.passwordError = true;
        this.passwordErrMsg = "請勿包含特殊字元！";
      } else if (this.password.length < 6) {
        this.passwordError = true;
        this.passwordErrMsg = "密碼長度請勿低於6個字元";
      } else {
        this.passwordError = false;
      }
    },
  },
  methods: {
    submitAccount() {
      let userData = {
        username: this.code,
        passwd: this.password,
      };
      // console.log(userData);

      if (this.codeError === true || this.passwordError === true) {
        alert("輸入資料格式錯誤");
        return false;
      } else {
        axios
          .post("http://34.125.253.73:8080/login", userData)
          .then((res) => {
            // console.log(res.data);
            alert(`您好，${res.data.ReturnData[0].username}`);
            this.$store.commit("addUserInformation", res.data.ReturnData);
            return this.$router.push("/table");
            // if (res.data.message) {
            //   alert(`您好，${res.data.ReturnData[0].username}`);
            //   this.$store.commit(
            //     "addUserName",
            //     res.data.ReturnData[0].username
            //   );
            //   // this.$store.commit("addUserId", res.data.userId);
            //   return this.$router.push("/CheckIn");
            // } else if (!res.data.message) {
            //   alert("錯誤的帳號或密碼!!");
            //   return this.$router.push("/");
            // }
          })
          .catch((err) => {
            console.log(err);
            alert("錯誤的帳號或密碼!!");
            return this.$router.push("/");
          });
      }
    },
  },
};
</script>

<style scoped>
.loginPage {
  width: 400px;
  height: 170px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wifindText {
  letter-spacing: 2px;
  font-size: 48px;
  font-weight: 600;
  color: #5891e5;
  margin-bottom: 38px;
}
.inputText {
  margin-bottom: 38px;
  margin-left: 24px;
}
.loginBar {
  text-align: start;
}
.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.invalid-feedback {
  text-align: center;
  margin-top: -30px;
}
@media screen and (max-width: 450px) {
  .wifindText {
    letter-spacing: 1px;
    font-size: 35px;
    font-weight: 600;
    color: #5891e5;
    margin-bottom: 38px;
  }
  .loginBar {
    text-align: center;
  }
  .inputText {
    width: 200px;
  }
}
</style>

<script setup></script>
