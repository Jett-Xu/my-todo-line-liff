import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Restaurant } from '../types';

export const useRestaurantStore = defineStore('restaurants', () => {
  const list = ref<Restaurant[]>([]);

  // 初始化從 localStorage 讀取
  const saved = localStorage.getItem('my-restaurants');
  if (saved) {
    list.value = JSON.parse(saved);
  } else {
    // 預設給幾個餐廳
    list.value = [
      { id: 1, text: '鼎泰豐', selected: true },
      { id: 2, text: '壽司郎', selected: true },
      { id: 3, text: '麥當勞', selected: true },
      { id: 4, text: '詹記麻辣火鍋', selected: true }
    ];
  }

  // 自動監聽並存檔
  watch(list, (newVal) => {
    localStorage.setItem('my-restaurants', JSON.stringify(newVal));
  }, { deep: true });

  const addRestaurant = (text: string) => {
    if (!text.trim()) return;
    list.value.unshift({ // 新增到最上方
      id: Date.now(),
      text,
      selected: true
    });
  };

  const removeRestaurant = (id: number) => {
    list.value = list.value.filter(t => t.id !== id);
  };

  const getActiveList = () => {
    return list.value.filter(t => t.selected);
  };

  return {
    list,
    addRestaurant,
    removeRestaurant,
    getActiveList
  };
});
