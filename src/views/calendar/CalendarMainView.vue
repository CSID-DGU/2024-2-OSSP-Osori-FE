<script setup>
import {
  PageContainer,
  InnerContainer,
  MainContent,
  SectionTitle,
  MonthTitle,
  CalendarContainer,
  CalendarGrid,
  CalendarDay,
  CalendarWeek,
  DayButton,
  SchedulePopup,
  LinkButton
} from './CalendarMainStyled.js'

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
  <PageContainer>
    <InnerContainer>
      <MainHeader />
      <MainContent>
        <div>
          <SectionTitle>{{ currentYear }} at 동국대학교</SectionTitle>
          <div class="flex items-center justify-between">
            <MonthTitle>{{ currentMonth }}월</MonthTitle>
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

        <CalendarContainer>
          <CalendarGrid>
            <CalendarDay v-for="day in DAY_LIST" :key="day">{{
              day
            }}</CalendarDay>
          </CalendarGrid>
          <CalendarWeek v-for="week in weekCalendarList" :key="week.toString()">
            <DayButton
              v-for="day in week"
              :key="day"
              :isSelected="day === selectedDay"
              :isSundayOrSaturday="isSundayOrSaturday(day)"
              @click="selectDay(day)"
            >
              {{ day !== 0 ? day : '' }}
            </DayButton>
          </CalendarWeek>
        </CalendarContainer>

        <SchedulePopup v-if="isScheduleOpen && selectedEvents.length > 0">
          <!-- 일정 내용 -->
        </SchedulePopup>

        <div>
          <LinkButton
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
          </LinkButton>
        </div>
      </MainContent>
      <MainFooter />
    </InnerContainer>
  </PageContainer>
</template>
