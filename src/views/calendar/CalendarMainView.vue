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
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ currentYear }} at 동국대학교 {{ currentMonth }}월
          </h1>
        </div>

        <!-- 캘린더 -->
        <div
          class="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-center items-center"
        >
          <v-calendar
            title-position="left"
            expanded
            borderless
            v-model="selectedDate"
            is-expanded
            :attributes="[]"
            :color="selectedColor"
            class="custom-calendar"
          ></v-calendar>
        </div>

        <!-- 링크 섹션 -->
        <div class="space-y-4">
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.url"
            class="block text-center py-3 bg-[#F6B87A] text-white text-sm font-medium rounded-full shadow hover:bg-[#e5a769] transition-colors duration-300 no-underline"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </main>

      <!-- 하단바 -->
      <footer></footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import 'v-calendar/dist/style.css'

// 현재 날짜를 기준으로 연도와 월을 가져옴
const currentDate = new Date()
const currentYear = format(currentDate, 'yyyy')
const currentMonth = format(currentDate, 'MM')

const selectedDate = ref(new Date()) // 달력에서 선택된 날짜
const selectedColor = ref('#F6B87A') // 선택된 날짜의 색상

const links = [
  {
    text: '동국대학교 홈페이지 바로가기',
    url: 'https://www.dongguk.edu/main'
  },
  {
    text: '동국대학교 학사일정 바로가기',
    url: 'https://www.dongguk.edu/schedule/detail?schedule_info_seq=22'
  },
  {
    text: 'ndrims 바로가기',
    url: 'https://ndrims.dongguk.edu/unis/index.do'
  }
]
</script>

<style scoped>
.custom-calendar {
  --vc-bg-light-900: #f6b87a; /* 커스텀 색상 */
  --vc-bg-light-800: #e5a769;
  --vc-border-radius: 0.5rem; /* 둥근 테두리 */
  --vc-border-width: 0; /* 캘린더 전체 테두리 제거 */
}

/* 각 날짜 셀에 적용된 테두리 제거 */
.custom-calendar :deep(.vc-pane, .vc-header, .vc-weeks, .vc-day) {
  border: none;
  box-shadow: none;
}
</style>
