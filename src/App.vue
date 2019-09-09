<template>
  <div id="app">
    <nav id="nav">
      <ul>
        <li v-if="!isLoggedIn">
          <router-link :to="{ name: 'home' }" class="link">home</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link :to="{ name: 'signIn' }" class="link">signIn</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link :to="{ name: 'signUp' }" class="link">signUp</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <button v-on:click="logOut" class="link">logout</button>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "logOut",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signIn");
        });
    },
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    }
  }
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
