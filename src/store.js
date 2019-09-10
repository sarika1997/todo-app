import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "./firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    todoText: [],
    todolength: 0,
    completedTodo: [],
    currentUser: null
  },
  mutations: {
    async SAVE_TODO(state, value) {
      var date = new Date();
      console.log(value);
      state.todoText.unshift({
        value: value,
        id: date.getTime(),
        completed: false
      });
      await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .add({
          value: value,
          id: date.getTime(),
          completed: false
        });
      console.log("added todo to firestore successfully");
      state.todolength = state.todoText.length;
    },
    COMPLETED_TODO(state, item) {
      state.todoText.filter(todo => {
        if (todo.id === item.id) {
          todo.completed = !todo.completed;
          if (todo.completed && !state.completedTodo.includes(todo)) {
            state.completedTodo.unshift(todo);
          }
          console.log("added");
        }
      });
      console.log(state.todoText);
    },
    DELETE_TODO(state, item) {
      const index = state.todoText.indexOf(item);
      state.todoText.splice(index, 1);
      if (state.completedTodo.length) {
        state.completedTodo.filter(todo => {
          if (todo.id === item.id) {
            state.completedTodo.splice(state.completedTodo.indexOf(todo), 1);
          }
        });
        console.log("deleted sucessfully");
      }
    },
    async UPDATE_LOGIN(state, userInfo) {
      console.log("is logged");
      console.log(state.todoText);
      state.isLoggedIn = true;
      state.currentUser = userInfo;
      console.log(userInfo);
      const userRef = await db.collection("users").get();
      console.log(userRef);
      console.log(state.isLoggedIn);
      if (state.isLoggedIn) {
        userRef.docs.map(userDocument => {
          console.log(userDocument.id);
          console.log(state.currentUser.uid);
          if (state.currentUser.uid === userDocument.id) {
            //console.log(userDocument.id);
            const ref = db
              .collection("users")
              .doc(userInfo.uid)
              .collection("todos")
              .get();
            ref.docs.map(document => {
              return document.data();
            });
          }
        });
      }
      console.log(state.todoText);
    },
    UPDATE_LOGOUT(state) {
      state.isLoggedIn = false;
      state.todoText = [];
      state.currentUser = null;
    },
    SIGNUP_UPDATE(state, userInfo) {
      state.isLoggedIn = true;
      state.currentUser = userInfo;
      db.collection("users")
        .doc(userInfo.id)
        .collection("todos");
    }
  },
  actions: {
    deletetodo({ commit }, item) {
      commit("DELETE_TODO", item);
    },
    saveTodo({ commit }, value) {
      console.log(value);
      commit("SAVE_TODO", value);
    },
    completetodo({ commit }, item) {
      commit("COMPLETED_TODO", item);
    },
    loggedUpdate({ commit }, userInfo) {
      commit("UPDATE_LOGIN", userInfo);
    },
    logOut({ commit }) {
      commit("UPDATE_LOGOUT");
    },
    SignUpUpdate({ commit }, userInfo) {
      commit("SIGNUP_UPDATE", userInfo);
    }
  }
});
