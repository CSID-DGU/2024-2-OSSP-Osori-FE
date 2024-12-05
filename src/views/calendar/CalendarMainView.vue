<script setup>
import { ref, onMounted } from 'vue'
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
  links,
  fetchAcademicEvents
} from './CalendarMainScript.js'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'

onMounted(() => {
  currentDate.value = new Date()
  selectedDay.value = new Date().getDate()
  fetchAcademicEvents()
})
</script>

<template>
  <div class="page-container">
    <div
      class="inner-container"
      style="margin-top: 60px; font-family: 'NanumSquareRound', sans-serif"
    >
      <MainHeader />
      <div class="main-content">
        <div>
          <h2
            class="section-title"
            style="font-family: 'NanumSquareRound', sans-serif"
          >
            {{ currentYear }} at 동국대학교
          </h2>
          <div class="flex items-center justify-between">
            <h3
              class="month-title"
              style="font-family: 'NanumSquareRound', sans-serif"
            >
              {{ currentMonth }}월
            </h3>
            <div class="flex space-x-6">
              <button @click="goToPrevMonth">
                <img
                  src="@/assets/Icons/akoming/arrowright.svg"
                  alt="arrow left"
                  class="transform scale-x-[-1]"
                />
              </button>
              <button @click="goToNextMonth">
                <img
                  src="@/assets/Icons/akoming/arrowright.svg"
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="calendar-container">
          <div class="calendar-grid">
            <div class="calendar-day" v-for="day in DAY_LIST" :key="day">
              {{ day }}
            </div>
          </div>
          <div
            class="calendar-week"
            v-for="week in weekCalendarList"
            :key="week.toString()"
          >
            <button
              class="day-button"
              :class="{
                selected: day === selectedDay,
                'sunday-saturday': isSundayOrSaturday(day),
                'has-event': hasEvent(day)
              }"
              v-for="day in week"
              :key="day"
              @click="selectDay(day)"
            >
              {{ day !== 0 ? day : '' }}
            </button>
          </div>
        </div>

        <div
          class="schedule-popup"
          v-if="isScheduleOpen && selectedEvents.length > 0"
        >
          <div class="popup-header">
            <h2>학사 일정</h2>
            <button class="close-button" @click="closeSchedule">×</button>
          </div>
          <div class="popup-content">
            <div v-for="event in selectedEvents" :key="event.title">
              <p>{{ event.title }}</p>
              <p>{{ formatDateRange(event.startDate, event.endDate) }}</p>
            </div>
          </div>
        </div>

        <div>
          <a
            class="link-button"
            v-for="(link, index) in links"
            :key="index"
            :href="link.url"
            target="_blank"
          >
            {{ link.text }}
            <img
              src="@/assets/Icons/akoming/arrowright.svg"
              alt="arrow right"
            />
          </a>
        </div>
      </div>
      <MainFooter />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
  position: relative;
}

.inner-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 20px 1.5rem 6rem;
  margin-top: 30px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.month-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
}

.calendar-container {
  background-color: #fae8da;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}

.calendar-day {
  font-size: 0.875rem;
  color: #b3b3b3;
}

.calendar-week {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.day-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.125rem;
  background-color: transparent;
  color: #b3b3b3;
  transition: background-color 0.3s, color 0.3s;
}

.day-button.selected {
  background-color: #ff7f00;
  color: white;
}

.day-button.sunday-saturday {
  color: #17a1fa;
}

.schedule-popup {
  position: fixed;
  bottom: -100%; /* 시작 위치: 화면 아래 */
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 60vh;
  width: 395px;
  margin: 0 auto;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  animation: slide-up 0.3s ease-out forwards; /* 부드러운 위로 이동 애니메이션 */
  z-index: 1000;
}

.link-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 0.5rem 1rem;
  background-color: #ffd9bb;
  color: #000000;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  text-decoration: none;
  max-width: 80%;
  margin: 0 auto 0.625rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.link-button:hover {
  background-color: #f1cdb1;
}
.day-button.has-event::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  background-color: #b3b3b3;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 4px;
}

@keyframes slide-up {
  from {
    bottom: -100%; /* 초기 상태 */
  }
  to {
    bottom: 0; /* 최종 상태 */
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.popup-header h2 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4a4a4a;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b3b3b3;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #ff7f00;
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
