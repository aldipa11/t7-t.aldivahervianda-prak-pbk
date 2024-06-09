<template>
  <div id="app">
    <h1>Todo List</h1>
    <div class="input-container">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" class="todo-input" />
      <button @click="addTodo" class="add-btn">Add</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="toggleTodo(index)" class="toggle-btn">
          {{ todo.completed ? 'Undo' : 'Complete' }}
        </button>
        <button @click="removeTodo(index)" class="remove-btn">Remove</button>
      </li>
    </ul>
    <p class="incomplete-text">Incomplete tasks: {{ incompleteTodosCount }}</p>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value.trim());
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTodo = (index) => {
      todoStore.toggleTodo(index);
    };

    // Menggunakan getter untuk mendapatkan jumlah tugas yang belum selesai
    const incompleteTodosCount = todoStore.incompleteTodosCount;

    return {
      newTodo,
      addTodo,
      removeTodo,
      toggleTodo,
      todos: todoStore.todos,
      incompleteTodosCount // Melewatkan jumlah tugas yang belum selesai ke dalam template
    };
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #fde997, #e4a0a0);
}

h1 {
  text-align: center;
  color: #4169e1; /* Warna biru tua */
}

.input-container {
  display: flex;
  margin-bottom: 10px;
}

.todo-input {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #4169e1; /* Warna biru tua */
}

.add-btn {
  padding: 8px 15px;
  background-color: #4169e1; /* Warna biru tua */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #1e90ff; /* Warna biru cerah */
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.todo-item:last-child {
  margin-bottom: 0;
}

.completed {
  text-decoration: line-through;
  color: #555; /* Warna abu-abu gelap */
}

.toggle-btn,
.remove-btn {
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #ff4500; /* Warna oranye */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover,
.remove-btn:hover {
  background-color: #d23f00; /* Warna oranye yang sedikit lebih gelap */
}

.incomplete-text {
  margin-top: 10px;
  text-align: center;
  color: #4169e1; /* Warna biru tua */
}
</style>
