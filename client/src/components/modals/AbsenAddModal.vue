<script setup lang="ts">
import { useDateFormat } from '@vueuse/shared';
import type { AbsentForm } from '@/types/form';

const props = defineProps<{
  show: boolean,
  modelValue: AbsentForm,
  onOpen?: any,
  onCancel?: any,
  onConfirm?: any,
}>();

const formattedTime = useDateFormat(props.modelValue.time, "HH:mm");
</script>

<template>
  <div :class="{ 'active': show }" class="overlay"></div>

  <div :class="{ 'active': show }" class="modal">
    <h2 class="center-align">{{ formattedTime }}</h2>
  </div>

  <div :class="{ 'active': show }" class="modal absent-modal">
    <h5>Absen Terlambat</h5>
    <div>
      <div class="field textarea label border">
        <textarea v-model="modelValue.description"></textarea>
        <label>Alasan</label>
      </div>
    </div>
    <nav class="right-align">
      <button @click="onCancel"
        class="border"
      >Cancel</button>
      <button @click="onConfirm"
      >Simpan</button>
    </nav>
  </div>
</template>

<style scoped>
.absent-modal {
  margin-top: 128rem;
}
</style>