<template>
  <el-row style="display: flex; flex-wrap: wrap; justify-content: center">
    <el-col
      :span="6"
      v-for="post in posts"
      :key="post.pid"
      :offset="1"
    >
      <el-card
        :body-style="{ padding: '5px' }"
        shadow="hover"
      >
        <img
          :src="post.imgUrl"
          alt="../../assets/loading.png"
          class="image"
        />
        <div style="padding: 15px">
          <span>{{ description }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ datePosted }}</time>
            <el-button
              type="text"
              class="button"
              >Edit</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Post } from "@/models/PostModel";

@Component({
  name: "UserPostCard",
})
export default class extends Vue {
  datePosted = new Date().toLocaleString();
  description = "This is a description";
  posts: Post[] = [];

  get getUserPosts() {
    const posts = [
      {
        id: 1,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 2,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 3,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 4,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 5,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 6,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 7,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 8,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 9,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 10,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 11,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 12,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 13,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 14,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 15,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
      {
        id: 16,
        description: "This is a description",
        datePosted: new Date().toLocaleString(),
        imgUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      },
    ];
    return posts;
    // To do: API call
  }

  mounted() {
    this.posts = this.getUserPosts;
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
