import Vue from "vue";
import Router from "vue-router";
import todo from "@/components/todo.vue";
import Home from "@/views/Home.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
import firebase from "firebase/app";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/todo",
      name: "todo",
      component: todo
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp
    }
  ]
});
Router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
