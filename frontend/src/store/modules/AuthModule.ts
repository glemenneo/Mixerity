import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/index";
import AuthModel from "@/models/AuthModel";
import axios from "axios";

Vue.use(Vuex);

const authUrl = "http://localhost:3000/auth/";

export enum AuthActions {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  REGISTER_USER = "REGISTER_USER",
}

export interface UsersState {
  authUser: AuthModel | null;
}

const getters: GetterTree<UsersState, RootState> = {
  getAuthUser(state): AuthModel | null {
    return state.authUser;
  },
  isUserAuth(state): boolean {
    return state.authUser !== null;
  },
};

const mutations: MutationTree<UsersState> = {
  [AuthActions.LOGIN_USER](state, payload: AuthModel): void {
    state.authUser = payload;
    console.log("User logged in.");
  },
  [AuthActions.LOGOUT_USER](state): void {
    state.authUser = null;
  },
};

const actions: ActionTree<UsersState, RootState> = {
  [AuthActions.LOGIN_USER](context, payload): Promise<boolean | undefined> {
    const loginUser = async () => {
      try {
        const res = await axios.post(`${authUrl}login`, payload);
        if (res.status === 201) {
          context.commit(AuthActions.LOGIN_USER, res.data);
          return true;
        }
      } catch (error) {
        console.log("Error:", error);
        return false;
      }
    };
    return loginUser();
  },
  [AuthActions.LOGOUT_USER](context): void {
    setTimeout(() => context.commit(AuthActions.LOGOUT_USER), 1000);
  },
  [AuthActions.REGISTER_USER](_, payload): Promise<boolean | undefined> {
    const registerUser = async () => {
      try {
        const res = await axios.post(`${authUrl}register`, payload);
        if (res.status === 201) {
          return true;
        }
      } catch (error) {
        console.log("Error:", error);
        return false;
      }
    };
    return registerUser();
  },
};

export default {
  namespaced: true,
  state: (): UsersState => ({
    authUser: null,
  }),
  actions,
  mutations,
  getters,
};
