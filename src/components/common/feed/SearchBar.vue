<template>
  <div class="search-modal">
    <div class="search-bar">
      <input class="textinput"
        type="text"
        v-model="email"
        placeholder="친구의 이메일을 입력하세요"
      />
      <img src="../../../assets/images/plusBtn2.svg" class="search-icon" @click="searchFriend" />
    </div>

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

    <div v-if="searched && searchResults.length === 0" class="no-results">
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const searchResults = ref([])
const searched = ref(false)

const searchFriend = async () => {
  searched.value = false 

  if (!email.value) {
    searchResults.value = []
    searched.value = true
    return
  }

  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/follow`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }), 
        credentials: 'include' 
      }
    )

    if (response.ok) {
      const data = await response.json() 
      searchResults.value = data.users
      searched.value = true
    } else {
      alert("검색 결과가 없습니다.")
      searchResults.value = []
      searched.value = true
    }
  } catch (error) {
    alert("API 오류")
    console.error('API 요청 오류:', error)
    searched.value = true
  }
}

const followUser = async (user) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_BE_API_URL}/api/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user.id }), 
      credentials: 'include'
    })

    if (response.ok) {
      user.isFollowing = true
    } else {
      alert('팔로우 실패')
    }
  } catch (error) {
    console.error('팔로우 요청 오류:', error)
    alert('팔로우 요청에 실패했습니다.')
  }
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
  width: 24px;
  height: 24px;
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
