<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <header
        class="bg-white shadow-sm py-3 px-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-[395px] min-w-[340px] z-10"
      >
        <div class="flex items-center justify-between">
          <img src="@/assets/images/Akoming.svg" alt="로고" class="h-8" />
          <button
            class="text-[#F6B87A] hover:bg-[#F6B87A] hover:bg-opacity-10 px-2 py-1 rounded-full transition-colors duration-300 text-sm"
          >
            마이페이지
          </button>
        </div>
      </header>

      <!-- 본문 내용 -->
      <main class="flex flex-col px-6 pt-20 pb-24">
        <!-- 오늘 날짜와 문구 -->
        <div class="mb-6 text-center">
          <p class="mb-2 text-lg text-gray-600">{{ currentDate }}</p>
          <p class="text-2xl font-bold text-gray-800">
            <span class="text-[#F6B87A]">{{ nickname }}</span
            >님, 오늘도 성장해요!
          </p>
        </div>

        <!-- 문구 입력란 -->
        <div class="mb-6">
          <textarea
            v-model="userText"
            placeholder="오늘의 문구를 적어주세요"
            maxlength="50"
            rows="3"
            class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200 resize-none"
          ></textarea>
          <p class="mt-1 text-sm text-right text-gray-500">
            {{ userText.length }}/50
          </p>
        </div>

        <!-- 등록하기 버튼 -->
        <div class="flex justify-center">
          <button
            @click="registerGoal"
            class="w-full max-w-xs px-4 py-3 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300"
          >
            등록하기
          </button>
        </div>
      </main>

      <!-- 하단바 -->
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import MainFooter from '@/components/layout/Footer.vue'

const currentDate = ref(
  new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)
const nickname = ref('닉네임')
const userText = ref('')

// 사용자 ID는 예시로 '1'을 사용하지만, 실제로는 로그인된 사용자 정보를 통해 가져와야 함
const userId = 1

const registerGoal = async () => {
  if (userText.value.trim() !== '') {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BE_API_URL}/api/goals`,
        {
          userId: userId, // 사용자 ID
          content: userText.value // 목표 내용
        }
      )
      alert(`목표가 등록되었습니다: ${response.data.content}`)
      userText.value = '' // 입력창 초기화
    } catch (error) {
      console.error('목표 등록 오류:', error)
      alert('목표 등록에 실패했습니다. 다시 시도해주세요.')
    }
  } else {
    alert('문구를 입력해주세요.')
  }
}
</script>
