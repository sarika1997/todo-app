import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//const fb = require("./components/firebaseConfig.js");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
