<template>
  <div class="page-view">
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <el-button
        type="primary"
        @click="handleBackButtonClick"
        style="background-color: #f43f5e"
        icon="el-icon-position"
      >
        Go back
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "NotFoundPage",
})
export default class extends Vue {
  handleBackButtonClick(): void {
    this.$router.push("/");
  }
}
</script>
