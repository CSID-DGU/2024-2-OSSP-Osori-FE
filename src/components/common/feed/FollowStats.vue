<template>
  <div class="follow-stats" @click="goToFollowPage">
    <div class="date-info">{{ formattedDate }}</div>
    <div class="follow-info">
      <span class="follower-text">팔로워</span> 
      <span class="follower-count">{{ followerCount }}명</span>
      <span class="following-text">팔로잉</span>
      <span class="following-count">{{ followingCount }}명</span>
      <img class='na' src="../../../assets/images/next.svg" alt="Next" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const followerCount = ref(0) // API에서 받아오는 팔로워 수
const followingCount = ref(0) // API에서 받아오는 팔로잉 수

// 현재 날짜를 포맷팅
const formattedDate = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year} . ${month} . ${day}`;
});

const router = useRouter()

const goToFollowPage = () => {
  router.push('/feed/ako-stamp-follow') // 팔로우 관리 페이지로 이동
}
</script>

<style scoped>
.follow-stats {
  display: flex;
  align-items: center;
  width: 100%;
  height: 37px;
  padding: 8px;
  border-radius: 10px;
  background: #FFF;
}

.date-info {
  flex: 1;
  text-align: left;
  color: #FF7F00; /* 날짜 색상 */
  font-family: 'NaR';
  font-size: 0.9rem;
  padding-left: 5px;
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

.follower-text,
.following-text {
  color: #000;
  font-family: 'NaR';
  font-size: 15px;
  font-weight: 300;
  line-height: normal;
}

.follower-count,
.following-count {
  color: #000;
  font-family: 'NaB';
  font-size: 15px;
  font-weight: 400;
  line-height: normal;
}

.na{
  cursor: pointer;
}
</style>