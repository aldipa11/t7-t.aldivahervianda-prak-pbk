import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todos: [],
  }),
  getters: {
    incompleteTodosCount: state => {
      return state.todos.filter(todo => !todo.completed).length;
    }
  },
  actions: {
    addTodo(text) {
      this.todos.push({ text, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }
});
