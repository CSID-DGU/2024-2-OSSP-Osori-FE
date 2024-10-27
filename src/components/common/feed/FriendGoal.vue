<template>
  <div class="friend-goal">
    <div class="goal-content">
      <span>{{ friendNickname }}의 목표: {{ friendGoalContent }}</span>
      <button @click="toggleCommentSection">💬</button>
    </div>

    <CommentInput v-if="showCommentSection" />
    <CommentList v-if="showCommentSection" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'

const friendNickname = ref('친구 닉네임')
const friendGoalContent = ref('친구의 오늘 목표')
const showCommentSection = ref(false)

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}
</script>

<style scoped>
.friend-goal {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.goal-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
