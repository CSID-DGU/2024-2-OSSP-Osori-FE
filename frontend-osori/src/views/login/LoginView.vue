<template>
  <div class="app">
    <!-- 로고 페이지 -->
    <div v-if="showLogo" class="logo-page">
      <img src="@/assets/logo.png" alt="로고" />
    </div>

    <!-- 로그인 페이지 -->
    <div v-else>
      <!-- 상단바 -->
      <header class="header">
        <h1>로그인 페이지</h1>
      </header>

      <!-- 본문 내용 -->
      <main class="main-content">
        <form @submit.prevent="onSubmit">
          <div>
            <label for="email">이메일</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="이메일 입력"
              @input="validateEmail"
              :class="{ invalid: !isEmailValid && email !== '' }"
              required
            />
            <p v-if="!isEmailValid && email !== ''" class="error">
              반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
            </p>
          </div>
          <div>
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div class="button-group">
            <button type="submit">로그인</button>
            <button @click="goToSignup" type="button">회원가입</button>
          </div>
        </form>
      </main>

      <!-- 하단바 -->
      <footer class="footer">
        <p>© 2024 My App</p>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      isEmailValid: true,
      showLogo: true // 로고를 보여줄지 여부
    }
  },
  mounted() {
    // 2초 후 로고 페이지에서 로그인 페이지로 전환
    setTimeout(() => {
      this.showLogo = false
    }, 2000) // 2000ms = 2초
  },
  methods: {
    ...mapActions(['login']), // Vuex의 login action 매핑

    validateEmail() {
      // 이메일이 반드시 @dgu.ac.kr 로 끝나도록 체크
      const emailDomain = '@dgu.ac.kr'
      if (this.email.endsWith(emailDomain)) {
        this.isEmailValid = true
      } else {
        this.isEmailValid = false
      }
    },
    async onSubmit() {
      if (!this.isEmailValid) {
        alert('유효하지 않은 이메일 도메인입니다.')
        return
      }

      try {
        // 로그인 API 호출
        const response = await axios.post(
          'http://localhost:8082/api/users/login',
          {
            email: this.email,
            password: this.password
          }
        )

        // 로그인 성공 처리
        if (response.status === 200) {
          const userData = response.data // 서버에서 받은 사용자 데이터

          // Vuex에 로그인된 사용자 정보 저장
          this.login(userData)

          alert('로그인 성공!')
          // 로그인 성공 후 페이지 이동 등의 추가 로직
        }
      } catch (error) {
        // 로그인 실패 처리
        if (error.response && error.response.status === 401) {
          alert('이메일 또는 비밀번호가 잘못되었습니다.')
        } else {
          alert('로그인 중 오류가 발생했습니다.')
        }
      }
    },
    goToSignup() {
      // 회원가입 페이지로 이동
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.logo-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo-page img {
  width: 150px; /* 로고 크기 조정 */
}

.header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.main-content {
  padding: 1rem;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.invalid {
  border: 2px solid red;
}

.error {
  color: red;
}

.footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 1rem;
}
</style>
