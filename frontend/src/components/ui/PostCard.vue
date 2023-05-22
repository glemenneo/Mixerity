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

<style scoped>
.card {
  margin: auto;
  margin-top: 4vh;
  margin-bottom: 0;
  padding: 5px;
  border: 1px solid #e2e8f0;
  box-shadow: 2px 2px 1px #f8fafc;
  height: 80vh;
  width: 50vw;
  background-color: white;
  border-radius: 5px;
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
