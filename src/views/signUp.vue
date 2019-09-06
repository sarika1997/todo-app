<template>
  <div class="form">
    <img src="@/assets/loginlogo.jpeg" alt="login-image" class="logoicon" />
    <form @submit.prevent="registerUser">
      <p id="login-title">Login</p>
      <div class="form-tag">
        <label for="username">
          <i class="fa fa-envelope"></i>
          <input
            type="text"
            name="username"
            v-model.trim="userData.username"
            id="username"
            placeholder="username"
          />
        </label>
      </div>
      <div class="form-tag">
        <label for="email">
          <i class="fa fa-envelope"></i>
          <input
            type="email"
            name="email"
            v-model.trim="userData.email"
            id="email"
            placeholder="enter your email"
          />
        </label>
      </div>
      <div class="form-tag">
        <label for="password">
          <i class="fa fa-unlock"></i>
          <input
            type="password"
            name="password"
            v-model.trim="userData.password"
            id="password"
            placeholder="password"
          />
        </label>
      </div>
      <button id="loginbutton">Sign Up</button>
      <p>
        back to
        <router-link :to="{ name: 'signIn' }" class="link">login!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firestore";
export default {
  data() {
    return {
      userData: {
        username: "",
        email: "",
        password: ""
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    registerUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.userData.email,
          this.userData.password
        )
        .then(() => {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: this.userData.username
            })
            .then(() => {
              db.collection("users")
                .add({
                  username: this.userData.username,
                  email: this.userData.email,
                  password: this.userData.password
                })
                .then(() => {
                  this.$router.replace("/home"); //path
                })
                .catch(err => {
                  console.log(err);
                  this.errorMessage = err.message;
                });
            })
            .catch(err => {
              console.log(err);
              this.errorMessage = err.message;
            });
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.message;
        });
    }
  }
};
</script>

<style scoped>
.form {
  width: 400px;
  height: auto;
  margin: 10% 38%;
  background-color: rgba(146, 145, 145, 0.233);
  padding: 20px;
}
.form-tag {
  position: relative;
  padding: 5px;
}
#login-title {
  margin-top: -5px;
  font-size: 30px;
  font-family: courier;
  color: rgba(153, 110, 54, 0.664);
}
i {
  height: 24px;
  width: 24px;
  margin-top: 35;
  padding: 2px;
}
.logoicon {
  margin-top: 18px;
  height: 80px;
  width: 62px;
  text-align: left;
  border-radius: 50%;
  box-shadow: 2.6px 2.4px rgba(107, 105, 105, 0.637);
}
#email,
#password,
#username {
  width: 230px;
  height: 24px;
  border-radius: 16px;
  border: none;
  font-size: 16px;
  padding-left: 12px;
}
#loginbutton {
  margin-top: 10px;
  width: 90px;
  height: 24px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  color: rgb(109, 106, 106);
}
#loginbutton:hover {
  transform: scale(1.1);
}
.link {
  text-decoration: none;
  color: rgb(65, 63, 63);
}
</style>
