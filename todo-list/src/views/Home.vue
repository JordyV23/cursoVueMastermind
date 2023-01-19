<template>
  <EditTodoForm
    :show="editTodoForm.show"
    @close="editTodoForm.show = false"
    @submit="updateTodo"
    v-model="editTodoForm.todo.title"
  />

  <Alert
    :message="alert.message"
    :show="alert.show"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <section>
    <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo" />
  </section>

  <section>
    <Spinner v-if="isLoading" />
    <div v-else>
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="removeTodo(todo.id)"
        @edit="showEditTodoForm(todo)"
      />
    </div>
  </section>
</template>

<script setup>
import Alert from "@/components/Alert.vue";
import AddTodoForm from "@/components/AddTodoForm.vue";
import Todo from "@/components/Todo.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import EditTodoForm from "@/components/EditTodoForm.vue";
import { reactive, ref, watch } from "vue";
import { useFetch } from "@/composables/fetch";

const alert = reactive({
  show: false,
  message: "",
  variant: "danger",
});

const isPostingTodo = ref(false);
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: "",
  },
});

const { data: todos, isLoading } = useFetch("/api/todos");

function showAlert(message, variant = "danger") {
  alert.show = true;
  alert.message = message;
  alert.variant = variant;
}

function showEditTodoForm(todo) {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todo };
}

function updateTodo() {
  const todo = todos.value.find((todo) => todo.id === editTodoForm.todo.id);
  axios.patch(`/api/todos/${todo.id}`, {
    title: editTodoForm.todo.title,
  });
  editTodoForm.show = false;
  fetchTodos();
}

async function addTodo(title) {
  if (title === "") {
    showAlert("Todo title is required");
    return;
  }
  isPostingTodo.value = true;
  const res = await axios.post("/api/todos", { title });
  isPostingTodo.value = false;
  todos.value.push(res.data);
}

async function removeTodo(id) {
  await axios.delete(`/api/todos/${id}`);
  todos.value = todos.value.filter((todo) => todo.id !== id);
}
</script>

<style>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>
