<template>
  <div>
    <header class="navbar">
      <nav>
        <ul>
          <li @click="showTodos">Todos</li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <h1 v-if="activeTab === 'todos'">CLUB VOLLY </h1>
      <div v-if="activeTab === 'todos'">
        <input
          type="text"
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Masukkan Nama Club"
        />
        <ul>
          <li
            v-for="(todo, index) in filteredTodos(showCompleted)"
            :key="index"
          >
            <input type="checkbox" v-model="todo.completed" />
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <button @click="removeTodo(index)">Hapus</button>
          </li>
        </ul>
        <p v-if="remainingCount === 0">AYO BERTANDING.</p>
        <p v-else>{{ remainingCount }} task(s) remaining</p>
        <button @click="toggleFilter">{{ filterButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTodosStore } from "./store/todos";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const todosStore = useTodosStore();
    const newTodo = ref("");
    const showCompleted = ref(false);
    const activeTab = ref("todos");

    const addTodo = () => {
      if (newTodo.value.trim() !== "") {
        todosStore.addTodo(newTodo.value);
        newTodo.value = "";
      }
    };

    const removeTodo = (index) => {
      todosStore.removeTodo(index);
    };

    const toggleFilter = () => {
      showCompleted.value = !showCompleted.value;
    };

    const filterButtonText = computed(() => {
      return showCompleted.value ? "Show Uncompleted" : "Show All";
    });

    return {
      newTodo,
      showCompleted,
      activeTab,
      addTodo,
      removeTodo,
      toggleFilter,
      filterButtonText,
      remainingCount: computed(() => todosStore.remainingCount),
      filteredTodos: todosStore.filteredTodos,
      showTodos: () => {
        activeTab.value = "todos";
      },
    };
  },
});
</script>

<style>
.completed {
  text-decoration: line-through;
}

.navbar {
  background-color: rgb(85, 21, 86);
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  float: left;
  cursor: pointer;
  padding: 14px 16px;
  color: rgb(66, 49, 68);
}

.navbar ul li:hover {
  background-color: rgb(31, 27, 35);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f9f9f9;
  margin: 5px 0;
  border: 1px solid #ddd;
}

li button {
  background: rgb(152, 71, 142);
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

li button:hover {
  background: rgba(139, 0, 134, 0.522);
}
</style>
