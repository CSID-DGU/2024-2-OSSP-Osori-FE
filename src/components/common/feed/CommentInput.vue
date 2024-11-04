<template>
  <div class="comment-input">
    <select v-model="selectedEmoji">
      <option value="" disabled selected hidden><img src="../../../assets/images/smile.svg"></option>
      <option value="😊">😊</option>
      <option value="👍">👍</option>
      <option value="❤️">❤️</option>
    </select>
    <input type="text" v-model="comment" placeholder="댓글 입력" />
    <button @click="submitComment"><img src="../../../assets/images/add.svg"></button>
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
