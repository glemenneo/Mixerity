<template>
  <div class="page-view login-request-display">
    <el-empty>
      <span slot="description">You must be logged in to view this page.</span>
      <el-button
        type="primary"
        @click="handleLoginButtonClick"
        >Go to Login</el-button
      >
    </el-empty>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "LoginRequestDisplay",
})
export default class extends Vue {
  handleLoginButtonClick(): void {
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.login-request-display {
  height: 100vh;
  padding-top: 10%;
}
.el-button {
  background-color: #f43f5e;
  border: none;
}
</style>
