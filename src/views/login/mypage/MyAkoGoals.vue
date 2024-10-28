<!-- src/components/MyAkoGoals.vue -->
<template>
  <section class="mt-8">
    <h2 class="mb-2 text-lg font-semibold font-nanum-square-round">
      나의 아코자국들
    </h2>
    <ul v-if="goals.length > 0" class="space-y-3">
      <li
        v-for="(goal, index) in goals"
        :key="index"
        class="p-3 bg-white rounded-lg"
      >
        <p class="text-sm font-nanum-square-round">{{ goal.content }}</p>
        <p class="text-xs text-gray-500">
          {{ formatDate(goal.createdAt) }}
        </p>
      </li>
    </ul>
    <p v-else class="text-sm font-nanum-square-round">
      아직 목표 기록이 없습니다.
    </p>
  </section>
</template>

<script>
export default {
  props: {
    goals: {
      type: Array,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped></style>
