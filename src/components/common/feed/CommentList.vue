<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="nick">{{ comment.nickname }}</div>
      <div>{{ comment.emoji }}</div>
      <div class="comment">{{ comment.content }}</div>
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

.comment-list{
  display: flex;
  flex-direction: column;
  gap:5px;
  margin-bottom: 5px;
}
.comment{
  display: flex;
  gap:10px;
  margin-left: 5px;
}

.nick{
  font-family: 'NaB';
  font-size: 15px;
  color:#FF7F00;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;
}

.comment{
  font-family: 'NaL';
  font-size: 14px;
  color:#000000;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;
}
</style>
