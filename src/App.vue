<template>
  <div id="app">
    <nav id="nav">
      <ul>
        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'home' }" class="link">home</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link :to="{ name: 'signIn' }" class="link">signIn</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link :to="{ name: 'signUp' }" class="link">signUp</router-link>
        </li>
        <li v-if="isLoggedIn">
          <button v-on:click="logOut" class="link">logout</button>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
<script>
import firebase from "firebase";
import { mapState } from "vuex";
export default {
  name: "logOut",
  data() {
    return {
      currentUser: ""
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("loggedOutUpdate");
          this.$router.push("/signIn");
        });
    }
  },
  computed: mapState(["isLoggedIn"])
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin-top: -8px;
  margin-left: -10px;
  padding-left: 18px;
  width: 100%;
  height: 65px;
  background-color: rgba(245, 167, 41, 0.87);
}

ul {
  display: flex;
  flex-direction: row;
  float: right;
}
.link {
  text-decoration: none;
}
</style>
