import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store/index";
import AuthModel from "@/models/AuthModel";
import axios, { AxiosError } from "axios";
import { captitaliseEveryWord } from "@/utils/StringUtils";

Vue.use(Vuex);

const authPrefix = "auth/";

export enum AuthActions {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  REGISTER_USER = "REGISTER_USER",
}

export type AuthRes = {
  isSuccessful: boolean;
  message: string;
};

export interface UsersState {
  authUser: AuthModel | null;
}

export interface AxiosErrorData {
  error: string;
  message: string[];
  statusCode: number;
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
  [AuthActions.LOGIN_USER](context, payload): Promise<AuthRes | undefined> {
    const loginUser = async () => {
      try {
        const res = await axios.post(`${authPrefix}login`, payload);
        if (res.status === 201) {
          context.commit(AuthActions.LOGIN_USER, res.data);
          const username = captitaliseEveryWord(res?.data?.username);
          return {
            isSuccessful: true,
            message: `Welcome Back ${username}!`,
          };
        }
      } catch (error) {
        console.log(error);
        return { isSuccessful: false, message: "Login unsuccessful!" };
      }
    };
    return loginUser();
  },
  [AuthActions.LOGOUT_USER](context): void {
    setTimeout(() => context.commit(AuthActions.LOGOUT_USER), 1000);
  },
  [AuthActions.REGISTER_USER](_, payload): Promise<AuthRes | undefined> {
    let res: Response;
    const registerUser = async () => {
      try {
        res = await axios.post(`${authPrefix}register`, payload);
        if (res.status === 201) {
          return {
            isSuccessful: true,
            message: `Registration successful! Please proceed to login.`,
          };
        }
      } catch (error) {
        console.log("Error:", error);
        const err = error as AxiosError;
        const data = err.response?.data as AxiosErrorData;
        const unsuccessfulMsg = data?.message[0];
        console.log("unsuccessfulMsg:", data);
        return {
          isSuccessful: false,
          message: captitaliseEveryWord(
            unsuccessfulMsg || "Registration unsuccessful!"
          ),
        };
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
