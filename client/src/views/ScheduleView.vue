<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useDateFormat } from '@vueuse/shared';
import { pb } from '@/pocketbase';
import type { Record } from 'pocketbase';
import TeacherCard from '@/components/Card/TeacherCard.vue';

interface ScheduleChoice {
  value: string,
  label: string
}

const isLoading = ref(false);
const sessions = ref<Record[] | null>(null);
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

  sessions.value = await getSchedules();

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

  const sessionRecords = await
    pb.collection('picket_sessions')
      .getList(1, 50, {
        filter: `day = "${day}"`
      });
  
  if(!sessionRecords.totalItems) return [];

  let filterRule = '';
  sessionRecords.items.forEach((session, index) => {
    filterRule += `${index === 0 ? '' : '|| '} picket_session_id = "${session.id}" `;
  });

  const schedules = await 
    pb.collection('picket_schedules')
      .getList(1, 50,  {
        filter: filterRule,
        expand: 'picket_session_id,teacher_id.user_id'
      });

  const sessions = sessionRecords.items.map(session => {
    const sessionSchedules = schedules.items.filter((schedule) => {
      return schedule.picket_session_id === session.id
    });

    return {
      ...session,
      schedules: sessionSchedules
    }
  }) as unknown as Record[];

  return sessions;
}

const getUrl = async (record: Record, filename: string) => {
  return await pb.getFileUrl(record, filename)
}

onBeforeMount(async () => {
  sessions.value = await getSchedules();
});
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

    <template v-if="!isLoading && sessions">
      <template v-for="session in sessions">
        <article v-if="session.schedules.length">
          <h5>{{ session.time_start }} - {{ session.time_end }}</h5>

          <div class="teacher-list">
            <Suspense v-for="schedule in session.schedules">
              <TeacherCard :teacher="schedule.expand.teacher_id" />
            </Suspense>
          </div>
        </article>
      </template>
    </template>

    <a v-else-if="isLoading" class="loader medium"></a>
  </main>
</template>

<style scoped lang="scss">
.teacher-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>