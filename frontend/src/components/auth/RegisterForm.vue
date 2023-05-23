<template>
  <div class="register-view">
    <h1>Register</h1>
    <el-form
      :model="authForm"
      :rules="rules"
      status-icon
      id="register-form"
    >
      <el-form-item
        label="Username"
        prop="username"
      >
        <el-input
          v-model="authForm.username"
          placeholder="Username"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="authForm.email"
          placeholder="Email address"
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
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Confirm Password"
        prop="confirmPassword"
      >
        <el-input
          type="password"
          v-model="authForm.confirmPassword"
          autocomplete="off"
          show-password
          placeholder="Re-enter password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="login-register-buttons">
      <el-button
        type="primary"
        @click="handleRegisterButtonClick"
        style="background-color: #f43f5e"
        icon="el-icon-finished"
      >
        Register
      </el-button>
      <el-button
        type="text"
        @click="handleLoginButtonClick"
        style="color: #f43f5e"
      >
        Already have an account? Login here!
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthRes } from "@/store/modules/AuthModule";
import { AuthActions } from "@/store/modules/AuthModule";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "RegisterView",
})
export default class extends Vue {
  authForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    email: [
      {
        required: true,
        message: "Please input email address",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Please input correct email address",
        trigger: ["blur", "change"],
      },
    ],
    password: [
      {
        required: true,
        message: "Please input password",
        trigger: "blur",
      },
      {
        validator: (
          rule: any,
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validatePassword(rule, value, callback);
        },
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: "Please confirm your password",
        trigger: "blur",
      },
      {
        validator: (
          rule: any,
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validateConfirmPass(rule, value, callback);
        },
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

  validatePassword = (
    rule: any,
    value: string,
    callback: (arg0: Error | undefined) => void
  ) => {
    if (!value) {
      callback(new Error("Please input password"));
    } else {
      if (value.length < 8) {
        callback(new Error("Password should be at least 8 characters"));
      } else {
        callback(undefined);
      }
    }
  };

  validateConfirmPass = (
    rule: any,
    value: string,
    callback: (arg0: Error | undefined) => void
  ) => {
    if (value === "") {
      callback(new Error("Please confirm your password"));
    } else if (value !== this.authForm.password) {
      callback(new Error("The two passwords do not match!"));
    } else {
      callback(undefined);
    }
  };

  handleRegisterButtonClick(): void {
    const authRes: Promise<AuthRes> = this.$store.dispatch(
      `auth/${AuthActions.LOGIN_USER}`,
      this.authForm
    );
    authRes.then((res) => {
      if (res.isSuccessful) {
        this.$message.success(res.message);
        this.$router.push(`/`);
      } else {
        this.$message.error(res.message);
      }
    });
  }

  handleLoginButtonClick(): void {
    this.$router.push(`/login`);
  }
}
</script>

<style scoped>
.login-register-buttons {
  display: flex;
  justify-content: center;
}
.el-button {
  margin: 10px 20px;
  border: none;
}
</style>
