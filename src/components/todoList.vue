<template class="todo-list">
  <div>
    <p v-if="!todoText">There are no todo's to show</p>
    <ul v-else>
      <p id="title">Todo list:</p>
      <li v-for="(item,index) in todoText" :key="item.id" :index="index">
        <input type="checkbox" @change="onClickedItem(item)" />
        {{ item.value }}
        <img
          src="@/assets/deleteicon.png"
          class="delete-icon"
          @click="deletetodo(item)"
          :key="item.id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    deletetodo(item) {
      console.log("clicked");
      this.$emit("delete-todo", item);
    },
    onClickedItem(item) {
      console.log(item);
      this.$store.dispatch("completetodo", item);
    }
  },
  computed: mapState(["todoText"])
};
</script>

<style scoped>
.todo-list {
  width: 80%;
  padding: 10px;
}
li {
  list-style: none;
}
.delete-icon {
  float: right;
  padding-right: 40px;
  height: 15px;
  width: 10px;
}
#title {
  font: 20px courier;
  text-align: initial;
  color: rgba(236, 192, 69, 0.808);
}
</style>