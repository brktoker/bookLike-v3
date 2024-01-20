import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/Home"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/Register"),
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmark"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/Account")
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/Account")
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "userSettings"
    },
    component: () => import("@/views/Account")
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage"];
  const authNotRequiredRoutes = ["RegisterPage", "LoginPage"]

  const _isAuthenticated = store.getters._isAuthenticated;
  
  if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) {next({name: from.name || 'HomePage'})}

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) {
      next();
    } else {
      next({ name: "LoginPage" });
    }
  } else {
    next();
  }
});

export default router;
