<template>
  <div>
    <el-input
      type="textarea"
      v-model="userComment"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="Add a comment..."
    ></el-input>
    <div class="submit-btn-container">
      <el-button
        @click="handleSubmitComment"
        style="padding: 8px; border-top: none"
        >Comment</el-button
      >
    </div>
    <div style="display: flex; justify-content: center">
      <span
        v-if="isErrorMessageDisplayed"
        style="font-size: small; color: red; padding: 5px"
        >{{ errorMsg }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({
  name: "AddCommentCard",
})
export default class extends Vue {
  public userComment = "";
  public errorMsg = "";

  get isErrorMessageDisplayed(): boolean {
    return this.errorMsg.length > 0;
  }
  public handleSubmitComment(): string | void {
    const comment = this.userComment;
    if (!comment || comment === "") {
      this.errorMsg = "Comment cannot be empty!";
      setTimeout(() => {
        this.errorMsg = "";
      }, 2000);
      return;
    }
    this.userComment = "";
    console.log(`Comment: ${comment}`);
    return this.submitComment(comment);
  }
  @Emit()
  submitComment(text: string): string {
    return text;
  }
}
</script>

<style scoped>
.submit-btn-container {
  display: flex;
  justify-content: center;
}
.el-button {
  width: 100%;
  font-size: small;
  font-weight: 600;
}
.el-button:active {
  border-color: rgba(187, 114, 114, 0.11);
  background-color: #ffe4e6;
  color: #9f1239;
}
.el-button:focus {
  background-color: white;
  color: black;
}
.el-button:hover {
  background-color: #fb7185;
  color: white;
}
.el-input:active {
  border-color: #fb7185;
}
:deep(.el-textarea__inner) {
  font-family: "Inter", sans-serif;
}
</style>
