import Vue from "vue";
import Vuex from "vuex";
import PostsModule from "./modules/PostsModule";
import UsersModule from "./modules/UsersModule";
import AuthModule from "./modules/AuthModule";

Vue.use(Vuex);

export interface RootState {
  uid?: number;
}

export default new Vuex.Store<RootState>({
  modules: {
    posts: PostsModule,
    users: UsersModule,
    auth: AuthModule,
  },
  state: {
    uid: undefined,
  },
  getters: {},
  mutations: {},
  actions: {},
});
