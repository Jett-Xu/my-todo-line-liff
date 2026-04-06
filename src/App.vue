<script setup lang="ts">
import { useLiff } from './composables/useLiff';
import UserProfile from './components/UserProfile.vue';
import { ref } from 'vue';

const { profile, closeAndSendMessage } = useLiff();
const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light');
};
</script>

<template>
  <div v-if="profile" class="container py-4 mx-auto" style="max-width: 480px;">
    <!-- 工具列 -->
    <div class="d-flex justify-content-end mb-3">
      <button @click="toggleTheme" class="btn btn-sm btn-outline-secondary border-0 rounded-pill px-3 shadow-sm bg-body">
        <span v-if="isDark">☀️ 日間模式</span>
        <span v-else>🌙 深色模式</span>
      </button>
    </div>
    
    <UserProfile :profile="profile" />
    
    <!-- 導覽列 -->
    <ul class="nav nav-pills nav-fill mb-4 custom-nav bg-body-tertiary rounded-pill p-1 shadow-sm border border-secondary-subtle">
      <li class="nav-item">
        <router-link to="/" class="nav-link rounded-pill py-2 text-secondary fw-semibold" active-class="active text-white bg-primary shadow">餐廳清單</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/wheel" class="nav-link rounded-pill py-2 text-secondary fw-semibold" active-class="active text-white bg-primary shadow">幸運輪盤</router-link>
      </li>
    </ul>

    <!-- 頁面視圖 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :closeAndSendMessage="closeAndSendMessage" />
      </transition>
    </router-view>
  </div>
  
  <div v-else class="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style="height: 100vh; max-width: 480px;">
    <div class="spinner-grow text-primary mb-4" role="status" style="width: 3rem; height: 3rem;"></div>
    <p class="text-muted fw-medium text-uppercase tracking-wider" style="letter-spacing: 2px;">Syncing LINE Profile...</p>
  </div>
</template>

<style>
body {
  background-color: var(--bs-body-bg);
  transition: background-color 0.3s ease, color 0.3s ease;
}
.nav-pills .nav-link {
  transition: all 0.3s ease;
}
</style>