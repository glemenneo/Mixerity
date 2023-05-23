<template>
  <div class="page-view logout-view">
    <el-container>
      <p style="margin-top: 20%">Are you sure you want to logout?</p>
    </el-container>
    <el-container>
      <el-button
        type="danger"
        @click="handleLogoutButtonClick"
        >Yes</el-button
      >
      <el-button @click="handleCancelButtonClick">No</el-button>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AuthActions } from "@/store/modules/AuthModule";

@Component({
  name: "LogoutView",
})
export default class extends Vue {
  handleLogoutButtonClick(): void {
    this.$store.dispatch(`auth/${AuthActions.LOGOUT_USER}`);
    setTimeout(() => this.$router.push(`/login`), 1000);
  }

  handleCancelButtonClick(): void {
    this.$router.go(-1);
  }
}
</script>

<style scoped>
.logout-view {
  height: 100vh;
}
.el-container {
  display: flex;
  justify-content: center;
}
</style>
