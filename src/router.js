import Vue from "vue";
import Router from "vue-router";
import todo from "@/components/todo.vue";
import Home from "@/views/Home.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/todo",
      name: "todo",
      component: todo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      name: "signIn",
      component: SignIn,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
      meta: {
        requiresGuest: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record =>
    record.meta.requiresAuth
  )) {
    if (!firebase.auth().currentUser) {
      next({
        name: "signIn",
        query: to.fullPath
      })
    } else {
      next();
    }
  } else if (to.matched.some(record =>
    record.meta.requiresGuest
  )) {
    if (!firebase.auth().currentUser) {
      next({
        name: "signIn",
        query: to.fullPath
      })
    } else {
      next();
    }
  }
})
export default router;
