<template>
  <div class="follower-card">
    {{ username }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "FollowerCard",
})
export default class extends Vue {
  @Prop() username!: string;

  mounted() {
    this.username = "John Doe";
  }
}
</script>

<style scoped>
.follower-card {
  width: 80vw;
  background-color: white;
}
</style>
