<script setup lang="ts">
import { useLiff } from './composables/useLiff';
import { useTodos } from './composables/useTodos';

import UserProfile from './components/UserProfile.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

// 領域邏輯 (Hooks)
const { profile, closeAndSendMessage } = useLiff();
const { todos, addTodo, removeTodo, getRemainingCount } = useTodos();

// UI 互動邏輯
const handleCloseAndSend = async () => {
  const remaining = getRemainingCount();
  const userName = profile.value?.displayName || '';
  const message = `📋 [待辦更新] ${userName} 還有 ${remaining} 項任務待完成！`;
  await closeAndSendMessage(message);
};
</script>

<template>
  <div v-if="profile" class="container py-4">
    <UserProfile :profile="profile" />
    
    <TodoInput @add="addTodo" />
    
    <TodoList :todos="todos" @remove="removeTodo" />

    <button @click="handleCloseAndSend" class="btn btn-dark w-100 py-2 mt-2">
      整理完畢並關閉
    </button>
  </div>
  
  <div v-else class="container py-4 text-center">
    <div class="spinner-border text-primary mb-3" role="status">
      <span class="visually-hidden">載入中...</span>
    </div>
    <p>正在拉取 LINE 用戶資料...</p>
  </div>
</template>