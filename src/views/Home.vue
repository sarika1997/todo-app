<template>
  <div class="home">
    <todo />
  </div>
</template>

<script>
import todo from "@/components/todo.vue";
export default {
  components: {
    todo
  },
  created(){
    console.log("======created")
  }
};
</script>

<style scoped>
</style>