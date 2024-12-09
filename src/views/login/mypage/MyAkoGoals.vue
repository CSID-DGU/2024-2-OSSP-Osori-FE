<template>
  <div class="page-container">
    <div class="mobile-container">
      <main class="main-content">
        <section class="my-ako-goals">
          <h2 class="goals-title">나의 아코자국들</h2>
          <ul v-if="goals.length > 0" class="goals-list">
            <li
              v-for="(goal, index) in displayedGoals"
              :key="index"
              class="goal-item"
            >
              <p class="goal-date">{{ formatDate(goal.createdAt) }}</p>
              <p class="goal-content">{{ goal.content }}</p>
            </li>
          </ul>
          <p v-else class="no-goals">아직 목표 기록이 없습니다.</p>
          <button
            v-if="goals.length > 6 && !showAll"
            @click="showAllGoals"
            class="more-button"
          >
            더보기
          </button>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  goals: {
    type: Array,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
})

const showAll = ref(false)
const displayedGoals = computed(() => {
  return showAll.value ? props.goals : props.goals.slice(0, 6)
})

const showAllGoals = () => {
  showAll.value = true
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
}

.mobile-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
}

.main-content {
  padding: 2rem 1.5rem;
}

.my-ako-goals {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  margin-top: 1.5rem;
}

.goals-title {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: white;
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  list-style-type: none;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.goal-date {
  background-color: #ff7f00;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.goal-content {
  font-size: 0.875rem;
  color: #000000;
  margin: 0;
  flex-grow: 1;
}

.no-goals {
  font-size: 0.875rem;
  color: #000000;
  text-align: center;
}

.more-button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1rem;
  background-color: #f6b87a;
  color: #000000;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.more-button:hover {
  background-color: #e5a769;
}
</style>
