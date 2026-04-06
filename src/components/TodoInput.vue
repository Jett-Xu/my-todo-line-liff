<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add', text: string): void;
}>();

const newTodo = ref('');

const handleAdd = () => {
  if (!newTodo.value.trim()) return;
  emit('add', newTodo.value);
  newTodo.value = '';
};
</script>

<template>
  <div class="input-group mb-4">
    <input v-model="newTodo" @keyup.enter="handleAdd" type="text" class="form-control" placeholder="想做什麼？">
    <button @click="handleAdd" class="btn btn-primary">新增</button>
  </div>
</template>
