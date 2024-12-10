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
          <svg viewBox="0 0 390 520" class="path">
            <path
              d="M 80 40 L 195 40 Q 330 40, 330 130 Q 330 212.5, 195 212.5 L 80 212.5 A 75 75 0 0 0 120 372.5 L 270 372.5"
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
  { label: 'M', completed: false, position: { top: '140px', left: '157px' } },
  { label: 'I', completed: false, position: { top: '140px', left: '22px' } },
  { label: 'N', completed: false, position: { top: '292px', left: '102px' } },
  { label: 'G', completed: false, position: { top: '292px', left: '237px' } }
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
    console.log('Updated tasks:', tasks.value) // 확인용 로그

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

<style scoped>
/* 외부 컨테이너 */
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NaB', sans-serif;
  display: flex;
  justify-content: center;
}

/* 모바일 컨테이너 */
.mobile-container {
  width: 395px;
  min-width: 340px;
  background-color: #fae8da;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
}

/* 메인 컨텐츠 */
.main-content {
  display: flex;
  flex-direction: column;
  padding: 6rem 1.5rem 6rem;
  font-family: 'NaB', sans-serif;
}

.main-content .title {
  margin-bottom: 70px;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  color: #4a4a4a;
  font-family: 'UhBeeSehyun', sans-serif;
}

/* 스탬프 영역 */
.stamp-container {
  position: relative;
  width: 390px;
  height: 520px;
  margin: 0 auto;
}

.stamp-container .stamp {
  position: absolute;
  width: 95px;
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stamp-container .stamp img {
  width: 100%;
  height: 100%;
}

/* 할 일 표시 영역 */
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
  font-family: 'NaB', sans-serif;
  color: var(--task-color, #b3b3b3);
}

.task-container .task-row .task img {
  width: 20px;
  height: 20px;
  filter: var(--task-filter, grayscale(100%));
}

/* 아코 이미지 영역 */
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
  font-family: 'NaR', sans-serif;
  letter-spacing: 0.5px;
}

.ako-image-container .ako-image {
  width: 256px;
  height: 256px;
  margin: 0 auto;
}

.ako-status-icon {
  margin-top: -20px;
}
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NaB', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
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
  overflow-x: hidden;
}
.stamp-container {
  position: relative;
  width: 100%;
  max-width: 390px;
  height: 520px;
  margin: 0 auto;
}
@media (max-width: 390px) {
  .stamp-container .stamp {
    transform: scale(0.9);
  }
}
</style>
