<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue';
import { useNow } from '@vueuse/core';
import { useDateFormat } from "@vueuse/shared";
import { useAuthStore } from '@/stores/AuthStore';
import { pb } from '@/pocketbase';
import { useStore } from '@/stores/Store';
import { getStudentByUserId } from '@/composables/student/getStudentByUserId';
import { getTodayAbsents } from "@/composables/absent/getTodayAbsents";
import type { AbsentForm } from '@/types/form';

import CardSummary from '@/components/Card/CardSummary.vue';
import CardWelcome from '@/components/Card/CardWelcome.vue';
import AbsenAddModal from '@/components/modals/AbsenAddModal.vue';

const store = useStore();
const authStore = useAuthStore();
const isModalShown = ref(false);
const time = useNow();
const clock = useDateFormat(time, "HH:mm");
const totalTodayAbsent = ref(0);

const absentForm = reactive<AbsentForm>({
  description: '',
  time: time.value
});

const addAbsentAction = async () => {
  const student = await getStudentByUserId(authStore.user.id);

  const data = {
    student_id: student.id,
    time_arrived: time.value,
    description: absentForm.description
  }

  await pb.collection('absents').create(data);

  isModalShown.value = false;
  store.setSuccess("Absen berhasil disimpan!", 5000);
}

const getTodayAbsent = async () => {
  const count = await getTodayAbsents();

  totalTodayAbsent.value = count.length;
}

onBeforeMount(async () => {
  await getTodayAbsent();
});
</script>

<template>
  <main class="wrapper">
    <div class="row">
      <h4 class="wrapper__title max">Dashboard</h4>
      <h5>{{ clock }}</h5>
    </div>
    <CardWelcome />

    <div class="cards-wrapper">
      <CardSummary title="Terlambat Hari Ini">
        <p>{{ totalTodayAbsent }} Orang</p>
      </CardSummary>
    </div>

    <button @click="isModalShown = true"
      class="extend square round" id="btn-add"
    >
      <i>add</i>
      <span>Absen</span>
    </button>

    <AbsenAddModal 
      v-model="absentForm"
      :show="isModalShown" 
      :onCancel="() => isModalShown = false"
      :onConfirm="addAbsentAction"
    />
  </main>
</template>

<style scoped>
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rem;
  margin-top: 12rem;
}

#btn-add {
  position: absolute;
  right: 5%;
  bottom: 4%;
}

@media only screen and (min-width: 600px) {
  .cards-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>