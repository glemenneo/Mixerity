<template>
  <div>
    <div v-if="!isUserAuth">
      <LoginRequestDisplay />
    </div>
    <div
      v-else
      class="page-view create-post"
    >
      <h1>New Post</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        class="create-post-form"
        id="create-post-form"
      >
        <el-form-item
          label="Image URL"
          prop="imgUrl"
        >
          <el-input
            v-model="ruleForm.imgUrl"
            placeholder="Image URL"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <input
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleImageUpload"
            ref="imageUpload"
          />
          <div class="image-upload-space">
            <el-button
              type="primary"
              @click="handleImageButtonClick"
              icon="el-icon-upload"
              >Upload Image</el-button
            >
            <div class="image-preview">
              <img
                :src="generateImageFromFile()"
                alt=""
                style="
                  max-width: 100%;
                  max-height: 100%;
                  position: absolute;
                  top: 0;
                  left: calc(20% + 10px);
                "
              />
              <span
                style="font-family: 'Inter'; font-size: smaller; color: #64748b"
                >{{ imageFileName }}</span
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="Description"
          prop="description"
        >
          <el-input
            type="textarea"
            autosize
            v-model="ruleForm.description"
            placeholder="Description"
          />
        </el-form-item>
        <el-form-item
          label="Tags"
          prop="tags"
        >
          <el-select
            v-model="value"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Choose tags for your article"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        @click="handleCreatePost"
        style="background-color: #f43f5e; float: inline-end; width: 12%"
      >
        Post!
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LoginRequestDisplay from "../auth/LoginRequestDisplay.vue";
import { PostTagsEnum } from "@/models/PostTagsEnum";

@Component({
  name: "CreatePost",
  components: { LoginRequestDisplay },
})
export default class extends Vue {
  ruleForm = {
    imgUrl: "",
    description: "",
    tags: [],
  };
  rules = {
    imgUrl: [
      { required: false, message: "Please input image URL", trigger: "blur" },
    ],
  };
  options = Array<{ label: string; value: string }>();
  value = "";
  imageFile: File | null = null;
  imageFileName = "No image uploaded yet. Upload one now!";
  isImageUploaded = false;

  get isUserAuth(): boolean {
    return this.$store.getters["auth/isUserAuth"];
  }

  created() {
    // To do: get tags with API call
    // this.$store.dispatch("tags/getTags");
    // this.options = this.$store.getters["tags/getTags"];
    for (let tag in PostTagsEnum) {
      console.log(typeof this.options);
      this.options.push({
        value: tag,
        label: tag,
      });
    }
  }

  handleCreatePost(): void {
    if (!this.isImageUploaded && !this.ruleForm.imgUrl) {
      this.$message({
        message: "Please upload an image",
        type: "warning",
      });
      return;
    }
    this.$store.dispatch("posts/createPost", this.ruleForm);
    this.$router.push("/posts");
  }

  handleImageUpload(payload: Event): void {
    const files = (payload.target as HTMLInputElement)?.files;
    if (!files) {
      return;
    }
    this.imageFile = files[0];
    this.isImageUploaded = true;
  }
  handleImageButtonClick(): void {
    const imageUpload = this.$refs.imageUpload as HTMLInputElement;
    imageUpload.click();
  }
  generateImageFromFile(): string {
    if (!this.imageFile) {
      return "";
    }
    return URL.createObjectURL(this.imageFile);
  }
}
</script>

<style scoped>
.create-post {
  background: white;
  height: 100vh;
}
:deep(.el-input__inner) {
  font-family: "Inter", Helvetica, Arial, sans-serif;
}
:deep(.el-textarea__inner) {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  min-height: 200px !important;
}
.el-button {
  margin: auto;
  width: 20%;
  height: 40px;
  background-color: #f43f5e;
  border: none;
  color: white;
  font-family: "Inter", Helvetica, Arial, sans-serif;
}
</style>
