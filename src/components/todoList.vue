<template>
  <div>
    <p v-if="!items">There are no todo's to show</p>
    <p v-else v-for="item in items" :key="item">
      <input type="checkbox" :key="item" />
      {{item}}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({ items: state => state.todoText })
};
</script>

<style>
</style>