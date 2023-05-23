<template>
  <div class="login-view">
    <h1>Login</h1>
    <el-form
      :model="authForm"
      :rules="rules"
      status-icon
      id="login-form"
    >
      <el-form-item
        label="Username"
        prop="username"
      >
        <el-input
          v-model="authForm.username"
          placeholder="Username"
          id="Username"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input
          type="password"
          v-model="authForm.password"
          autocomplete="off"
          show-password
          placeholder="Password"
          id="Password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="login-register-buttons">
      <el-button
        type="primary"
        @click="handleLoginButtonClick"
        style="background-color: #f43f5e"
        icon="el-icon-position"
      >
        Login
      </el-button>
      <el-button
        type="text"
        @click="handleRegisterButtonClick"
        style="color: #f43f5e"
      >
        No account? Register here now!
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AuthActions } from "@/store/modules/AuthModule";

@Component({
  name: "LoginView",
})
export default class extends Vue {
  authForm = {
    username: "",
    password: "",
  };
  rules = {
    username: [
      {
        required: true,
        message: "Please input username",
        trigger: "blur",
      },
      {
        validator: (
          rule: any,
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validateUsername(rule, value, callback);
        },
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input password",
        trigger: "blur",
      },
    ],
  };

  validateUsername = (
    rule: any,
    value: string,
    callback: (arg0: Error | undefined) => void
  ) => {
    if (!value) {
      callback(new Error("Please input username"));
    } else {
      if (value.length < 6) {
        callback(new Error("Username should be at least 6 characters"));
      } else {
        callback(undefined);
      }
    }
  };

  handleLoginButtonClick(): void {
    const user = this.authForm;
    const isLoginSuccessful = this.$store.dispatch(
      `auth/${AuthActions.LOGIN_USER}`,
      user
    );
    isLoginSuccessful.then((res) => {
      if (!res.isSuccessful) {
        this.$message({
          message: res.message,
          type: "error",
        });
      } else {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.$router.push(`/posts`).catch(() => {
          return;
        });
      }
    });
  }

  handleRegisterButtonClick(): void {
    this.$router.push(`/register`);
  }
}
</script>

<style scoped>
.login-view {
  height: 100vh;
}
.login-register-buttons {
  display: flex;
  justify-content: center;
}
.el-button {
  margin: 10px 20px;
  border: none;
}
</style>
