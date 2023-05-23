<template>
  <div class="card">
    <el-row :gutter="10">
      <el-col :span="16">
        <div class="image-col">
          <slot name="image" />
        </div>
      </el-col>
      <el-col
        :span="8"
        style="padding-right: 0px"
      >
        <div class="text-col">
          <div class="desc-row">
            <slot name="description" />
            <slot name="submitComment" />
          </div>
          <div class="comments-row">
            <slot name="comments" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "PostCard",
})
export default class extends Vue {}
</script>
<style scoped>
.card {
  margin: auto;
  margin-top: 1vh;
  margin-bottom: 5vh;
  padding: 5px;
  border: 1px solid #e2e8f0;
  box-shadow: 3px 3px 15px 5px #cbd5e195;
  height: 80vh;
  width: 50vw;
  background-color: white;
  border-radius: 25px;
}
.el-col {
  height: 80vh;
}
.text-col {
  height: 80vh;
  overflow-y: auto;
}
.comments-row {
  flex: 1 1 auto;
}
.desc-row {
  position: -webkit-sticky;
  position: sticky;
  z-index: 1;
  top: 0;
}
.image-col {
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
}
.el-row {
  display: flex;
  justify-content: center;
  align-items: start;
}
</style>
