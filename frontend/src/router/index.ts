import VueRouter, { RouteConfig } from "vue-router";
import Vue from "vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/posts" },
  {
    path: "/posts",
    name: "posts",
    component: () => import("@/components/posts/PostList.vue"),
    meta: { auth: true },
  },
  {
    path: "/posts/:id",
    component: () => import("@/components/posts/PostDetails.vue"),
    meta: { auth: true },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/components/posts/CreatePost.vue"),
    meta: { auth: true },
  },
  {
    path: "/myPosts",
    component: () => import("@/components/posts/UserPosts.vue"),
    meta: { auth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/auth/LoginView.vue"),
    meta: { auth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/auth/RegisterView.vue"),
    meta: { auth: false },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/components/auth/LogoutView.vue"),
    meta: { auth: true },
  },
  {
    path: "/friends",
    component: () => import("@/pages/FriendsPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
    meta: { auth: false },
  },
  {
    path: "/*",
    name: "notFound",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta == undefined) {
    return false;
  } else if (to.meta.auth && !store.getters["auth/isUserAuth"]) {
    next({ path: "/login" });
  } else if (!to.meta.auth && store.getters["auth/isUserAuth"]) {
    next({ path: "/posts" });
  } else {
    next();
  }
});

export default router;
