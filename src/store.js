import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "./firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docsId: [],
    isLoggedIn: false,
    todoText: [],
    todolength: 0,
    completedTodo: [],
    currentUser: null,
    listvisible: true,
    showcompletedlist: false
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
    async COMPLETED_TODO(state, item) {
      await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(item.id)
        .update({
          comlpeted: !item.completed
        });

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
    async DELETE_TODO(state, item) {
      await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(item.id)
        .delete();

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
      state.isLoggedIn = !state.isLoggedIn;
      state.currentUser = userInfo;
      if (state.isLoggedIn) {
        const ref = await db
          .collection("users")
          .doc(userInfo.uid)
          .collection("todos")
          .get();
        console.log(ref);
        if (ref.docs) {
          ref.docs.map(document => {
            var todo = document.data();
            todo.id = document.id;
            state.todoText.push(todo);
            state.todolength = document.data().length;
          });
        }
      }
      console.log(state.todoText);
      console.log(userInfo);
      console.log(state.isLoggedIn);
    },
    SIGNUP_UPDATE(state, userInfo) {
      state.isLoggedIn = !state.isLoggedIn;
      state.currentUser = userInfo;
    },
    UPDATE_LOGOUT(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.todoText = [];
    },
    CHANGE_BOOLEAN(state) {
      state.listvisible = !state.listvisible;
      state.showcompletedlist = !state.showcompletedlist;
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
    loggedInUpdate({ commit }, userInfo) {
      commit("UPDATE_LOGIN", userInfo);
    },
    signUpUpdate({ commit }, userInfo) {
      commit("SIGNUP_UPDATE", userInfo);
    },
    loggedOutUpdate({ commit }) {
      commit("UPDATE_LOGOUT");
    },
    changeBoolean({ commit }) {
      commit("CHANGE_BOOLEAN");
    }
  }
});
