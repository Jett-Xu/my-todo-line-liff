<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore';
import { ref } from 'vue';

const store = useRestaurantStore();
const newRes = ref('');

const handleAdd = () => {
  store.addRestaurant(newRes.value);
  newRes.value = '';
};
</script>

<template>
  <div>
    <!-- 輸入框 -->
    <div class="input-group mb-4 shadow-sm rounded-pill overflow-hidden border border-secondary-subtle bg-body">
      <input v-model="newRes" @keyup.enter="handleAdd" type="text" class="form-control border-0 bg-transparent px-4 py-3" placeholder="新增想吃的餐廳...">
      <button @click="handleAdd" class="btn btn-primary px-4 fw-bold">＋ 新增</button>
    </div>

    <!-- 列表 -->
    <TransitionGroup name="list" tag="div" class="list-group mb-4 border-0">
      <div v-for="res in store.list" :key="res.id" class="list-group-item d-flex justify-content-between align-items-center shadow-sm">
        <label class="d-flex align-items-center w-100 cursor-pointer m-0 py-1">
          <input v-model="res.selected" type="checkbox" class="form-check-input me-3 rounded-circle border-secondary shadow-sm" style="width: 1.25rem; height: 1.25rem; cursor: pointer;">
          <span :class="{ 'text-muted text-decoration-line-through opacity-50': !res.selected }" class="fw-medium transition-all">{{ res.text }}</span>
        </label>
        <button @click="store.removeRestaurant(res.id)" class="btn btn-link text-danger p-2 text-decoration-none bg-transparent rounded-circle hover-bg-danger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      </div>
      <div v-if="store.list.length === 0" key="empty" class="text-center text-muted py-5 mt-3 opacity-50">
        <p class="mb-1">🍽️</p>
        <small>尚未加入任何餐廳，快塞滿清單吧！</small>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.cursor-pointer { cursor: pointer; }
.transition-all { transition: all 0.3s ease; }
.hover-bg-danger { transition: background-color 0.2s; }
.hover-bg-danger:hover { background-color: rgba(220, 53, 69, 0.1); }

/* List animation */
.list-enter-active, .list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>
