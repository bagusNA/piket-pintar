<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue';
import { useDateFormat } from '@vueuse/shared';
import { getAllAbsents } from '@/composables/absent/getAllAbsents';
import { subscribeAbsent } from "@/composables/absent/subscribeAbsent";
import type { Record } from 'pocketbase';
import AbsentCard from '@/components/Card/AbsentCard.vue';
import TodayAbsentCard from "@/components/Card/TodayAbsentCard.vue";

const allAbsents = ref<Record[]>([]);

onBeforeMount(async () => {
  allAbsents.value = await getAllAbsents();
  subscribeAbsent(allAbsents);
});
</script>

<template>
  <main class="wrapper">
    <h4 class="wrapper__title">Absen Terlambat</h4>

    <Suspense>
      <TodayAbsentCard />
    </Suspense>

    <AbsentCard
      :absents="allAbsents"
      title="Semua Absen"
      timeFormat="dddd, DD MMMM YYYY, HH:mm"
    />
  </main>
</template>
