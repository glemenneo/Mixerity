<template>
  <div>
    <div v-if="!isUserAuth">
      <LoginRequestDisplay />
    </div>
    <div
      v-else
      class="page-view user-posts"
    >
      <ProfileHeaderCard :username="username" />
      <div class="user-posts-container">
        <UserPostCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginRequestDisplay from "../auth/LoginRequestDisplay.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import ProfileHeaderCard from "../ui/ProfileHeaderCard.vue";
import UserPostCard from "../ui/UserPostCard.vue";

@Component({
  name: "MyPosts",
  components: {
    LoginRequestDisplay,
    ProfileHeaderCard,
    UserPostCard,
  },
})
export default class extends Vue {
  @Prop() username!: string;
  @Prop() displayName!: string;
  get isUserAuth(): boolean {
    return this.$store.getters["auth/isUserAuth"];
  }
}
</script>

<style scoped>
.user-posts {
  background: #f8fafc;
  height: max-content;
}
</style>
