<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <span>{{ comment.nickname }}</span>
      <span>{{ comment.emoji }}</span>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  { id: 1, nickname: '친구1', emoji: '😊', content: '좋은 목표네요!' },
  { id: 2, nickname: '친구2', emoji: '👍', content: '화이팅!' }
])
</script>

<style scoped>
.comment-list .comment {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}
</style>
