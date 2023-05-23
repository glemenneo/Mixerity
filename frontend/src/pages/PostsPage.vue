<template>
  <div class="page-view posts-page">
    <span class="header">Feed</span>
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
.header {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: #cbd5e1;
}
</style>
