<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
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
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="이메일을 입력하세요"
              @input="validateEmail"
            />
          </div>
          <div class="mt-4">
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
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
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
              class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-black hover:text-gray-800">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
          >
            로그인
          </button>
        </div>
      </form>

      <div v-if="emailError" class="mt-2 text-sm text-red-600" role="alert">
        {{ emailError }}
      </div>

      <div v-if="message" class="mt-2 text-sm text-red-600" role="alert">
        {{ message }}
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
