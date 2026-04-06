import { ref, watch, onMounted } from 'vue';
import type { Todo } from '../types';

export function useTodos() {
  const todos = ref<Todo[]>([]);

  onMounted(() => {
    const saved = localStorage.getItem('my-todos');
    if (saved) todos.value = JSON.parse(saved);
  });

  watch(todos, (newVal) => {
    localStorage.setItem('my-todos', JSON.stringify(newVal));
  }, { deep: true });

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    todos.value.push({
      id: Date.now(),
      text,
      done: false
    });
  };

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  const getRemainingCount = () => {
    return todos.value.filter(t => !t.done).length;
  };

  return {
    todos,
    addTodo,
    removeTodo,
    getRemainingCount
  };
}
