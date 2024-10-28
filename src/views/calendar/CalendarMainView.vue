<template>
  <div
    class="min-h-screen bg-[#FFF9F2] font-nanum-square-round flex justify-center relative"
  >
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <!-- 상단바 -->
      <MainHeader />

      <!-- 본문 내용 -->
      <main class="flex flex-col px-6 pt-20 pb-24" style="margin-top: 30px">
        <div class="mb-4 mx-4">
          <h2
            class="text-xl font-semibold text-gray-800 font-nanum-square-round mb-2"
          >
            {{ currentYear }} at 동국대학교
          </h2>
          <div class="flex items-center justify-between">
            <h3
              class="text-3xl font-bold text-gray-800 font-nanum-square-round"
            >
              {{ currentMonth }}월
            </h3>
            <div class="flex space-x-6">
              <!-- 화살표 버튼 -->
              <button @click="goToPrevMonth" class="text-2xl no-hover">
                ‹
              </button>
              <button @click="goToNextMonth" class="text-2xl no-hover">
                ›
              </button>
            </div>
          </div>
        </div>

        <!-- 캘린더 -->
        <div
          class="bg-[#FAE8DA] rounded-lg p-4 mb-4 flex flex-col items-center calendar-container mx-auto"
        >
          <div class="grid grid-cols-7 gap-4 text-center mb-4">
            <span
              v-for="day in DAY_LIST"
              :key="day"
              class="text-gray-500 text-sm"
              style="margin-right: 7px"
              >{{ day }}</span
            >
          </div>
          <div
            v-for="week in weekCalendarList"
            :key="week.toString()"
            class="flex w-full justify-between mb-1"
          >
            <button
              v-for="day in week"
              :key="day"
              class="flex flex-col items-center w-full h-8 justify-center rounded-lg"
              :class="{
                'text-[#17A1FA]': isSundayOrSaturday(day),
                'text-[#B3B3B3]': !isSundayOrSaturday(day) && day !== 0,
                'bg-[#FF7F00] text-white': day === selectedDay,
                invisible: day === 0
              }"
              style="font-size: 0.75rem; width: 2rem; height: 2rem; margin: 2px"
              @click="selectDay(day)"
            >
              <span>{{ day !== 0 ? day : '' }}</span>
              <span
                v-if="hasEvent(day)"
                class="bg-[#B3B3B3] w-1 h-1 rounded-full mt-1"
              ></span>
            </button>
          </div>
        </div>

        <!-- 학사 일정 목록 팝업 -->
        <div
          v-if="isScheduleOpen && selectedEvents.length > 0"
          class="schedule-popup fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 overflow-y-auto max-h-[60vh] w-[395px] mx-auto"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold font-nanum-square-round">학사 일정</h2>
            <button @click="closeSchedule" class="text-gray-500 text-lg">
              ✕
            </button>
          </div>
          <div
            v-for="(event, index) in selectedEvents"
            :key="index"
            class="mb-4 border-b border-gray-200 pb-4"
          >
            <div class="flex items-start">
              <div
                class="w-8 h-8 bg-[#FF7F00] rounded text-white flex items-center justify-center font-bold text-sm mr-4"
              >
                {{ selectedDay }}
              </div>
              <div>
                <p class="text-gray-700 font-nanum-square-round">
                  {{ event.title }}
                </p>
                <p class="text-sm text-gray-500 font-nanum-square-round">
                  {{ formatDateRange(event.startDate, event.endDate) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 링크 섹션 -->
        <div class="space-y-2">
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.url"
            class="block text-center py-2 bg-[#FFD9BB] text-black text-sm font-medium rounded-lg hover:bg-[#f1cdb1] transition-colors duration-300 no-underline font-nanum-square-round inner-shadow"
            target="_blank"
            style="max-width: 80%; margin: 0 auto; margin-bottom: 10px"
          >
            {{ link.text }}
            <ArrowRightIcon class="w-4 h-4 ml-2" />
          </a>
        </div>
      </main>

      <!-- 하단바 -->
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  DAY_LIST,
  currentDate,
  selectedDay,
  isScheduleOpen,
  currentYear,
  currentMonth,
  academicEvents,
  goToPrevMonth,
  goToNextMonth,
  weekCalendarList,
  selectDay,
  closeSchedule,
  isSundayOrSaturday,
  hasEvent,
  selectedEvents,
  formatDateRange,
  links
} from './CalendarMainScript.js'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'

// 페이지 로드 시 이번 달로 초기화
onMounted(() => {
  currentDate.value = new Date()
})
</script>

<style scoped>
.calendar-container {
  width: 100%;
}

.font-nanum-square-round {
  font-family: 'NanumSquareRound', sans-serif;
}

.schedule-popup {
  max-height: 60vh;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  width: 395px;
}

.highlighted-date {
  background-color: #ff7f00 !important;
  color: white !important;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
}

.inner-shadow {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-hover {
  transition: none;
  color: inherit;
}

.no-hover:hover {
  color: inherit;
}
</style>
