<script setup lang="ts">
import { pb } from '@/pocketbase';
import { useDateFormat } from '@vueuse/shared';
import type { Record } from 'pocketbase';
import { ref, watch } from 'vue';

interface ScheduleChoice {
  value: string,
  label: string
}

const isLoading = ref(false);
const schedules = ref<Record[] | null>(null);
const selectedDayIndex = ref(0);
const days: ScheduleChoice[] = [
  {
    value: 'Today',
    label: 'Hari Ini'
  },
  {
    value: 'Mon',
    label: 'Senin'
  },
  {
    value: 'Tue',
    label: 'Selasa'
  },
  {
    value: 'Wed',
    label: 'Rabu'
  },
  {
    value: 'Thu',
    label: 'Kamis'
  },
  {
    value: 'Fri',
    label: "Jum'at"
  },
  {
    value: 'Sat',
    label: 'Sabtu'
  },
  {
    value: 'Sun',
    label: 'Minggu'
  },
];

watch(selectedDayIndex, async () => {
  isLoading.value = true;

  const data = await getSchedules();
  schedules.value = data;

  isLoading.value = false;
})

// Navigation actions
const dropdownAction = (index: number) => {
  selectedDayIndex.value = index;
}

const prevAction = () => {
  if (!selectedDayIndex.value)
    selectedDayIndex.value = days.length - 1;
  else
    selectedDayIndex.value--;
}

const nextAction = () => {
  if (selectedDayIndex.value === days.length - 1)
    selectedDayIndex.value = 0;
  else
    selectedDayIndex.value++;
}

// Data fetching
async function getSchedules() {
  let day = days[selectedDayIndex.value].value;

  if (day === 'Today') {
    const date = new Date();
    day = useDateFormat(date, "ddd").value;
  }

  const sessions = await
    pb.collection('picket_sessions')
      .getList(1, 50, {
        filter: `day = "${day}"`
      });
  
  if(!sessions.totalItems) return [];

  let filterRule = '';
  sessions.items.forEach((session, index) => {
    filterRule += `${index === 0 ? '' : '|| '} picket_session_id = "${session.id}" `;
  });

  const schedules = await 
    pb.collection('picket_schedules')
      .getList(1, 50,  {
        filter: filterRule,
        expand: 'picket_session_id,teacher_id'
      });

  return schedules.items;
}
</script>

<template>
  <main class="wrapper">
    <h4 class="wrapper__title">Jadwal Piket</h4>
    
    <nav class="schedule-nav row">
      <button class="circle" @click="prevAction">
        <i>arrow_back</i>
      </button>

      <button class="max">
        <span>{{ days[selectedDayIndex].label }}</span>
        <i>arrow_drop_down</i>

        <div class="dropdown">
          <a v-for="(schedule, index) in days"
            @click="() => dropdownAction(index)"
          >
            {{ schedule.label }}
          </a>
        </div>
      </button>

      <button class="circle" @click="nextAction">
        <i>arrow_forward</i>
      </button>
    </nav>

    <article v-if="!isLoading && schedules">
      <table class="border">
        <thead>
          <tr>
            <th>Nama Guru</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedules">
            <td>{{ schedule.expand.teacher_id.name }}</td>
          </tr>
        </tbody>
      </table>
    </article>

    <a v-else-if="isLoading" class="loader medium"></a>
  </main>
</template>