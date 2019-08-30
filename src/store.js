import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoText: []
  },
  mutations: {
    SAVE_TODO(state, value) {
      state.todoText.push(value);
    }
  },
  actions: {
    saveTodo({ commit }, value) {
      commit("SAVE_TODO", value);
    }
  }
});
