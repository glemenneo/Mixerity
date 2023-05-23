<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="header-container"
    >
      <span
        class="el-icon-picture-outline-round"
        style="margin-right: 8px"
      />
      <div class="username-container">{{ username }}</div>
    </div>
    <div>
      <p class="text item">{{ description }}</p>
      <div class="tags-container">
        <BaseBadge
          v-for="tag in tags"
          :key="tag"
          :name="tag"
          class="item"
          style="margin: 0px; margin-right: 3px; padding: 0px"
        />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BaseBadge from "./BaseBadge.vue";

@Component({
  name: "DescriptionCard",
  components: { BaseBadge },
})
export default class extends Vue {
  @Prop() readonly description!: string;
  @Prop() readonly username!: string;
  @Prop() readonly tags!: string[];
}
</script>

<style scoped>
.text {
  font-size: 14px;
  font-family: "Inter", Helvetica, Arial, sans-serif;
  white-space: pre-line;
}

.item {
  margin-bottom: 18px;
}
.box-card {
  position: relative;
  border-top-right-radius: 25px;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.header-container {
  display: flex;
}
.username-container {
  font-size: 14px;
  font-family: "Inter", Helvetica, Arial, sans-serif;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
