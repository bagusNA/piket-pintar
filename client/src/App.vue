<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
</script>

<template>
  <Navbar v-if="route.name !== 'login'" />

  <RouterView />
</template>

<style>
.wrapper {
  /* display: flow-root; */
  overflow: auto;
  padding: 16rem;
  margin-bottom: 80rem;
  min-height: calc(100vh - 80rem);
}

.wrapper__title {
  padding: 10rem 0;
}

.round-small {
  border-radius: 12rem;
}

.pointer {
  cursor: pointer;
}

@media only screen and (min-width: 600px) {
  .wrapper {
    margin-left: 80rem;
    margin-bottom: 0;
    min-height: 100vh;
  }
}
</style>
