<template>
  <div class="selected-post-page">
    <el-button
      type="primary"
      icon="el-icon-circle-close"
      @click="handleClosePage"
      >Close</el-button
    >
    <img
      :src="imgUrl"
      alt=""
      class="image"
    />
  </div>
</template>

<script lang="ts">
import { Post } from "@/models/PostModel";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "ExapandedPostImage",
})
export default class extends Vue {
  @Prop() postId!: number;

  @Emit()
  closeExpandedImage(): boolean {
    return true;
  }

  isImageExpanded = true;

  get imgUrl(): string {
    const post: Post = this.$store.getters["posts/getPostByPid"](this.postId);
    if (!post) {
      return "";
    }
    return post.imgUrl;
  }

  handleClosePage(): void {
    this.closeExpandedImage();
  }
}
</script>

<style scoped>
.selected-post-page {
  z-index: var(--z-index-expanded-img);
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.85);
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
}
.image {
  height: 100%;
  width: 100%;
  max-height: max-content;
  max-width: max-content;
}
.el-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: rgb(156, 156, 156);
}
</style>
