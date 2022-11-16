<script setup lang="ts">
import { pb } from '@/pocketbase';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const user = authStore.user;
const avatarUrl = pb.getFileUrl(user, user!.avatar);
</script>

<template>
  <article class="border primary-container">
    <div class="row">
      <img class="circle large" :src="avatarUrl" :alt="user.name">
      <div class="max">
        <h5>Halo, {{ user.name }}!</h5>
        <p>Selamat datang di aplikasi Piket Pintar SMK Negeri 7 Samarinda.</p>
      </div>
    </div>
  </article>
</template>