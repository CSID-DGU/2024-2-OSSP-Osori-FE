<template>
  <div class="min-h-screen bg-[#FFF9F2] font-nanum flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <MainHeader />

      <!-- 본문 내용 -->
      <main class="flex flex-col px-12 pt-16 pb-24 overflow-y-auto">
        <section class="mt-9">
          <h1 class="mb-4 text-xl font-bold font-nanum-square-round">
            <span class="text-2xl font-nanum-square-round">{{
              user.nickname
            }}</span>
            님의 <br />마이페이지
          </h1>

          <h2 class="mb-2 text-lg font-semibold font-nanum-square-round">
            나의 아코자국들
          </h2>
          <ul v-if="goals.length > 0" class="space-y-3">
            <li
              v-for="(goal, index) in goals"
              :key="index"
              class="p-3 bg-white rounded-lg"
            >
              <p class="text-sm font-nanum-square-round">{{ goal.content }}</p>
              <p class="text-xs text-gray-500">
                {{ formatDate(goal.createdAt) }}
              </p>
            </li>
          </ul>
          <p v-else class="text-sm font-nanum-square-round">
            아직 목표 기록이 없습니다.
          </p>
        </section>

        <section class="mt-8">
          <h2 class="mb-2 text-lg font-semibold font-nanum-square-round"></h2>
          <div class="space-y-4">
            <!-- 실명 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >실명</label
              >
              <input
                type="text"
                v-model="user.name"
                readonly
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <!-- 이메일 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >이메일</label
              >
              <input
                type="email"
                v-model="user.email"
                readonly
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <!-- 닉네임 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >닉네임</label
              >
              <input
                type="text"
                v-model="user.nickname"
                placeholder="닉네임을 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <!-- 현재 비밀번호 확인 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >현재 비밀번호 확인</label
              >
              <div class="flex space-x-2">
                <input
                  type="password"
                  v-model="currentPassword"
                  style="height: 37.6px"
                  placeholder="현재 비밀번호를 입력하세요"
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
                />
                <button
                  @click="verifyCurrentPassword"
                  class="px-3 py-2 bg-[#F6B87A] text-black text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
                  style="height: 37.6px"
                >
                  확인하기
                </button>
              </div>
            </div>

            <!-- 새 비밀번호와 확인 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >새 비밀번호</label
              >
              <input
                type="password"
                v-model="password"
                placeholder="새 비밀번호를 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >새 비밀번호 확인</label
              >
              <div class="flex space-x-2">
                <input
                  type="password"
                  v-model="confirmPassword"
                  style="height: 37.6px"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  class="flex-grow px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
                />
                <button
                  style="height: 37.6px"
                  @click="updatePassword"
                  class="px-3 py-2 bg-[#F6B87A] text-black text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
                >
                  수정하기
                </button>
              </div>
            </div>

            <!-- 학번과 학과 -->
            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >학번</label
              >
              <input
                type="text"
                v-model="user.studentNumber"
                placeholder="학번을 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>

            <div class="space-y-1">
              <label
                class="block text-sm font-medium text-gray-700 font-nanum-square-round"
                >학과</label
              >
              <input
                type="text"
                v-model="user.major"
                placeholder="학과를 입력하세요"
                class="w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200"
              />
            </div>
            <div style="text-align: center">
              <button
                @click="updateProfile"
                style="width: 160px; margin-top: 20px"
                class="w-full px-4 py-2 bg-[#F6B87A] text-black text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
              >
                저장하기
              </button>
            </div>
          </div>
        </section>
      </main>

      <!-- 하단바 -->
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
// 사용자 정보 및 목표 데이터
import {
  user,
  password,
  confirmPassword,
  currentPassword,
  passwordVerified,
  handleLogout,
  fetchUser,
  verifyCurrentPassword,
  updatePassword,
  updateProfile
} from './MypageScript.js'

const goals = ref([])

// 목표 기록 가져오기
const fetchGoals = async () => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_BE_API_URL}/api/goals`,
      { withCredentials: true }
    )
    goals.value = response.data
  } catch (error) {
    console.error('목표 기록을 가져오는 데 실패했습니다.', error)
    // 데이터 가져오기에 실패할 경우 임시 데이터 설정
    goals.value = [
      { content: '기본 목표 1', createdAt: '2024-10-01' },
      { content: '기본 목표 2', createdAt: '2024-10-15' },
      { content: '기본 목표 3', createdAt: '2024-11-05' }
    ]
  }
}

// 페이지 마운트 시 목표 기록 가져오기
onMounted(() => {
  fetchGoals()
})

// 날짜 형식 포맷
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('ko-KR', options)
}
</script>

<style scoped></style>
