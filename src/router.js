import Vue from "vue";
import Router from "vue-router";
import todo from "@/components/todo.vue";
import Home from "@/views/Home.vue";
import signIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: "/todo",
      name: "todo",
      component: todo,
      meta: {
        auth: true
      }
    },
    {
      path: "*",
      name: "signIn",
      component: signIn
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        name: "signIn",
        query: to.fullPath
      });
    } else {
      next({
        name: "home"
      });
    }
  } else {
    next();
  }
});
export default router;
