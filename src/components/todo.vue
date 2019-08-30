<template>
  <div class="todo">
    <h1 class="todo-heading">todo's</h1>
    <input
      class="todo-input"
      v-model="value"
      @input="saveTodo"
      placeholder="enter your todo's"
      v-on:keyup.enter="showlist"
    />
    <template v-if="viewlist">
      <TodoList />
    </template>
  </div>
</template>

<script>
import TodoList from "@/components/todoList.vue";

export default {
  components: {
    TodoList
  },
  data() {
    return {
      value: "",
      viewlist: false
    };
  },
  methods: {
    showlist() {
      return (this.viewlist = true);
    },
    saveTodo() {
      this.$store.dispatch("saveTodo", this.value);
    }
  }
};
</script>

<style>
.todo-heading {
  font-size: 32px;
  color: #d38b8b98;
  font-family: italic;
}
.todo-input {
  color: #585555;
  width: 350px;
  height: 30px;
  padding-left: 10px;
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  background-color: #9c9c484b;
  border: 2px;
  border-radius: 12px;
}
.todo {
  width: 400px;
  height: auto;
  margin-left: 32%;
  background-color: rgba(228, 218, 218, 0.513);
  padding: 5px 5px 5% 5px;
}
</style>