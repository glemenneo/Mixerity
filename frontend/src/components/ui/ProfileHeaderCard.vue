<template>
  <div class="profile-header">
    <el-avatar
      :size="displayPicSize"
      :src="profileImgUrl"
    ></el-avatar>
    <div class="container">
      <p
        style="
          margin-block-start: 2px;
          margin-block-end: 2px;
          font-size: xx-large;
        "
      >
        {{ name }}
      </p>
      <p style="margin-block-start: 0px; margin-block-end: 0px; color: grey">
        {{ username }}
      </p>
      <div class="buttons-container">
        <el-button
          type="primary"
          class="follow-btn"
          >Follow</el-button
        >
        <el-button
          type="primary"
          class="message-btn"
          >Message</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "ProfileHeaderCard",
})
export default class extends Vue {
  profileImgUrl =
    "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
  displayPicSize = 100;
  name = "John Doe";
  username = "@johndoegiraffe";

  get getLeftMargin() {
    return {
      "margin-left": `${this.displayPicSize + 30}px`,
    };
  }
}
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
}
.el-avatar {
  margin-right: 20px;
}
.container {
  display: flex;
  flex-direction: column;
}
.section {
  margin: 25px;
}
.buttons-container {
  display: flex;
  margin-top: 20px;
}
.el-button {
  height: 12px;
  line-height: 0px;
  width: min-content;
  border: none;
}
.el-button:hover {
  background-color: #fda4af;
}
.message-btn,
.message-btn:active {
  background-color: #f1f5f9;
  color: black;
}
.message-btn:hover {
  background-color: #f6f9fca2;
}
.follow-btn,
.follow-btn:active {
  background-color: #f43f5e;
}
</style>
