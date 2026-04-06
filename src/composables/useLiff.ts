import { ref, onMounted } from 'vue';
import liff from '@line/liff';
import type { UserProfile } from '../types';

export function useLiff() {
  const profile = ref<UserProfile | null>(null);
  const isInitialized = ref(false);

  const initLiff = async () => {
    const liffId = import.meta.env.VITE_LIFF_ID;
    try {
      await liff.init({ liffId });
      isInitialized.value = true;
      if (liff.isLoggedIn()) {
        profile.value = await liff.getProfile() as UserProfile;
      } else {
        liff.login();
      }
    } catch (err) {
      console.error('LIFF Init Failed', err);
    }
  };

  const closeAndSendMessage = async (messageText: string) => {
    if (liff.isInClient()) {
      await liff.sendMessages([{
        type: 'text',
        text: messageText
      }]);
      liff.closeWindow();
    }
  };

  onMounted(() => {
    initLiff();
  });

  return {
    profile,
    isInitialized,
    closeAndSendMessage
  };
}
