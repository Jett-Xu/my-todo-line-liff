<script setup lang="ts">
import type { Todo } from '../types';

defineProps<{
  todos: Todo[];
}>();

defineEmits<{
  (e: 'remove', id: number): void;
}>();
</script>

<template>
  <div class="list-group mb-4">
    <div v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input v-model="todo.done" type="checkbox" class="form-check-input me-2">
        <span :class="{ 'text-decoration-line-through text-muted': todo.done }">{{ todo.text }}</span>
      </div>
      <button @click="$emit('remove', todo.id)" class="btn btn-sm btn-outline-danger">刪除</button>
    </div>
    <div v-if="todos.length === 0" class="text-center text-muted py-3">目前沒有任務，放鬆一下吧！</div>
  </div>
</template>
