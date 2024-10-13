<template>
  <div
    class="min-h-screen bg-[#333333] flex items-center justify-center font-nanumSquareRound"
  >
    <div class="w-full max-w-md h-[844px] relative overflow-hidden">
      <!-- Mobile frame -->
      <div class="absolute inset-0 bg-[#FAE8DA] overflow-hidden">
        <!-- Top white area with logo -->
        <div class="flex items-center h-16 px-4 bg-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ako%20ming-5vJmEg5PbbIv4TIaUPDPQX1osOxkc0.svg"
            alt="Ako ming"
            class="h-12"
          />
        </div>

        <!-- Main content area -->
        <div class="h-[calc(100%-8rem)] overflow-y-auto px-6 py-8">
          <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-black">회원가입</h1>
          </div>

          <form
            @submit.prevent="completeSignup"
            class="max-w-xs mx-auto space-y-6"
          >
            <div class="space-y-2">
              <label
                for="realName"
                class="block text-sm font-medium text-[#7C7C7C]"
                >실명</label
              >
              <input
                v-model="realName"
                id="realName"
                type="text"
                required
                class="w-full px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                placeholder="실명을 입력하세요"
              />
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-[#7C7C7C]"
                >이메일</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  required
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  type="button"
                  @click="sendVerificationCode"
                  class="px-3 py-2 bg-[#F6B87A] text-white rounded-full text-sm font-semibold hover:bg-[#E5A769] transition duration-300"
                >
                  인증하기
                </button>
              </div>
            </div>

            <div v-if="showVerificationField" class="space-y-2">
              <label
                for="verificationCode"
                class="block text-sm font-medium text-[#7C7C7C]"
                >인증번호</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="verificationCode"
                  id="verificationCode"
                  type="text"
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                  placeholder="인증번호를 입력하세요"
                />
                <button
                  type="button"
                  @click="verifyCode"
                  class="px-3 py-2 bg-[#F6B87A] text-white rounded-full text-sm font-semibold hover:bg-[#E5A769] transition duration-300"
                >
                  인증확인
                </button>
              </div>
            </div>

            <transition name="fade">
              <p
                v-if="verificationSuccess"
                class="text-[#F49C44] text-sm mt-1 bg-[#FFF5E6] p-2 rounded-md shadow-md"
              >
                인증이 완료되었습니다!
              </p>
            </transition>

            <div class="space-y-2">
              <label
                for="password"
                class="block text-sm font-medium text-[#7C7C7C]"
                >비밀번호</label
              >
              <input
                v-model="password"
                id="password"
                type="password"
                required
                class="w-full px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div class="space-y-2">
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-[#7C7C7C]"
                >비밀번호 확인</label
              >
              <input
                v-model="confirmPassword"
                id="confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                placeholder="비밀번호를 다시 입력하세요"
              />
              <transition name="fade">
                <p
                  v-if="passwordMismatch"
                  class="text-[#C83838] text-sm mt-1 bg-[#FFE5E5] p-2 rounded-md shadow-md"
                >
                  비밀번호가 동일하지 않습니다!
                </p>
              </transition>
            </div>

            <div class="space-y-2">
              <label
                for="nickname"
                class="block text-sm font-medium text-[#7C7C7C]"
                >닉네임</label
              >
              <input
                v-model="nickname"
                id="nickname"
                type="text"
                required
                class="w-full px-3 py-2 bg-[#DDD7D3] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A]"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <button
              type="submit"
              class="w-full py-2 px-4 bg-[#F6B87A] text-white rounded-full text-sm font-semibold hover:bg-[#E5A769] transition duration-300"
            >
              가입하기
            </button>
          </form>

          <div
            v-if="message"
            class="max-w-xs p-3 mx-auto mt-4 text-sm text-center rounded-lg"
            :class="messageClass"
          >
            {{ message }}
          </div>
        </div>

        <!-- Bottom navigation bar -->
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navigation from '@/components/layout/Navigation.vue'

const router = useRouter()
const realName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const nickname = ref('')
const message = ref('')
const passwordMismatch = ref(false)
const showVerificationField = ref(false)
const verificationCode = ref('')
const verificationSuccess = ref(false)

const messageClass = computed(() => {
  return message.value.includes('완료')
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700'
})

watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
  passwordMismatch.value =
    newPassword !== newConfirmPassword && newConfirmPassword !== ''
})

const sendVerificationCode = async () => {
  // Implement the logic to send verification code
  showVerificationField.value = true
}

const verifyCode = async () => {
  // Implement the logic to verify the code
  verificationSuccess.value = true
  setTimeout(() => {
    verificationSuccess.value = false
  }, 3000)
}

const completeSignup = async () => {
  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/api/users/signup',
      {
        realName: realName.value,
        email: email.value,
        password: password.value,
        nickname: nickname.value
      }
    )
    message.value = '회원가입이 완료되었습니다!'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    message.value = '회원가입 실패: ' + (error.response?.data || error.message)
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/nanum-square-round@1.0.0/nanumsquareround.css');

:root {
  font-family: 'NanumSquareRound', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-y-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

input::placeholder {
  color: #5f5454;
}

.font-nanumSquareRound {
  font-family: 'NanumSquareRound', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
