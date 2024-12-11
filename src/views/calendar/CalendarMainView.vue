<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
// 다른 페이지로 이동 시 바텀시트 닫기
onUnmounted(() => {
  isScheduleOpen.value = false
})
</script>

<template>
  <div class="page-container">
    <div
      class="inner-container"
      style="margin-top: 60px; font-family: 'NaL', sans-serif"
    >
      <MainHeader />
      <div class="main-content">
        <div>
          <h2
            class="section-title"
            style="
              font-family: 'NaR', sans-serif;
              margin-top: 10px;
              margin-left: 26px;
            "
          >
            {{ currentYear }} at 동국대학교
          </h2>
          <div class="flex items-center justify-between">
            <h3
              class="month-title"
              style="font-family: 'NaB', sans-serif; margin-left: 25px"
            >
              {{ currentMonth }}월
            </h3>
            <div class="flex space-x-6">
              <div
                @click="goToPrevMonth"
                role="button"
                tabindex="0"
                @keydown.enter="goToPrevMonth"
                @keydown.space="goToPrevMonth"
              >
                <img
                  src="@/assets/Icons/akoming/calendar-arrow-left.svg"
                  alt="arrow left"
                />
              </div>
              <div
                @click="goToNextMonth"
                role="button"
                tabindex="0"
                @keydown.enter="goToNextMonth"
                @keydown.space="goToNextMonth"
                style="margin-right: 28px"
              >
                <img
                  src="@/assets/Icons/akoming/calendar-arrow-right.svg"
                  alt="arrow right"
                />
              </div>
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
          <button class="close-button" @click="closeSchedule">×</button>
          <div class="popup-content">
            <div
              v-for="(event, index) in selectedEvents"
              :key="event.title"
              class="event-item"
            >
              <div class="event-header">
                <div class="selected-date">
                  {{ selectedDay }}
                </div>
                <div class="event-info">
                  <p class="event-title">{{ event.title }}</p>
                  <p class="event-date">
                    {{ formatDateRange(event.startDate, event.endDate) }}
                  </p>
                </div>
              </div>
              <hr
                v-if="index < selectedEvents.length - 1"
                class="event-divider"
              />
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
  font-family: 'NaR', sans-serif;
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
  font-size: 1.1rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.month-title {
  font-size: 1.4rem;
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
  gap: 0.5rem; /* Reduced gap */
  text-align: center;
  margin-bottom: 1rem;
  margin-left: 10px;
  width: 100%; /* Ensure full width */
}

.calendar-day {
  font-size: 0.875rem;
  color: #b3b3b3;
  width: 2rem;
  text-align: center;
  letter-spacing: normal;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  width: 100%;
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
  background-color: transparent;
  color: #b3b3b3;
  transition: background-color 0.3s, color 0.3s;
  padding: 0;
  margin: 0 auto;
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
  bottom: 60px; /* Adjust this value to match your footer height */
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(
    100vh - 120px
  ); /* Adjust this value to account for footer and some extra space */
  width: 395px;
  margin: 0 auto;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
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
  max-width: 90%;
  margin: 0 auto 0.625rem;
  transition: background-color 0.3s ease;
}

.link-button:hover {
  background-color: #f1cdb1;
}

.day-button.has-event::after {
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  background-color: #b3b3b3;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 2px;
}

@keyframes slide-up {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
}

.event-item {
  margin-bottom: 1rem;
}

.event-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.selected-date {
  background-color: #ff7f00;
  color: white;
  padding: 0.5rem;
  border-radius: 0.65rem;
  font-weight: bold;
  font-size: 0.875rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.event-info {
  flex: 1;
}

.event-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.event-date {
  font-size: 0.75rem;
  color: #666;
}

.event-divider {
  border: none;
  border-top: 1px solid #878787;
  margin: 0.75rem;
}

.popup-content {
  padding-top: 1rem;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  margin-left: 10px;
  width: 100%;
}

.calendar-day {
  font-size: 0.875rem;
  color: #b3b3b3;
  width: 2rem;
  text-align: center;
  letter-spacing: normal;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  width: 100%;
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
  background-color: transparent;
  color: #b3b3b3;
  transition: background-color 0.3s, color 0.3s;
  padding: 0;
  margin: 0 auto;
}

.schedule-popup {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  width: 100%;
  max-width: 395px;
  margin: 0 auto;
  z-index: 1000;
  box-sizing: border-box;
}
.close-button {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
}
.schedule-popup {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 2rem 1.5rem 1.5rem; /* padding-top 값을 2rem으로 설정 */
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  width: 100%;
  max-width: 395px;
  margin: 0 auto;
  z-index: 1000;
  box-sizing: border-box;
}

.close-button {
  position: absolute;
  top: 0rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
}
</style>
