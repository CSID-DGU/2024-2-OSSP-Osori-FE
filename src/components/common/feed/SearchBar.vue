<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="nickname"
      placeholder="친구 닉네임 검색"
      @input="searchFriend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nickname = ref('')

const searchFriend = () => {
  // 친구 검색 로직 추가
}
</script>

<style scoped>
.search-bar input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
