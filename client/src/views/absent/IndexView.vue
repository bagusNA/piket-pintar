<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useDateFormat } from '@vueuse/shared';
import { getTodayAbsents } from '@/composables/absent/getTodayAbsents';
import { getAllAbsents } from '@/composables/absent/getAllAbsents';
import AbsentCard from '@/components/Card/AbsentCard.vue';
import type { Record } from 'pocketbase';

const absents = reactive({
  today: [] as Record[],
  all: [] as Record[],
});

const formatTime: string = (date: Date, format?: string) => {
  const str = useDateFormat(date, format ?? 'HH:mm');

  return str.value;
}

onBeforeMount(async () => {
  absents.today = await getTodayAbsents();
  absents.all = await getAllAbsents();
});
</script>

<template>
  <main class="wrapper">
    <h4 class="wrapper__title">Absen Terlambat</h4>

    <AbsentCard
      :absents="absents.today"
      title="Hari Ini"
    />

    <AbsentCard
      :absents="absents.all"
      title="Semua Absen"
      timeFormat="dddd, DD MMMM YYYY, HH:mm"
    />
  </main>
</template>
