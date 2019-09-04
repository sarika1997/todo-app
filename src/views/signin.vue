import Vue from "vue";
import Router from "vue-router";
import todo from "@/components/todo.vue";
import Home from "@/views/Home.vue";
import SignIn from "@/views/signin.vue";
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
    }
  ]
});
