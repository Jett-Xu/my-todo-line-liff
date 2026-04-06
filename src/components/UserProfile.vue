<script setup lang="ts">
import type { UserProfile } from '../types';

defineProps<{
  profile: UserProfile;
}>();
</script>

<template>
  <header class="text-center mb-4">
    <img v-if="profile.pictureUrl" :src="profile.pictureUrl" width="60" class="rounded-circle border mb-2" alt="User Avatar" />
    <h5 class="fw-bold">{{ profile.displayName }} 的清單</h5>
  </header>
</template>
