<script setup lang="ts">
import type { UserProfile } from '../types';

defineProps<{
  profile: UserProfile;
}>();
</script>

<template>
  <header class="d-flex align-items-center mb-4 p-3 bg-body-tertiary rounded-4 shadow-sm border border-secondary-subtle">
    <div class="position-relative">
      <img v-if="profile.pictureUrl" :src="profile.pictureUrl" width="56" height="56" class="rounded-circle border border-2 border-body shadow-sm" alt="Avatar" style="object-fit: cover;" />
      <span class="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle">
        <span class="visually-hidden">Online</span>
      </span>
    </div>
    <div class="ms-3">
      <p class="text-muted mb-0 small fw-medium" style="letter-spacing: 0.5px;">Welcome back,</p>
      <h5 class="fw-bold mb-0 text-body">{{ profile.displayName }}</h5>
    </div>
  </header>
</template>
