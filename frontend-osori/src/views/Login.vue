<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
    >
      <div>
        <h2
          class="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight"
        >
          로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          또는
          <a
            href="#"
            class="font-medium text-black hover:text-gray-800 transition-colors duration-200"
          >
            새 계정 만들기
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >이메일</label
            >
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="이메일을 입력하세요"
              @input="validateEmail"
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >비밀번호</label
            >
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded transition-all duration-200"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-black hover:text-gray-800 transition-colors duration-200"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            로그인
          </button>
        </div>
      </form>

      <div
        v-if="emailError"
        class="mt-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2"
        role="alert"
      >
        <p class="font-medium">{{ emailError }}</p>
      </div>

      <div
        v-if="message"
        class="mt-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2"
        role="alert"
      >
        <p class="font-medium">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      emailError: '' // 이메일 오류 메시지
    }
  },
  methods: {
    async login() {
      if (this.emailError) {
        return // 이메일 오류가 있을 경우 로그인 진행 안 함
      }
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/login',
          {
            email: this.email,
            password: this.password
          }
        )
        this.message = '' // 로그인 성공 시 메시지 초기화
        this.$router.push('/profile') // 로그인 후 프로필 페이지로 이동
      } catch (error) {
        this.message = '로그인 실패' // 에러 메시지 간소화
      }
    },
    validateEmail() {
      // 이메일 형식 검증
      const regex = /^[a-zA-Z0-9._%+-]+@dgu\.ac\.kr$/ // @dgu.ac.kr 도메인 검증
      if (!regex.test(this.email)) {
        this.emailError = '이메일은 @dgu.ac.kr 도메인을 사용해야 합니다.'
      } else {
        this.emailError = '' // 오류가 없을 경우 초기화
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>

<!-- <style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style> -->
