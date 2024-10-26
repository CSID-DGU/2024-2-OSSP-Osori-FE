<template>
  <div
    class="min-h-screen bg-[#FFF9F2] font-nanum-square-round flex justify-center"
  >
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <MainHeader />

      <!-- 본문 내용 -->
      <main class="flex flex-col px-6 pt-20 pb-24" style="margin-top: 30px">
        <div class="text-left mb-4">
          <h1 class="text-xl font-bold text-gray-800 font-nanum-square-round">
            {{ currentYear }} at 동국대학교
          </h1>
        </div>

        <!-- 캘린더 -->
        <div
          class="bg-[#FAE8DA] rounded-lg p-4 mb-4 flex justify-center items-center calendar-container"
        >
          <v-calendar
            title-position="left"
            expanded
            transparent
            borderless
            v-model="selectedDate"
            is-expanded
            :attributes="calendarAttributes"
            :color="selectedColor"
            class="custom-calendar font-nanum-square-round"
            @dayclick="onDateSelect"
          ></v-calendar>
        </div>

        <!-- 학사 일정 목록 -->
        <div
          v-if="selectedEvents.length > 0"
          class="bg-white rounded-lg p-4 mb-4"
        >
          <h2 class="text-lg font-bold mb-2 font-nanum-square-round">
            선택한 날짜의 학사 일정
          </h2>
          <ul>
            <li
              v-for="(event, index) in selectedEvents"
              :key="index"
              class="mb-2"
            >
              <p class="text-gray-700 font-nanum-square-round">
                <strong>{{ event.title }}</strong>
              </p>
              <p class="text-sm text-gray-500 font-nanum-square-round">
                {{ formatDateRange(event.startDate, event.endDate) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- 링크 섹션 -->
        <div class="space-y-2">
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.url"
            class="block text-center py-3 bg-[#F6B87A] text-white text-sm font-medium rounded-full hover:bg-[#e5a769] transition-colors duration-300 no-underline font-nanum-square-round"
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

const currentDate = new Date()
const currentYear = format(currentDate, 'yyyy')
const currentMonth = format(currentDate, 'MM')

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

const selectedDate = ref(new Date())
const selectedColor = ref('#F6B87A')

const onDateSelect = (day) => {
  selectedDate.value = day.date
}

const selectedEvents = computed(() => {
  return academicEvents.value.filter((event) =>
    isWithinInterval(selectedDate.value, {
      start: parseISO(event.startDate),
      end: parseISO(event.endDate)
    })
  )
})

const calendarAttributes = computed(() => {
  return academicEvents.value.map((event) => ({
    key: event.AcademicEventId,
    dates: { start: parseISO(event.startDate), end: parseISO(event.endDate) },
    customData: { title: event.title },
    popover: {
      label: event.title
    },
    highlight: {
      backgroundColor: '#FF7F00',
      contentColor: '#ffffff'
    }
  }))
})

const formatDateRange = (startDate, endDate) => {
  const start = format(parseISO(startDate), 'yyyy-MM-dd')
  const end = format(parseISO(endDate), 'yyyy-MM-dd')
  return start === end ? start : `${start} ~ ${end}`
}

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
  font-family: 'NanumSquareRound', sans-serif;
  --vc-bg-light-900: #ff7f00;
  --vc-bg-light-800: #e65c00;
  --vc-border-radius: 0.5rem;
  --vc-border-width: 0;
}

.calendar-container {
  font-family: 'NanumSquareRound', sans-serif;
  height: 400px; /* 캘린더 높이 축소 */
}

.font-nanum-square-round {
  font-family: 'NanumSquareRound', sans-serif;
}

.custom-calendar :deep(.vc-pane, .vc-header, .vc-weeks, .vc-day) {
  border: none;
  box-shadow: none;
}
</style>
