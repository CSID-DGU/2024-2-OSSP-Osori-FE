<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <!-- <header
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
      </header> -->
      <MainHeader />

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
            :attributes="calendarAttributes"
            :color="selectedColor"
            class="custom-calendar"
            @dayclick="onDateSelect"
          ></v-calendar>
        </div>

        <!-- 학사 일정 목록 -->
        <div
          v-if="selectedEvents.length > 0"
          class="bg-white rounded-lg shadow-sm p-4"
        >
          <h2 class="text-lg font-bold mb-4">선택한 날짜의 학사 일정</h2>
          <ul>
            <li
              v-for="(event, index) in selectedEvents"
              :key="index"
              class="mb-2"
            >
              <p class="text-gray-700">
                <strong>{{ event.title }}</strong>
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDateRange(event.startDate, event.endDate) }}
              </p>
            </li>
          </ul>
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
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format, isWithinInterval, parseISO } from 'date-fns'
import 'v-calendar/dist/style.css'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'

// 현재 날짜를 기준으로 연도와 월을 가져옴
const currentDate = new Date()
const currentYear = format(currentDate, 'yyyy')
const currentMonth = format(currentDate, 'MM')

// 학사 일정 데이터 (예시 데이터)
const academicEvents = ref([
  {
    AcademicEventId: 1,
    title: '개강일',
    startDate: '2024-03-01',
    endDate: '2024-03-01'
  },
  {
    AcademicEventId: 2,
    title: '종강일',
    startDate: '2024-06-30',
    endDate: '2024-06-30'
  },
  {
    AcademicEventId: 3,
    title: '중간고사',
    startDate: '2024-04-15',
    endDate: '2024-04-19'
  },
  {
    AcademicEventId: 4,
    title: '기말고사',
    startDate: '2024-06-15',
    endDate: '2024-06-19'
  }
])

const selectedDate = ref(new Date()) // 달력에서 선택된 날짜
const selectedColor = ref('#F6B87A') // 선택된 날짜의 색상

// 날짜 선택 시 호출되는 함수
const onDateSelect = (day) => {
  selectedDate.value = day.date
}

// 선택된 날짜에 해당하는 이벤트 필터링
const selectedEvents = computed(() => {
  return academicEvents.value.filter((event) =>
    isWithinInterval(selectedDate.value, {
      start: parseISO(event.startDate),
      end: parseISO(event.endDate)
    })
  )
})

// 캘린더에 이벤트 데이터를 표시하기 위한 속성 (일정 있는 날에 배경색 표시)
const calendarAttributes = computed(() => {
  return academicEvents.value.map((event) => ({
    key: event.AcademicEventId,
    dates: { start: parseISO(event.startDate), end: parseISO(event.endDate) },
    customData: { title: event.title },
    popover: {
      label: event.title
    },
    // 일정이 있는 날에 대한 진한 주황색 배경 설정
    highlight: {
      backgroundColor: '#FF7F00', // 진한 주황색 배경
      contentColor: '#ffffff' // 텍스트 색상
    }
  }))
})

// 날짜 범위 형식으로 변환하는 함수
const formatDateRange = (startDate, endDate) => {
  const start = format(parseISO(startDate), 'yyyy-MM-dd')
  const end = format(parseISO(endDate), 'yyyy-MM-dd')
  return start === end ? start : `${start} ~ ${end}`
}

// 외부 링크 (예시 데이터)
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
  --vc-bg-light-900: #ff7f00; /* 커스텀 색상 */
  --vc-bg-light-800: #e65c00;
  --vc-border-radius: 0.5rem; /* 둥근 테두리 */
  --vc-border-width: 0; /* 캘린더 전체 테두리 제거 */
}

/* 각 날짜 셀에 적용된 테두리 제거 */
.custom-calendar :deep(.vc-pane, .vc-header, .vc-weeks, .vc-day) {
  border: none;
  box-shadow: none;
}
</style>
