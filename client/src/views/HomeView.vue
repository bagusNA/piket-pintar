<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useNow } from '@vueuse/core';
import { useAuthStore } from '@/stores/AuthStore';
import { pb } from '@/pocketbase';
import { useStore } from '@/stores/Store';
import { getStudentByUserId } from '@/composables/student/getStudentByUserId';
import type { AbsentForm } from '@/types/form';

import CardSummary from '@/components/Card/CardSummary.vue';
import CardWelcome from '@/components/Card/CardWelcome.vue';
import AbsenAddModal from '@/components/modals/AbsenAddModal.vue';

const store = useStore();
const authStore = useAuthStore();
const isModalShown = ref(false);
const time = useNow();

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

  const absent = await pb.collection('absents').create(data);

  isModalShown.value = false;
  store.setSuccess("Absen berhasil disimpan!", 5000);
}
</script>

<template>
  <main class="wrapper">
    <h4 class="wrapper__title">Dashboard</h4>
    <CardWelcome />

    <div class="cards-wrapper">
      <CardSummary title="Terlambat Hari Ini">
        <p>12 Orang</p>
      </CardSummary>
      <CardSummary title="Jam Piket">
        <p>07:00 - 10:00</p>
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