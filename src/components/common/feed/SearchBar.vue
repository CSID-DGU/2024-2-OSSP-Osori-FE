<template>
  <div class="search-modal">
    <div class="search-bar">
      <input class="textinput"
        type="text"
        v-model="email"
        placeholder="친구의 이메일을 입력하세요"
      />
      <img src="../../../assets/images/search.svg" class="search-icon" @click="searchFriend" />
    </div>

    <!-- 검색 결과 리스트 -->
    <div class="search-results" v-if="searched && searchResults.length > 0">
      <div v-for="user in searchResults" :key="user.id" class="user-item">
        <span>{{ user.email }}</span>
        <button
          :class="{'following': user.isFollowing}"
          :disabled="user.isFollowing"
          @click="followUser(user)"
        >
          {{ user.isFollowing ? '팔로우' : '팔로우' }}
        </button>
      </div>
    </div>

    <!-- 검색 결과가 없을 경우 -->
    <div v-if="searched && searchResults.length === 0" class="no-results">
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 임시 데이터
const email = ref('')
const allUsers = [
  { id: 1, nickname: '홍길동', email: 'hong', isFollowing: false },
  { id: 2, nickname: '김철수', email: 'kim', isFollowing: true },
  { id: 3, nickname: '박영희', email: 'park@dgu.ac.kr', isFollowing: false },
  { id: 4, nickname: '이민호', email: 'lee@example.com', isFollowing: false },
  { id: 5, nickname: '최지우', email: 'choi@example.com', isFollowing: true },
  { id: 6, nickname: '장동건', email: 'jang@example.com', isFollowing: false },
  { id: 7, nickname: '송혜교', email: 'pong@example.com', isFollowing: true },
  { id: 8, nickname: '박보검', email: 'parkbo@dgu.ac.kr', isFollowing: true }
]
const searchResults = ref([])
const searched = ref(false)

const searchFriend = async () => {
  searched.value = false // 검색 시작 전에 결과를 비워두기 위해 false로 설정

  // 이메일 입력이 없으면 결과를 초기화하고 반환
  if (!email.value) {
    searchResults.value = []
    searched.value = true
    return
  }

  // 이메일이 있을 경우 해당 이메일을 가진 사용자만 필터링 (완전 일치 검색)
  searchResults.value = allUsers.filter(user => user.email === email.value)
  searched.value = true // 검색 완료 후 결과 표시
}


const followUser = async (user) => {
  user.isFollowing = true
}
</script>

<style scoped>
.search-modal {
  width: 100%;
  padding: 0 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NaR';
}

.textinput {
  background-color: white;
  outline: none;
  border: none; 
  box-shadow: none; 
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #FFFFFF;
  padding: 5px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
}

.search-bar input::placeholder {
  color: #878282;
}

.search-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.search-results {
  width: 100%;
  margin-top: 10px;
  font-family: 'NaR';
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  font-family: 'NaR';
}

.user-item span {
  font-size: 14px;
  color: #333;
}

.user-item button {
  background-color: #ff9100;
  color: #fff;
  font-family: 'NaR';
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-item button.following {
  background-color: #d9d9d9;
  color: #666;
  cursor: default;
}

.user-item button:not(.following):hover {
  background-color: #ff7300;
}

.no-results {
  color: #878282;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
