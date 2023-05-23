<template>
  <el-col :span="3">
    <el-menu
      default-active="2"
      active-text-color="#2dd4bf"
      :unique-opened="true"
      :router="true"
      style="border: none"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu
        index="1"
        title="true"
      >
        <template v-slot:title>
          <i class="el-icon-house"></i>
          <span>Posts</span>
        </template>
        <el-menu-item index="/">All Posts</el-menu-item>
        <el-menu-item index="/myPosts">My Posts</el-menu-item>
        <el-menu-item index="/create">Create Post</el-menu-item>
      </el-submenu>
      <el-submenu
        index="2"
        title="true"
      >
        <template v-slot:title>
          <i class="el-icon-chat-dot-round"></i>
          <span>Followers</span>
        </template>
        <el-menu-item index="/followers">View All Followers</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home">
        <i class="el-icon-headset"></i>
        <span>About Us</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  handleOpen(key: unknown, keyPath: unknown) {
    console.log(key, keyPath);
  }
  handleClose(key: unknown, keyPath: unknown) {
    console.log(key, keyPath);
  }
}
</script>

<style scoped>
.el-col {
  position: fixed;
  top: 61px;
  bottom: 0%;
  left: 0%;
  background-color: white;
  width: var(--base-nav-menu-width);
}
</style>
