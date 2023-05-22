<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
      style="height: 10px; line-height: 10px"
    >
      <span
        class="el-icon-picture-outline-round"
        style="margin-right: 8px"
      />
    </div>
    <div>
      <p
        class="text"
        style="margin: 5px 0px"
      >
        {{ text }}
      </p>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "CommentCard",
})
export default class extends Vue {
  @Prop() readonly text!: string;
  @Prop() readonly username!: string;
}
</script>

<style scoped>
.text {
  font-size: 14px;
  font-family: "Inter", Helvetica, Arial, sans-serif;
  white-space: pre-line;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  position: relative;
  box-shadow: none;
  border-radius: 0;
  background-color: #ffffffe2;
}
:deep(.el-card__header) {
  border: none;
  padding: 8px 20px;
}
:deep(.el-card__body) {
  padding: 5px 20px;
}
</style>
