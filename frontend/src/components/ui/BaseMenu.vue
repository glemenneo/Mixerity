<template>
  <div class="base-top-menu">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      active-text-color="#2dd4bf"
      :router="true"
      @select="handleSelector"
    >
      <el-menu-item
        index="1"
        style="margin-left: auto"
      >
        <template v-slot:title>
          <i class="el-icon-bell"></i>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template v-slot:title>
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="profileSettings">
          <span class="el-icon-setting"></span>
          Profile Settings
        </el-menu-item>
        <el-menu-item :index="isUserAuth ? 'logout' : 'login'"
          ><span
            :class="isUserAuth ? 'el-icon-circle-close' : 'el-icon-user-solid'"
          ></span>
          {{ isUserAuth ? "Logout" : "Login" }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-input
      class="search-bar"
      prefix-icon="el-icon-search"
      placeholder="Search"
      v-model="searchInput"
      size="medium"
      :autofocus="true"
      clearable
    >
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  activeIndex = "";
  searchInput = "";

  get isUserAuth() {
    return this.$store.getters["auth/isUserAuth"];
  }

  handleSelector(key: unknown, keyPath: unknown) {
    console.log(typeof key, typeof keyPath);
    console.log(key, keyPath);
  }
}
</script>

<style scoped>
.el-menu {
  display: flex;
  align-items: center;
}
.el-menu,
.el-menu-item,
.el-submenu,
.el-menu-item.is-active {
  height: var(--base-menu-height);
  border-bottom-color: none;
}
.el-input {
  margin: auto;
}
:deep(.el-input__inner) {
  border-radius: 15px;
  border: 1px solid #dcdfe6;
}
:deep(.el-menu-item.search-bar.is-active) {
  border-bottom-color: black;
}
.search-bar {
  width: 40%;
  position: absolute;
  top: 10px;
  left: 30%;
}
.base-top-menu {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--z-index-top-menu);
}
</style>
