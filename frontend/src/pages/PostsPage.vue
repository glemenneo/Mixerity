<template>
  <div class="page-view posts-page">
    <el-container>
      <el-header>
        <h1>For You Page</h1>
      </el-header>
    </el-container>
    <PostList />
  </div>
</template>

<script lang="ts">
import PostList from "@/components/posts/PostList.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "ForYouPage",
  components: {
    PostList,
  },
})
export default class extends Vue {}
</script>

<style scoped>
.posts-page {
  height: max-content;
  background: #f8fafc;
}
</style>
