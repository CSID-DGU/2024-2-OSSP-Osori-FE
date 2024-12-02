<template>
  <div class="search-modal">
    <div class="search-bar">
      <input
        class="textinput"
        type="text"
        v-model="email"
        placeholder="친구의 이메일을 입력하세요"
      />
      <img
        src="../../../assets/images/plusBtn2.svg"
        class="search-icon"
        @click="followUser"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const followUser = async () => {
  if (!email.value.trim()) {
    alert("이메일을 입력하세요.")
    return
  }

  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/follows`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value.trim() }),
        credentials: 'include',
      }
    )

    if (response.ok) {
      alert("팔로우가 완료되었습니다.")
      email.value = '' 
    } else if (response.status === 404) {
      alert("사용자를 찾을 수 없습니다.")
    } else {
      alert("팔로우에 실패했습니다.")
    }
  } catch (error) {
    console.error("API 요청 오류:", error)
    alert("API 오류가 발생했습니다.")
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
</style>
