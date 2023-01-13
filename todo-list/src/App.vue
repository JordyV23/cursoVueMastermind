<template>
  <Navbar />

  <main class="container">
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
  </main>
</template>

<script>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import Spinner from "./components/Spinner.vue";
import axios from "axios";
import EditTodoForm from "./components/EditTodoForm.vue";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
    Spinner,
    EditTodoForm,
  },

  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        show: false,
        message: "",
        variant: "danger",
      },
      isLoading: false,
      isPostingTodo: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },
    };
  },

  created() {
    this.fetchTodos();
  },

  methods: {
    async fetchTodos() {
      this.isLoading = true;
      try {
        const res = await axios.get("/api/todos");
        this.todos = res.data;
      } catch (e) {
        this.showAlert("Failed loading todos");
      }
      this.isLoading = false;
    },

    showAlert(message, variant = "danger") {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.variant = variant;
    },

    async addTodo(title) {
      if (title === "") {
        this.showAlert("Todo title is required");
        return;
      }
      this.isPostingTodo = true;
      const res = await axios.post("/api/todos", { title });
      this.isPostingTodo = false;
      this.todos.push(res.data);
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo };
    },

    updateTodo() {
      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );
      axios.patch(`/api/todos/${todo.id}`, {
        title: this.editTodoForm.todo.title,
      });
      this.editTodoForm.show = false;
      this.fetchTodos();
    },

    async removeTodo(id) {
      await axios.delete(`/api/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>

<style>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>
