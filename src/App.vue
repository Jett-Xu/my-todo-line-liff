<script setup lang="ts">
import { ref, onMounted } from 'vue';
import liff from '@line/liff';

const profile = ref<any>(null);
const liffId = import.meta.env.VITE_LIFF_ID;

onMounted(async () => {
  try {
    await liff.init({ liffId });
    if (liff.isLoggedIn()) {
      profile.value = await liff.getProfile();
    } else {
      liff.login();
    }
  } catch (err) {
    console.error('LIFF Init Failed', err);
  }
});

const closeAndSend = async () => {
  // 這是在面試時最能展示功能的一招：從網頁傳訊息回聊天室
  if (liff.isInClient()) {
    await liff.sendMessages([
      {
        type: 'text',
        text: `📍 [系統通知] ${profile.value?.displayName} 已完成清單整理！`
      }
    ]);
    liff.closeWindow();
  }
};
</script>

<template>
  <div v-if="profile" class="container py-4">
    <header class="text-center mb-4">
      <img :src="profile.pictureUrl" width="80" class="rounded-circle mb-2" />
      <h3>你好，{{ profile.displayName }}</h3>
      <p class="text-muted">這是你的待辦清單</p>
    </header>

    <main>
      <div class="list-group mb-3">
         </div>
      <button @click="closeAndSend" class="btn btn-primary w-100">完成並返回聊天室</button>
    </main>
  </div>
  <div v-else class="text-center py-5">
    載入中...
  </div>
</template>

<style scoped>
.container { max-width: 500px; }
</style>