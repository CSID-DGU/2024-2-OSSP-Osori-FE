<template>
  <div class="comment-input">
    <select v-model="selectedEmoji">
      <option value="😊">😊</option>
      <option value="👍">👍</option>
      <option value="❤️">❤️</option>
    </select>
    <input type="text" v-model="comment" placeholder="댓글 입력" />
    <button @click="submitComment">작성</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedEmoji = ref('')
const comment = ref('')

const submitComment = () => {
  /* 댓글 제출 */
}
</script>

<style scoped>
.comment-input {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
