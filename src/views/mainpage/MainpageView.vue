<template>
  <SkeletonMainPage v-if="isLoading" />
  <div v-else class="page-container">
    <div class="mobile-container" style="margin-top: 20px">
      <MainHeader />

      <!-- 본문 내용 -->
      <div class="main-content">
        <h1 class="title" style="font-family: 'UhBeeSe_hyun', sans-serif">
          오늘도 우리 아코는 한 걸음씩!
        </h1>

        <!-- 스탬프 영역 -->
        <div class="stamp-container">
          <svg viewBox="0 0 351 468" class="path">
            <path
              d="M 54 22.5 L 175.5 22.5 Q 297 22.5, 297 96.75 Q 297 171, 175.5 171 L 54 171 A 67.5 67.5 0 0 0 90 306 L 243 306"
              stroke="#BBB4B4"
              stroke-width="2.7"
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
        <div
          class="task-container"
          style="font-family: 'NaR'; letter-spacing: 0.4px"
        >
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
              class="ako-status-icon"
              src="@/assets/Icons/akoming/mainpage/minielephanticon.svg"
              alt="미니 아코 이미지"
            />
            <p class="ako-status-text">토실토실 아코가 자라는 중</p>
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
import SkeletonMainPage from './SkeletonMainPage.vue'

const tasks = ref([
  { name: '아코밍 출석', completed: false },
  { name: '아코자국', completed: false },
  { name: '댓글 남기기', completed: false },
  { name: '아코폴리오', completed: false }
])

const stamps = ref([
  {
    label: 'A',
    completed: false,
    position: { top: '-16.2px', left: '10.8px' }
  },
  {
    label: 'K',
    completed: false,
    position: { top: '-16.2px', left: '132.3px' }
  },
  {
    label: 'O',
    completed: false,
    position: { top: '55.8px', left: '234.3px' }
  },
  {
    label: 'M',
    completed: false,
    position: { top: '129.6px', left: '140.4px' }
  },
  {
    label: 'I',
    completed: false,
    position: { top: '129.6px', left: '19.8px' }
  },
  {
    label: 'N',
    completed: false,
    position: { top: '262.8px', left: '91.8px' }
  },
  {
    label: 'G',
    completed: false,
    position: { top: '262.8px', left: '213.3px' }
  }
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

onMounted(() => {
  fetchQuestStatus()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
}

.mobile-container {
  width: 100%;
  max-width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 6rem 1.5rem 6rem;
  font-family: 'NanumSquareRound', sans-serif;
}

.main-content .title {
  margin-bottom: 70px;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  color: #4a4a4a;
  font-family: 'UhBeeSehyun', sans-serif;
}

.stamp-container {
  position: relative;
  width: 351px;
  height: 468px;
  margin: 0 auto;
}

.stamp-container .stamp {
  position: absolute;
  width: 85.5px;
  height: 85.5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stamp-container .stamp img {
  width: 100%;
  height: 100%;
}

.task-container {
  margin-top: -80px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.task-container .task-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 290px;
}

.task-container .task-row .task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 40px;
  padding: 0 1rem;
  background-color: white;
  border-radius: 17px;
}

.task-container .task-row .task span {
  font-size: 0.875rem;
  font-family: 'NanumSquareRound', sans-serif;
  color: var(--task-color, #b3b3b3);
}

.task-container .task-row .task img {
  width: 20px;
  height: 20px;
  filter: var(--task-filter, grayscale(100%));
}

.ako-image-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
}

.ako-image-container .ako-status {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ako-image-container .ako-status img {
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
}

.ako-image-container .ako-status-text {
  font-size: 1.1rem;
  color: #000000;
  font-family: 'NanumSquareRound', sans-serif;
  letter-spacing: 1px;
  font-weight: medium;
}

.ako-image-container .ako-image {
  width: 256px;
  height: 256px;
  margin: 0 auto;
}

.ako-status-icon {
  margin-top: -20px;
}
</style>
