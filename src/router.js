import Vue from "vue";
import Router from "vue-router";
import todo from "@/components/todo.vue";
import Home from "@/views/Home.vue";
import SignIn from "@/views/signIn.vue";
import SignUp from "@/views/signUp.vue";
Vue.use(Router);

export default new Router({
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
      component: todo
    },
    {
      path: "*",
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
