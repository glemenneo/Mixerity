import Vue from "vue";
import Vuex, { ActionTree, GetterTree } from "vuex";
import { RootState } from "@/store/index";
import AuthModel from "@/models/AuthModel";

Vue.use(Vuex);

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

const actions: ActionTree<UsersState, RootState> = {
  [AuthActions.LOGIN_USER](context, payload): void {
    setTimeout(() => context.commit(AuthActions.LOGIN_USER, payload), 1000);
    // To do: sync with backend
  },
  [AuthActions.LOGOUT_USER](context): void {
    setTimeout(() => context.commit(AuthActions.LOGOUT_USER), 1000);
  },
  [AuthActions.REGISTER_USER](context, payload): void {
    setTimeout(() => context.commit(AuthActions.REGISTER_USER, payload), 1000);
    // To do: sync with backend
  },
};

export default {
  namespaced: true,
  state: (): UsersState => ({
    authUser: null,
  }),
  actions,
  getters,
};
