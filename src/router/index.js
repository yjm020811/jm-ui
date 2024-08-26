import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Container from "../components/container/index.vue";

const routes = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/",
        component: Home
      },
      {
        path: "/chooseIcon",
        component: () => import("../views/chooseIcon/index.vue")
      },
      {
        path: "/chooseArea",
        component: () => import("../views/chooseArea/index.vue")
      },
      {
        path: "/trend",
        component: () => import("../views/trend/index.vue")
      },
      {
        path: "/notification",
        component: () => import("../views/notification/index.vue")
      },
      {
        path: "/menus",
        component: () => import("../views/menus/index.vue")
      },
      {
        path: "/progress",
        component: () => import("../views/progress/index.vue")
      },
      {
        path: "/table",
        component: () => import("../views/table/index.vue")
      },
      {
        path: "/form",
        component: () => import("../views/form/index.vue")
      },
      {
        path: "/dialog",
        component: () => import("../views/dialog/index.vue")
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;
