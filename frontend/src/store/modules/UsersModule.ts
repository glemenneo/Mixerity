import Vue from "vue";
import Vuex, { ActionTree, GetterTree } from "vuex";
import { RootState } from "@/store/index";
import { User } from "@/models/UserModel";

Vue.use(Vuex);

export enum UsersActions {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
  UPDATE_USER = "UPDATE_USER",
}

export interface UsersState {
  users: Array<User>;
}

const getters: GetterTree<UsersState, RootState> = {
  getUsers(state): Array<User> {
    return state.users;
  },
  hasUsers(state): boolean {
    return state.users && state.users.length > 0;
  },
  getUserById:
    (state) =>
    (uid: number): User | undefined => {
      return state.users.find((user) => user.uid === uid);
    },
};

const actions: ActionTree<UsersState, RootState> = {
  [UsersActions.UPDATE_USER](context, payload): void {
    setTimeout(() => context.commit(UsersActions.UPDATE_USER, payload), 1000);
    // To do: sync with backend
  },
};

const user1: User = {
  uid: 1,
  username: "jjeremiah",
  profilePicUrl: "https://picsum.photos/200?random=1",
  friends: [2, 3],
};

const user2: User = {
  uid: 2,
  username: "benderhenderson",
  profilePicUrl: "https://picsum.photos/200?random=2",
  friends: [1],
};

const user3: User = {
  uid: 3,
  username: "marieeeantoinette",
  profilePicUrl: "https://picsum.photos/200?random=3",
  friends: [1, 4],
};

const user4: User = {
  uid: 4,
  username: "xxhaileebaileeninetysixs",
  profilePicUrl: "https://picsum.photos/200?random=4",
  friends: [3],
};

export default {
  namespaced: true,
  state: (): UsersState => ({
    // users: Array<User>()
    users: [user1, user2, user3, user4],
  }),
  getters,
  actions,
};
