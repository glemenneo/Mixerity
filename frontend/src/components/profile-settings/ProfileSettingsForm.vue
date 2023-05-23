<template>
  <div class="profile-settings-form">
    <el-form
      :model="authForm"
      :rules="rules"
      status-icon
    >
      <el-form-item
        label="Display Name"
        prop="displayName"
      >
        <el-input
          v-model="authForm.username"
          placeholder="Enter new display name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Username"
        prop="username"
      >
        <el-input
          v-model="authForm.username"
          placeholder="Enter new username"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="authForm.email"
          placeholder="Enter new email address"
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
          placeholder="Enter new password"
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
          placeholder="Re-enter new password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="update-button">
      <el-button
        type="primary"
        @click="handleUpdateButtonClick"
        style="background-color: #f43f5e"
        icon="el-icon-check"
      >
        Update
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthRes } from "@/store/modules/AuthModule";
import { AuthActions } from "@/store/modules/AuthModule";
import { Vue, Component } from "vue-property-decorator";
import { ProfileSettingDetails } from "./UpdateDetails";
import { UsersActions } from "@/store/modules/UsersModule";
import { User } from "@/models/UserModel";

@Component({
  name: "ProfileSettingsForm",
})
export default class extends Vue {
  authForm: ProfileSettingDetails = {
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  rules = {
    displayName: [
      {
        required: true,
        message: "Please input username",
        trigger: "blur",
      },
    ],
    username: [
      {
        required: true,
        message: "Please input username",
        trigger: "blur",
      },
      {
        validator: (
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validateUsername(value, callback);
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
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validatePassword(value, callback);
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
          value: string,
          callback: (arg0: Error | undefined) => void
        ) => {
          this.validateConfirmPass(value, callback);
        },
        trigger: "blur",
      },
    ],
  };

  validateUsername = (
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

  handleUpdateButtonClick(): void {
    const authRes: Promise<AuthRes> = this.$store.dispatch(
      `auth/${AuthActions.REGISTER_USER}`,
      this.authForm
    );
    authRes.then((res) => {
      if (res.isSuccessful) {
        this.$message.success(res.message);
        this.$router.push(`/`).catch(() => {
          return;
        });
      } else {
        this.$message.error(res.message);
      }
    });
  }
  handleLoginButtonClick(): void {
    this.$router.push(`/login`);
  }
  created() {
    const authUser = this.$store.getters[`auth/${AuthActions.GET_AUTH_USER}`];
    const uid = authUser?.uid;
    // let currUser: User | undefined;
    if (uid) {
      // currUser = this.$store.dispatch(
      //   `users/${UsersActions.GET_USER_BY_ID}`,
      //   uid
      // );
      console.log(uid);
    }
  }
}
</script>

<style scoped>
.update-button {
  display: flex;
  justify-content: center;
}
.el-button {
  margin: 10px 20px;
  border: none;
}
.profile-settings-form {
  margin-top: 30px;
}
</style>
