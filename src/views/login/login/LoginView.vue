<template>
  <div class="login-page page-container">
    <div class="mobile-container" style="font-family: NaR, sans-serif">
      <!-- 로고 로딩 화면 -->
      <LogoLoading
        v-if="showLoading"
        @fade-complete="showLoading = false"
        class="absolute top-0 left-0 w-full h-full"
      />

      <!-- 로그인 페이지 -->
      <div v-else>
        <MainHeader />

        <main class="main-content">
          <h1
            class="title"
            style="font-family: NaB, sans-serif; letter-spacing: 5px"
          >
            로그인
          </h1>
          <form @submit.prevent="onSubmit" class="form">
            <div class="form-group">
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
              <p v-if="!isEmailValid && email !== ''" class="error-message">
                반드시 @dgu.ac.kr 이메일을 사용해야 합니다.
              </p>
            </div>

            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="비밀번호 입력"
                required
              />
            </div>

            <div class="form-actions">
              <button
                type="submit"
                class="submit-button"
                style="margin-top: 10px"
              >
                로그인
              </button>
            </div>
          </form>
          <button @click="$router.push('/auth/signup')" class="signup-button">
            회원가입
          </button>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import LogoLoading from '@/components/LogoLoading.vue'
import LoginScript from './LoginScript.js'
import MainHeader from '@/components/layout/Header.vue'

export default {
  components: {
    LogoLoading,
    MainHeader
  },
  data() {
    return {
      showLoading: true,
      email: '',
      password: '',
      isEmailValid: true
    }
  },
  methods: {
    ...LoginScript.methods,
    validateEmail() {
      this.isEmailValid = this.email.endsWith('@dgu.ac.kr')
    },
    onSubmit() {
      this.validateEmail()
      LoginScript.methods.onSubmit.call(this)
    }
  }
}
</script>

<style scoped>
/* login-page 네임스페이스로 스타일 제한 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff9f2;
}

/* 모바일 컨테이너 */
.mobile-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 헤더 */
.header {
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 395px;
  min-width: 340px;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 3rem;
}

.signup-button {
  color: #000000;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  margin-top: -10px;
}

.signup-button:hover {
  background-color: rgba(246, 184, 122, 0.1);
}

/* 메인 컨텐츠 */
.main-content {
  margin-top: 130px;
  flex-grow: 1;
  padding: 4rem 3rem 2rem;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  font-family: NaB, sans-serif;
}

/* 폼 */
.form {
  margin: 2rem auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #ddd7d3;
  border: 1px solid #e5e5e5;
  border-radius: 9999px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  max-width: 340px;
}

.form-group input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #f6b87a;
}

.form-group input.invalid {
  border-color: #ff6b6b;
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ff6b6b;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* 버튼 */
.submit-button {
  width: 100%;
  max-width: 10rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  background-color: #f6b87a;
  color: #000000;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 9999px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-family: 'NaB';
}

.submit-button:hover {
  background-color: #e5a769;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.signup-button {
  display: block;
  margin: 0 auto 0;
  padding: 0.25rem 0.5rem;
  color: #000000;
  background-color: transparent;
  border-radius: 9999px;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: -10px;
}

.signup-button:hover {
  background-color: rgba(246, 184, 122, 0.1);
}
</style>
