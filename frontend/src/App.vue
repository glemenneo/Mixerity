<template>
  <div class="app-body"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
})
export default class extends Vue {}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

#app {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 0px;
  background-color: #f8fafc;
  height: max-content;
  overflow: hidden;
  width: 100vw;
}
:root {
  --z-index-top-menu: 5;
  --z-index-expanded-img: 999;
  --base-nav-menu-width: 200px;
  --base-menu-height: 60px;
}
.app-body {
  margin: 0px;
  padding: 0px;
  background: #f8fafc;
  font-family: "Inter", Helvetica, Arial, sans-serif;
}
/* Remove default margin */
body {
  margin: 0;
}
/* Pages general interface */
.page-view {
  margin-top: var(--base-menu-height);
  margin-left: var(--base-nav-menu-width);
  padding: 20px;
  padding-right: 25px;
  height: 100vh;
}
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: f7f7f76;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #f7f7f78d;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f3f3f3ba;
}
/* Routing transition */
.fade-enter {
  opacity: 0;
  transform: translateX(100px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
