<template>
  <div class="follow-stats" @click="goToFollowPage">
    <div class="date-info">{{ formattedDate }}</div>
    <div class="follow-info">
      <span>팔로워 {{ followerCount }}명</span>
      <span>팔로잉 {{ followingCount }}명</span>
      <span class="arrow-icon">›</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const followerCount = ref(0) // API에서 받아오는 팔로워 수
const followingCount = ref(0) // API에서 받아오는 팔로잉 수

// 현재 날짜를 포맷팅
const formattedDate = ref(
  new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const goToFollowPage = () => {
  // 팔로우 관리 페이지로 이동하는 함수
}
</script>

<style scoped>
.follow-stats {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f6f6f6;
  font-family: 'NanumSquareRound', sans-serif;
}

.date-info {
  flex: 1;
  text-align: left;
  color: #333;
  font-size: 0.9rem;
}

.follow-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.follow-info span {
  color: #333;
  font-size: 0.9rem;
}

.arrow-icon {
  font-size: 1rem;
  color: #999;
}
</style>
