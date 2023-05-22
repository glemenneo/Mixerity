import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { Post } from "@/models/PostModel";
import { RootState } from "@/store/index";

Vue.use(Vuex);

export enum PostsActions {
  ADD_POST = "ADD_POST",
  DELETE_POST = "DELETE_POST",
  UPDATE_POST = "UPDATE_POST",
}

export interface PostsState {
  posts: Array<Post>;
}

const getters: GetterTree<PostsState, RootState> = {
  getPosts(state): Array<Post> {
    return state.posts;
  },
  hasposts(state): boolean {
    return state.posts && state.posts.length > 0;
  },
  getPostByPid:
    (state) =>
    (uid: number): Post | undefined => {
      return state.posts.find((post) => post.uid === uid);
    },
};

const mutations: MutationTree<PostsState> = {
  [PostsActions.ADD_POST](state, payload: Post): void {
    state.posts.push(payload);
    // to do: add post to database
  },
  [PostsActions.DELETE_POST](state, payload: Post): void {
    state.posts.filter((post) => post.pid !== payload.pid);
    // to do: delete post from database
  },
  [PostsActions.UPDATE_POST](state, payload: Post): void {
    state.posts.filter((post) => post.pid !== payload.pid);
    state.posts.push(payload);
    // to do: update post in database
  },
};

const actions: ActionTree<PostsState, RootState> = {
  [PostsActions.ADD_POST](context, payload): void {
    setTimeout(() => context.commit(PostsActions.ADD_POST, payload), 1000);
    // to do: add post to database
  },
  [PostsActions.DELETE_POST](context, payload): void {
    setTimeout(() => context.commit(PostsActions.DELETE_POST, payload), 1000);
    // to do: delete post from database
  },
  [PostsActions.UPDATE_POST](context, payload): void {
    setTimeout(() => context.commit(PostsActions.UPDATE_POST, payload), 1000);
    // to do: update post in database
  },
};

const post1: Post = {
  pid: 1,
  uid: 1,
  tags: ["tag1", "beauty", "nature"],
  desc: "Basic but beautiful. \nThis is a post by Jeremiah",
  imgUrl: "https://picsum.photos/1800/1500?random=1",
};

const post2: Post = {
  pid: 2,
  uid: 2,
  tags: ["tag1", "tag3", "iswearimnotacreep"],
  desc: "You know whats good? Having you right beside me. \nThis is a post by Henderson",
  imgUrl: "https://picsum.photos/1800/1800?random=2",
};

const post3: Post = {
  pid: 3,
  uid: 3,
  tags: ["tag2", "tag4"],
  desc: "Where are these weird noises coming from? \nThis is a post by Marieann",
  imgUrl: "https://picsum.photos/1500/1800?random=3",
};
const post4: Post = {
  pid: 4,
  uid: 4,
  tags: ["tag2", "tag4"],
  desc: "don't let me down, down, down",
  imgUrl: "https://picsum.photos/1500/1800?random=4",
};

export default {
  namespaced: true,
  state: (): PostsState => ({
    // posts: Array<Post>(),
    posts: [post1, post2, post3, post4],
  }),
  getters,
  mutations,
  actions,
};
