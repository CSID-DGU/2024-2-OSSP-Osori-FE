<template>
  <section class="my-ako-goals">
    <h2 class="goals-title">나의 아코자국들</h2>
    <ul v-if="goals.length > 0" class="goals-list">
      <li v-for="(goal, index) in goals" :key="index" class="goal-item">
        <p class="goal-content">{{ goal.content }}</p>
        <p class="goal-date">{{ formatDate(goal.createdAt) }}</p>
      </li>
    </ul>
    <p v-else class="no-goals">아직 목표 기록이 없습니다.</p>
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

<style scoped>
.my-ako-goals {
  margin-top: 2rem;
}

.goals-title {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  font-family: 'NanumSquareRound', sans-serif;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.goal-item {
  padding: 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
}

.goal-content {
  font-size: 0.875rem;
  font-family: 'NanumSquareRound', sans-serif;
}

.goal-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.no-goals {
  font-size: 0.875rem;
  font-family: 'NanumSquareRound', sans-serif;
}
</style>
