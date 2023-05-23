<template>
  <div>
    <el-container v-if="hasPosts"
      >There are currently no posts available. Create one now!</el-container
    >
    <div>
      <ul>
        <PostCard
          v-for="post in allPosts"
          :key="post.pid"
        >
          <template v-slot:image>
            <img
              :src="post.imgUrl"
              style="position: absolute; height: 100%; width: 100%"
            />
            <el-button @click="handleImageClick(post)" />
            <ExpandedPostImage
              v-if="isImageExpanded(post.pid)"
              :postId="post.pid"
              @close-expanded-image="handleCloseExpandedImage"
            />
          </template>
          <template v-slot:description>
            <DescriptionCard
              :description="post.desc"
              :username="getPostUsername(post)"
              :tags="post.tags"
            />
          </template>
          <template v-slot:submitComment>
            <AddCommentCard @submit-comment="handleSubmitComment" />
          </template>
          <template v-slot:comments>
            <li
              style="list-style-type: none"
              v-for="comment in getComments(post)"
              :key="comment"
            >
              <CommentCard :text="comment" />
            </li>
            <div
              v-if="hasComments(post)"
              class="no-comment-div"
            >
              There are currently no comments. Say something!
            </div>
          </template>
        </PostCard>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import PostCard from "../ui/PostCard.vue";
import BaseBadge from "../ui/BaseBadge.vue";
import { Post } from "@/models/PostModel";
import CommentCard from "../ui/CommentCard.vue";
import DescriptionCard from "../ui/DescriptionCard.vue";
import ExpandedPostImage from "./ExpandedPostImage.vue";
import AddCommentCard from "./AddCommentCard.vue";
import LoginRequestDisplay from "../auth/LoginRequestDisplay.vue";

@Component({
  name: "PostList",
  components: {
    AddCommentCard,
    PostCard,
    BaseBadge,
    CommentCard,
    DescriptionCard,
    ExpandedPostImage,
    LoginRequestDisplay,
  },
  computed: {
    ...mapGetters("posts", ["hasPosts", "getPosts"]),
  },
  methods: {
    ...mapMutations("posts", ["setPosts"]),
  },
})
export default class extends Vue {
  currImageExpandedIndex: number | undefined = -1;

  get isUserAuth(): boolean {
    return this.$store.getters["auth/isUserAuth"];
  }

  get hasPosts(): boolean {
    return this.$store.getters["posts/hasPosts"];
  }
  get allPosts(): Post[] {
    return this.$store.getters["posts/getPosts"];
    // Todo: should use async dispatch to load posts
  }
  getComments(post: Post): string[] {
    console.log("Get comments: ", post);
    return [
      "Comment 1...",
      "Comment 2...",
      "Comment 3...",
      "Comment 4...",
      "Comment 5...",
      "Comment 6...",
    ];
    // To Do: Get comments from post
    // const allPosts = this.allPosts;
    // const comments = allPosts.
  }
  hasComments(post: Post): boolean {
    return this.getComments(post).length === 0;
  }
  getPostUsername(post: Post): string {
    return this.$store.getters["users/getUserById"](post.uid).username;
  }
  handleImageClick(post: Post) {
    console.log("Post clicked:", post.pid);
    // this.$router.push(`/posts/${post.pid}`);
    this.currImageExpandedIndex = post.pid;
  }

  handleCloseExpandedImage() {
    console.log("Closing expanded image...");
    this.currImageExpandedIndex = -1;
    return this.isImageExpanded(this.currImageExpandedIndex);
  }
  isImageExpanded(pid: number | undefined): boolean {
    return pid === this.currImageExpandedIndex;
  }
  handleSubmitComment(comment: string) {
    console.log("Comment submitted: ", comment);
  }
}
</script>

<style scoped>
.no-comment-div {
  font-size: 14px;
  font-family: Helvetica, Arial, sans-serif;
  white-space: pre-line;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  color: #64748b;
}
.el-button {
  position: absolute;
  background-color: transparent;
  border: none;
  color: #64748b;
  height: 100%;
  width: 100%;
}
</style>
