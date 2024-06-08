import { defineStore } from "pinia";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(todoText) {
      this.todos.push({ text: todoText, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
  },
  getters: {
    remainingCount: (state) =>
      state.todos.filter((todo) => !todo.completed).length,
    filteredTodos: (state) => (showCompleted) => {
      return showCompleted
        ? state.todos
        : state.todos.filter((todo) => !todo.completed);
    },
  },
});
