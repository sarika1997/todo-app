<template>
  <div class="todo">
    <h1 class="todo-heading">todo's</h1>
    <input
      type="text"
      class="todo-input"
      v-model="todovalue"
      placeholder="enter your todo's"
      @keyup.enter="saveTodo"
    />
    <template v-if="todolength">
      <TodoList @delete-todo="deletetodo" v-if="listvisible" />
      <ul id="completed" v-if="showcompletedlist">
        <p id="completed-title" v-if="showcompletedlist">Todo's done:</p>
        <li v-for="listItem in completedTodo" :key="listItem.id">{{ listItem.value }}</li>
      </ul>
    </template>
    <div>
      <template>
        <input type="button" value="completed" class="footer" @click="showCompleted" />
        <input type="button" value="all" class="footer" @click="showAll" />
      </template>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/todoList.vue";
import { mapState } from "vuex";
export default {
  components: {
    TodoList
  },
  data() {
    return {
      todovalue: "",
      viewlist: false,
      listvisible: true,
      showcompletedlist: false
    };
  },
  methods: {
    saveTodo() {
      console.log("=======searhc", this.todovalue);
      let addTodo = this.todovalue;
      this.$store.dispatch("saveTodo", addTodo);
      this.todovalue = "";
      this.listvisible = true;
    },
    deletetodo(item) {
      this.$store.dispatch("deletetodo", item);
    },
    showCompleted() {
      this.listvisible = false;
      this.showcompletedlist = true;
    },
    showAll() {
      this.listvisible = true;
      this.showcompletedlist = false;
    }
  },
  computed: {
    ...mapState(["todolength", "completedTodo"])
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
  margin-top: 70px;
  margin-left: 32%;
  background-color: rgba(228, 218, 218, 0.513);
  padding: 5px 5px 10% 5px;
}
.footer {
  float: right;
  margin: 15px 22px 5px 5px;
}
li {
  width: 80%;
  padding: 5px;
  text-align: initial;
  list-style: none;
  font-family: cursive;
}
#completed-title {
  text-align: initial;
  font: 20px courier;
  color: rgba(236, 192, 69, 0.808);
}
</style>