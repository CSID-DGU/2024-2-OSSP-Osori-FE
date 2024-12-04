<template>
  <div class="page-container">
    <div class="mobile-container" style="margin-top: 20px">
      <MainHeader />

      <!-- 본문 내용 -->
      <div class="main-content">
        <h1 class="title" style="font-family: 'UhBeeSe_hyun', sans-serif">
          오늘도 우리 아코는 한 걸음씩!
        </h1>

        <!-- 스탬프 영역 -->
        <div class="stamp-container">
          <svg viewBox="0 0 390 520" class="path">
            <path
              d="M 60 25 L 195 25 Q 330 25, 330 107.5 Q 330 190, 195 190 L 60 190 A 75 75 0 0 0 60 340 L 270 340"
              stroke="#BBB4B4"
              stroke-width="3"
              fill="transparent"
            />
          </svg>
          <div
            v-for="(stamp, index) in stamps"
            :key="index"
            class="stamp"
            :style="stamp.position"
          >
            <img
              :src="
                stamp.completed
                  ? getCompletedStampIcon(stamp.label)
                  : getGrayStampIcon(stamp.label)
              "
              alt="stamp"
            />
          </div>
        </div>

        <!-- 할 일 표시 -->
        <div class="task-container">
          <div class="task-row">
            <div
              v-for="(task, index) in tasks.slice(0, 2)"
              :key="index"
              class="task"
              :style="{
                '--task-color': task.completed ? '#FF7F00' : '#B3B3B3',
                '--task-filter': task.completed ? 'none' : 'grayscale(100%)'
              }"
            >
              <span>{{ task.name }}</span>
              <img
                :src="getTaskIcon(task.name)"
                :style="{
                  filter: task.completed ? 'none' : 'grayscale(100%)'
                }"
              />
            </div>
          </div>
          <div class="task-row">
            <div
              v-for="(task, index) in tasks.slice(2)"
              :key="index"
              class="task"
              :style="{
                '--task-color': task.completed ? '#FF7F00' : '#B3B3B3',
                '--task-filter': task.completed ? 'none' : 'grayscale(100%)'
              }"
            >
              <span>{{ task.name }}</span>
              <img
                :src="getTaskIcon(task.name)"
                :style="{
                  filter: task.completed ? 'none' : 'grayscale(100%)'
                }"
              />
            </div>
          </div>
        </div>

        <!-- 아코 이미지 -->
        <div class="ako-image-container">
          <div class="ako-status">
            <img
              src="@/assets/Icons/akoming/mainpage/minielephanticon.svg"
              alt="미니 아코 이미지"
            />
            <p>토실토실 아코가 자라는 중</p>
          </div>
          <img :src="akoImage" alt="아코 이미지" class="ako-image" />
        </div>
      </div>

      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'
import attendanceIcon from '@/assets/Icons/akoming/todo/attendance.svg'
import akojagukIcon from '@/assets/Icons/akoming/todo/akojaguk.svg'
import commentIcon from '@/assets/Icons/akoming/todo/comment.svg'
import akofolioIcon from '@/assets/Icons/akoming/todo/akofolio.svg'

// Tasks for the to-do list
const tasks = ref([
  { name: '아코밍 출석', completed: false },
  { name: '아코자국', completed: false },
  { name: '댓글 남기기', completed: false },
  { name: '아코폴리오', completed: false }
])

// 스탬프 상태 정의
const stamps = ref([
  { label: 'A', completed: false, position: { top: '-18px', left: '12px' } },
  { label: 'K', completed: false, position: { top: '-18px', left: '147px' } },
  { label: 'O', completed: false, position: { top: '62px', left: '262px' } },
  { label: 'M', completed: false, position: { top: '144px', left: '157px' } },
  { label: 'I', completed: false, position: { top: '144px', left: '22px' } },
  { label: 'N', completed: false, position: { top: '297px', left: '102px' } },
  { label: 'G', completed: false, position: { top: '297px', left: '237px' } }
])

// 기본 아코 이미지 설정
const akoImage = ref(require('@/assets/Icons/akoming/mainpage/ako-01.svg'))

// 퀘스트와 스탬프 상태를 업데이트하는 함수
const fetchQuestStatus = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/quests/status`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) throw new Error('Failed to fetch quest status')

    const { questStatus, stampCount } = await response.json()

    // 퀘스트 상태 업데이트
    tasks.value[0].completed = questStatus.attended
    tasks.value[1].completed = questStatus.goalWritten
    tasks.value[2].completed = questStatus.commentedOnFriendGoal
    tasks.value[3].completed = questStatus.portfolioWritten

    // 스탬프 상태 업데이트
    stamps.value.forEach((stamp, index) => {
      stamp.completed = index < stampCount
    })
  } catch (error) {
    console.error('퀘스트 상태를 가져오는 중 오류 발생:', error)
  }
}

// Functions to get icons based on task name and completion status
const getCompletedStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/color/color${label.toLowerCase()}.svg`)
}

const getGrayStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/gray/gray${label.toLowerCase()}.svg`)
}

const getTaskIcon = (taskName) => {
  switch (taskName) {
    case '아코밍 출석':
      return attendanceIcon
    case '아코자국':
      return akojagukIcon
    case '댓글 남기기':
      return commentIcon
    case '아코폴리오':
      return akofolioIcon
    default:
      return null
  }
}

// onMounted에서 호출하여 초기 데이터 로드
onMounted(() => {
  fetchQuestStatus()
})
</script>

<style scoped src="./MainpageStyled.css"></style>
