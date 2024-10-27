<template>
  <div class="my-goal">
    <div class="goal-content">
      <span>{{ nickname }}의 목표: {{ goalContent }}</span>
      <div class="goal-icons">
        <button @click="toggleCommentSection">💬</button>
        <button @click="editGoal">✏️</button>
        <button @click="deleteGoal">🗑️</button>
      </div>
    </div>

    <div v-if="showCommentSection" class="comment-section">
      <CommentInput />
      <CommentList />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'

const nickname = ref('내 닉네임')
const goalContent = ref('오늘의 목표 내용')
const showCommentSection = ref(false)

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}

const editGoal = () => {
  /* 목표 수정 */
}
const deleteGoal = () => {
  /* 목표 삭제 */
}
</script>

<style scoped>
.my-goal {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.goal-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.goal-icons {
  display: flex;
  gap: 4px;
}

.comment-section {
  margin-top: 8px;
}
</style>
