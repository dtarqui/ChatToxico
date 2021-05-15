import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store/store.js";
import { authGuard } from "../auth/authGuard";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/write_chat",
    name: "Write",
    component: () => import("../views/WriteChat.vue"),
  },
  {
    path: "/upload_chat",
    name: "Upload",
    component: () => import("../views/UploadChat.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/FAQ.vue"),
  },
  {
    path: "/callback",
    name: "callback",
    component: () => import("../views/Callback.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// very basic "setup" of a global guard
// router.beforeEach((to, from, next) => {
//   if (to.name == "callback") {
//     // check if "to"-route is "callback" and allow access
//     next();
//   } else if (router.app.$auth.isAuthenticated()) {
//     // if authenticated allow access
//     next();
//   } else {
//     // trigger auth0's login.
//     router.app.$auth.login();
//   }
// });

export default router;
