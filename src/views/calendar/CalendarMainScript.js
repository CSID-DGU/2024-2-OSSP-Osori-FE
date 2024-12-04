import { ref, computed } from 'vue'
import axios from 'axios'
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  subMonths,
  getDay,
  isWithinInterval,
  parseISO
} from 'date-fns'

export const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토']

export const currentDate = ref(new Date())
export const selectedDay = ref(null)
export const isScheduleOpen = ref(false)

export const currentYear = computed(() => format(currentDate.value, 'yyyy'))
export const currentMonth = computed(() => format(currentDate.value, 'M'))

// 학사 일정 데이터 저장소
export const academicEvents = ref([])

// 백엔드에서 학사 일정 가져오기
export const fetchAcademicEvents = async () => {
  try {
    const apiUrl = `${process.env.VUE_APP_BE_API_URL}/api/academic-events/${currentYear.value}/${currentMonth.value}`
    console.log('API 요청 URL:', apiUrl)

    const response = await axios.get(apiUrl)

    if (response.status === 200 && response.data) {
      academicEvents.value = response.data.map((event) => ({
        title: event.eventTitle,
        department: event.department,
        startDate: event.startDate,
        endDate: event.endDate
      }))
      console.log('학사 일정 데이터:', academicEvents.value)
    } else {
      console.warn('학사 일정 데이터를 가져오는 데 실패했습니다.')
      academicEvents.value = []
    }
  } catch (error) {
    console.error('학사 일정 데이터 가져오기 오류:', error.message)
    academicEvents.value = []
  }
}

export const goToPrevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

export const goToNextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

export const getCalendarDays = () => {
  const startDay = getDay(startOfMonth(currentDate.value))
  const daysInMonth = getDaysInMonth(currentDate.value)
  const prevDays = Array.from({ length: startDay }).fill(0)
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const nextDays = Array.from({
    length: 42 - (prevDays.length + currentDays.length)
  }).fill(0)

  return [...prevDays, ...currentDays, ...nextDays].reduce((weeks, day, i) => {
    if (i % 7 === 0) weeks.push([])
    weeks[weeks.length - 1].push(day)
    return weeks
  }, [])
}

export const weekCalendarList = computed(() => getCalendarDays())

export const selectDay = (day) => {
  if (day !== 0) {
    selectedDay.value = day
    isScheduleOpen.value = hasEvent(day)
  }
}

export const closeSchedule = () => {
  isScheduleOpen.value = false
}

export const isSundayOrSaturday = (day) => {
  const dayOfWeek = (
    weekCalendarList.value.find((week) => week.includes(day)) || []
  ).indexOf(day)
  return dayOfWeek === 0 || dayOfWeek === 6
}

export const hasEvent = (day) => {
  const selectedDateStr = `${currentYear.value}-${String(
    currentMonth.value
  ).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const result = academicEvents.value.some((event) =>
    isWithinInterval(parseISO(selectedDateStr), {
      start: parseISO(event.startDate),
      end: parseISO(event.endDate)
    })
  )

  return result
}

export const selectedEvents = computed(() => {
  const selectedDateStr = `${currentYear.value}-${String(
    currentMonth.value
  ).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`
  return academicEvents.value.filter((event) =>
    isWithinInterval(parseISO(selectedDateStr), {
      start: parseISO(event.startDate),
      end: parseISO(event.endDate)
    })
  )
})

export const formatDateRange = (startDate, endDate) => {
  const start = format(parseISO(startDate), 'yyyy.MM.dd')
  const end = format(parseISO(endDate), 'yyyy.MM.dd')
  return start === end ? start : `${start} ~ ${end}`
}

export const links = [
  { text: '동국대학교 홈페이지 바로가기', url: 'https://www.dongguk.edu/main' },
  {
    text: '동국대학교 학사일정 바로가기',
    url: 'https://www.dongguk.edu/schedule/detail?schedule_info_seq=22'
  },
  { text: 'ndrims 바로가기', url: 'https://ndrims.dongguk.edu/unis/index.do' }
]
