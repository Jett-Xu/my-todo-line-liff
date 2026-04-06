<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRestaurantStore } from '../stores/restaurantStore';

const props = defineProps<{
  closeAndSendMessage: (msg: string) => Promise<void>
}>();

const store = useRestaurantStore();
const activeList = computed(() => store.getActiveList());

const isSpinning = ref(false);
const rotation = ref(0);
const result = ref<string | null>(null);

const spin = () => {
  if (activeList.value.length === 0 || isSpinning.value) return;
  
  isSpinning.value = true;
  result.value = null;
  
  // 隨機抽選
  const drawIndex = Math.floor(Math.random() * activeList.value.length);
  
  // 輪盤算法
  const spins = 5;
  const sliceAngle = 360 / activeList.value.length;
  // 要指向上方，所以需扣掉抽中項目的角度
  const targetAngle = spins * 360 - (drawIndex * sliceAngle) - (sliceAngle / 2);
  
  // 多加一個隨機微調角度，看起來比較自然 (不要永遠停在正中間)
  const offset = (Math.random() - 0.5) * (sliceAngle * 0.8);
  
  rotation.value = rotation.value + targetAngle + offset;

  setTimeout(() => {
    isSpinning.value = false;
    result.value = activeList.value[drawIndex].text;
  }, 4000);
};

const shareResult = async () => {
  if (result.value) {
    await props.closeAndSendMessage(`🎲 聚餐決策出爐！\n我們今天的命定餐廳是：【 ${result.value} 】🎉\n走吧，準備出發！`);
  }
};

const wheelBackground = computed(() => {
  const len = activeList.value.length;
  if (len === 0) return 'conic-gradient(#334155 0 360deg)';
  if (len === 1) return 'conic-gradient(#6366f1 0 360deg)';
  
  let gradient = 'conic-gradient(';
  const step = 360 / len;
  
  // 歐美風高級冷淡色系 Muted colors
  const colors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f43f5e', // Rose
    '#f97316', // Orange
    '#eab308', // Yellow
    '#10b981', // Emerald
    '#0ea5e9', // Sky
  ];
  
  activeList.value.forEach((_, index) => {
    const color = colors[index % colors.length];
    gradient += `${color} ${index * step}deg ${(index + 1) * step}deg${index === len - 1 ? '' : ', '}`;
  });
  
  gradient += ')';
  return gradient;
});
</script>

<template>
  <div class="text-center pb-4">
    <div v-if="activeList.length === 0" class="alert border-secondary-subtle bg-body-tertiary text-muted rounded-4 shadow-sm py-4">
      <p class="mb-1">😔</p>
      請先在「餐廳清單」加入並啟用至少一家餐廳！
    </div>
    
    <div v-else class="position-relative d-inline-block mt-3 mb-5 mx-auto">
      <!-- 指針 -->
      <div class="pointer position-absolute top-0 start-50 translate-middle-x z-3 d-flex flex-column align-items-center">
        <div class="triangle bg-body shadow-lg z-3"></div>
        <div class="triangle-inner bg-dark z-3"></div>
      </div>
      
      <!-- 轉盤 -->
      <div 
        class="wheel rounded-circle shadow-lg border border-4"
        :class="{'spinning': isSpinning}"
        :style="{ background: wheelBackground, transform: `rotate(${rotation}deg)` }"
      >
        <div 
          v-for="(item, index) in activeList" 
          :key="index"
          class="wheel-label position-absolute w-100 h-100"
          :style="{ transform: `rotate(${index * (360/activeList.length) + (360/activeList.length)/2}deg)` }"
        >
          <span class="d-inline-block mt-4 text-white fw-bold shadow-text">{{ item.text.substring(0, 7) }}</span>
        </div>
      </div>
      <!-- 轉盤中心裝飾 -->
      <div class="center-dot position-absolute top-50 start-50 translate-middle rounded-circle bg-body shadow-sm border border-secondary-subtle d-flex align-items-center justify-content-center">
        <div class="center-inner-dot rounded-circle bg-secondary opacity-25"></div>
      </div>
    </div>
    
    <div>
      <button 
        v-if="activeList.length > 0"
        @click="spin" 
        :disabled="isSpinning"
        class="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow text-white fw-bold d-inline-flex align-items-center"
        style="transition: all 0.3s; transform: translateY(0);"
        onmouseover="this.style.transform='translateY(-2px)'"
        onmouseout="this.style.transform='translateY(0)'"
      >
        <span v-if="isSpinning" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ isSpinning ? '命運轉動中...' : '🎲 點擊開抽！' }}
      </button>
    </div>
    
    <!-- 結果視窗 -->
    <Transition name="bounce">
      <div v-if="result" class="result-card bg-body mt-5 p-4 rounded-4 shadow-lg border border-secondary-subtle">
        <p class="text-muted fw-semibold mb-2 tracking-wide">🏆 恭喜抽中</p>
        <h2 class="text-primary fw-black mb-4 display-6">「{{ result }}」</h2>
        <button @click="shareResult" class="btn btn-success w-100 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center shadow-sm">
          <svg width="20" height="20" class="me-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          推播至 LINE 聊天室
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wheel {
  width: 280px;
  height: 280px;
  transition: transform 4s cubic-bezier(0.15, 0.9, 0.25, 1);
  overflow: hidden;
  border-color: var(--bs-body-bg) !important;
}

.pointer {
  top: -15px !important;
}
.triangle {
  width: 34px;
  height: 38px;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  border-radius: 4px;
}
.triangle-inner {
  width: 20px;
  height: 24px;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  margin-top: -34px;
}

.center-dot {
  width: 48px;
  height: 48px;
}
.center-inner-dot {
  width: 20px;
  height: 20px;
}

.wheel-label {
  text-align: center;
  pointer-events: none;
}
.shadow-text {
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}
.fw-black { font-weight: 900; }
.tracking-wide { letter-spacing: 0.1em; }

.bounce-enter-active {
  animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
