<script setup lang="ts">
import { useDateFormat } from '@vueuse/shared';
import type { Record } from 'pocketbase';

const props = defineProps<{
  absents: Record[],
  title: string,
  timeFormat?: string
}>();

const formatTime: string = (date: Date) => {
  const str = useDateFormat(date, props.timeFormat ?? 'HH:mm');

  return str.value;
}
</script>

<template>
  <article v-if="absents !== []">
      <h5>{{ title }}</h5>
      <table class="border">
        <thead>
          <tr>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Jam Datang</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="absent in absents">
            <td>{{ absent.expand.student_id.expand.user_id.name }}</td>
            <td>
              {{ 
                absent.expand.student_id.expand.school_class_id.grade + ' ' + 
                absent.expand.student_id.expand.school_class_id.expand.specialty_id.initial + ' ' +
                absent.expand.student_id.expand.school_class_id.number
              }}
            </td>
            <td>{{ formatTime(absent.time_arrived) }}</td>
            <td>{{ absent.description }}</td>
          </tr>
        </tbody>
      </table>
    </article> 
</template>