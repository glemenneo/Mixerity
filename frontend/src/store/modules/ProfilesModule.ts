import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/index";
import { User } from "@/models/UserModel";
import axios, { AxiosError } from "axios";
import { AxiosErrorData } from "./AuthModule";
import Profile from "@/models/ProfileModel";

Vue.use(Vuex);

const profilesPrefix = "profiles/";

export enum UsersActions {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
  UPDATE_USER = "UPDATE_USER",
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

export interface UsersState {
  users: Array<User>;
}

export interface ApiRes {
  isSuccessful: boolean;
  message: string;
}

const getters: GetterTree<UsersState, RootState> = {
  getUsers(state): Array<User> {
    return state.users;
  },
  hasUsers(state): boolean {
    return state.users && state.users.length > 0;
  },
};

const mutations: MutationTree<UsersState> = {
  [UsersActions.UPDATE_USER](state, payload: User): void {
    state.users.filter((user) => user.uid !== payload.uid);
    state.users.push(payload);
    // To do: sync with backend
  },
};

const actions: ActionTree<UsersState, RootState> = {
  [UsersActions.UPDATE_USER](context, payload): void {
    setTimeout(() => context.commit(UsersActions.UPDATE_USER, payload), 1000);
    // To do: sync with backend
  },
  [UsersActions.GET_USER_BY_ID](_, uid): User | undefined {
    const user = async () => {
      try {
        const res = await axios.get(`${profilesPrefix}get/${uid}`);
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        const err = error as AxiosError;
        const errData = err.response?.data as AxiosErrorData;
        const msg = errData?.message;
        console.log(msg);
        return undefined;
      }
    };
    user();
    return undefined;
  },
};

const user1: Profile = {
  uid: 1,
  displayName: "jjeremiah",
  profilePicUrl: "https://picsum.photos/200?random=1",
  following: [2, 3],
};

const user2: Profile = {
  uid: 2,
  displayName: "benderhenderson",
  profilePicUrl: "https://picsum.photos/200?random=2",
  following: [1],
};

const user3: Profile = {
  uid: 3,
  displayName: "marieeeantoinette",
  profilePicUrl: "https://picsum.photos/200?random=3",
  following: [1, 4],
};

const user4: Profile = {
  uid: 4,
  displayName: "xxhaileebaileeninetysixs",
  profilePicUrl: "https://picsum.photos/200?random=4",
  following: [3],
};

export default {
  namespaced: true,
  state: (): UsersState => ({
    // users: Array<User>()
    users: [user1, user2, user3, user4],
  }),
  getters,
  mutations,
  actions,
};
