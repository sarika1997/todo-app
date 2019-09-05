import Vue from "vue";
import Vuex from "vuex";
const fb = require("./components/firebaseConfig.js");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoText: [],
    todolength: 0,
    completedTodo: [],
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    SAVE_TODO(state, value) {
      var date = new Date();
      console.log(value);
      state.todoText.unshift({
        value: value,
        id: date.getTime(),
        completed: false
      });
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
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
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
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
