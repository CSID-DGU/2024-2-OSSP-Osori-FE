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

          <ul
            v-if="goals.length > 0"
            class="relative p-4 space-y-3 bg-white rounded-lg"
          >
            <div class="flex items-center justify-between">
              <!-- 타이틀 -->
              <h2
                class="relative inline-block px-2 mb-2 text-sm font-semibold font-nanum-square-round"
                style="
                  background-color: white;
                  position: absolute;
                  top: -15px;
                  left: 16px;
                  padding-left: 10px;
                  padding-right: 10px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                "
              >
                나의 아코자국들
              </h2>

              <!-- 더보기 버튼 -->
              <button
                @click="toggleExpand"
                class="relative inline-block px-2 mb-2 text-sm font-semibold font-nanum-square-round"
                style="
                  background-color: white;
                  position: absolute;
                  top: -15px;
                  right: 16px;
                  padding-left: 10px;
                  padding-right: 10px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  cursor: pointer;
                "
              >
                {{ isExpanded ? '접기' : '더보기' }}
              </button>
            </div>
            <!-- 목표 리스트 -->
            <li
              v-for="(goal, index) in goals"
              :key="index"
              class="flex items-center justify-between"
            >
              <!-- 날짜 부분: 주황색 정사각형 -->
              <p
                class="flex-shrink-0 p-1 mr-2 text-center rounded-sm text-xxs font-nanum-square-round"
                style="
                  background-color: #ff7f00;
                  color: white;
                  width: 30px;
                  height: 30px;
                "
              >
                {{ formatDate2(goal.createdAt) }}
              </p>

              <!-- 목표 내용 부분 -->
              <p
                class="flex-grow ml-3 text-sm text-left font-nanum-square-round"
              >
                {{ goal.content }}
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
                @click="saveProfile"
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
import { ref, computed, onMounted } from 'vue'
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

const goals = ref([]) // 목표 데이터
const isExpanded = ref(false) // 더보기 상태 관리
const maxVisibleGoals = 3 // 기본 표시할 목표 수

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

// 더보기 상태에 따른 표시할 목표 계산
const displayedGoals = computed(() => {
  return isExpanded.value ? goals.value : goals.value.slice(0, maxVisibleGoals)
})

// 날짜 형식 포맷 (MM.DD 형식)
const formatDate2 = (date) => {
  const options = { month: '2-digit', day: '2-digit' }
  return new Date(date).toLocaleDateString('ko-KR', options).replace(/\//g, '.')
}

// 접기/더보기 상태 토글
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 프로필 저장
const saveProfile = () => {
  const profileData = {
    name: user.name,
    email: user.email,
    nickname: user.nickname,
    studentNumber: user.studentNumber,
    major: user.major,
    introduce: user.introduce
  }
  updateProfile(profileData)
}
</script>
