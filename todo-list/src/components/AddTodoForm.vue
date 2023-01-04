<template>
  <form class="add-todo-form" action="">
    <input v-model="todoTitle" type="text" placeholder="Todo Tittle" />
    <div>
      <Btn class="btn" @click="$emit('submit', todoTitle)">Add ToDo</Btn>
    </div>
  </form>
</template>

<script>
import Btn from "./Btn.vue";

export default {
  components: { Btn },
  data() {
    return {
      todoTitle: "",
    };
  },
  emits: ["submit"],
};
</script>

<style>
.add-todo-form {
  display: flex;
  justify-content: space-between;
}

.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.btn{
  height: 50px;
}
</style>
