<script setup lang="ts">
import { pb } from "@/pocketbase";
import { Record } from "pocketbase";

const props = defineProps<{
  teacher: Record,
}>();

const url = await pb.getFileUrl(props.teacher.expand.user_id as Record, props.teacher.expand.user_id.avatar);
</script>

<template>
  <article class="no-padding no-margin">
    <div class="card-image"
      :style="{ backgroundImage: `url('${url}')` }"
    ></div>
    <div class="absolute bottom left right padding bottom-shadow white-text">
      <nav>
        <h5>{{ teacher.name }}</h5>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.card-image {
  background-size: cover;
  background-position: center;
  min-height: 200px;
}
</style>