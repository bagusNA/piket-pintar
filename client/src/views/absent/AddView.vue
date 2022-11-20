<script setup lang="ts">
import { useNow, useDateFormat } from '@vueuse/core';

const time = useNow();
const formattedTime = useDateFormat(time, "HH:mm");
</script>

<template>
  {{ formattedTime }}
</template>