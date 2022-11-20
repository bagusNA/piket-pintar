<script setup lang="ts">
import { ref } from "vue";
import { getTodayAbsents } from "@/composables/absent/getTodayAbsents";
import {subscribeAbsent} from "@/composables/absent/subscribeAbsent";
import type { Record } from "pocketbase";
import AbsentCard from "@/components/Card/AbsentCard.vue";

const absents = ref<Record[]>(await getTodayAbsents());
subscribeAbsent(absents);
</script>

<template>
  <AbsentCard :absents="absents" title="Absen Hari Ini" />
</template>