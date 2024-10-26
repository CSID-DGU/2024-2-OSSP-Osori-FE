<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
      <MainHeader />
      <!-- 본문 내용 -->
      <main class="flex flex-col px-6 pt-24 pb-24">
        <!-- 제목 -->
        <h1
          class="mb-10 text-xl font-medium text-center text-gray-800 font-uhbeesehyun"
          style="margin-bottom: 70px"
        >
          오늘도 우리 아코는 한 걸음씩!
        </h1>

        <!-- 스탬프 영역 -->
        <div class="relative w-[390px] h-[520px] mx-auto">
          <svg
            class="absolute top-0 left-0 z-0 w-full h-full"
            viewBox="0 0 390 520"
          >
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
            :style="stamp.position"
            class="absolute w-[95px] h-[95px] flex justify-center items-center"
          >
            <img
              :src="
                stamp.completed
                  ? getCompletedStampIcon(stamp.label)
                  : getGrayStampIcon(stamp.label)
              "
              alt="stamp"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- 할 일 표시 -->
        <div
          class="mb-12 flex flex-col items-center space-y-3"
          style="margin-top: -80px"
        >
          <div class="flex space-x-3 w-full max-w-[290px]">
            <div
              v-for="(task, index) in tasks.slice(0, 2)"
              :key="index"
              class="flex items-center justify-between flex-1 h-[40px] px-3 bg-white rounded-[17px]"
            >
              <span
                class="text-sm"
                :class="{
                  'text-[#FF7F00]': task.completed,
                  'text-[#B3B3B3]': !task.completed
                }"
              >
                {{ task.name }}
              </span>
              <img
                :src="getTaskIcon(task.name)"
                :class="task.completed ? 'text-[#FF7F00]' : 'text-[#B3B3B3]'"
                class="w-5 h-5"
                :style="{ filter: task.completed ? '' : 'grayscale(100%)' }"
              />
            </div>
          </div>
          <div class="flex space-x-3 w-full max-w-[290px]">
            <div
              v-for="(task, index) in tasks.slice(2)"
              :key="index"
              class="flex items-center justify-between flex-1 h-[40px] px-3 bg-white rounded-[17px]"
            >
              <span
                class="text-sm"
                :class="{
                  'text-[#FF7F00]': task.completed,
                  'text-[#B3B3B3]': !task.completed
                }"
              >
                {{ task.name }}
              </span>
              <img
                :src="getTaskIcon(task.name)"
                :class="task.completed ? 'text-[#FF7F00]' : 'text-[#B3B3B3]'"
                class="w-5 h-5"
                :style="{ filter: task.completed ? '' : 'grayscale(100%)' }"
              />
            </div>
          </div>
        </div>

        <!-- 아코 이미지 -->
        <div class="text-center flex flex-col items-center mt-10">
          <div class="flex items-center mb-2">
            <img
              src="@/assets/Icons/akoming/mainpage/minielephanticon.svg"
              alt="미니 아코 이미지"
              class="w-8 h-8 mr-2"
            />
            <p class="text-sm text-gray-600">토실토실 아코가 자라는 중</p>
          </div>
          <img
            src="@/assets/Icons/akoming/mainpage/ako-01.svg"
            alt="아코 이미지"
            class="w-64 h-64 mx-auto"
          />
        </div>
      </main>
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'
import attendanceIcon from '@/assets/Icons/akoming/todo/attendance.svg'
import akojagukIcon from '@/assets/Icons/akoming/todo/akojaguk.svg'
import commentIcon from '@/assets/Icons/akoming/todo/comment.svg'
import akofolioIcon from '@/assets/Icons/akoming/todo/akofolio.svg'

const stamps = ref([
  { label: 'A', completed: true, position: { top: '-18px', left: '12px' } },
  { label: 'K', completed: true, position: { top: '-18px', left: '147px' } },
  { label: 'O', completed: true, position: { top: '62px', left: '262px' } },
  { label: 'M', completed: false, position: { top: '144px', left: '157px' } },
  { label: 'I', completed: false, position: { top: '144px', left: '22px' } },
  { label: 'N', completed: false, position: { top: '297px', left: '102px' } },
  { label: 'G', completed: false, position: { top: '297px', left: '237px' } }
])

// Functions to get icons based on task name and completion status
const getCompletedStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/color/color${label.toLowerCase()}.svg`)
}

const getGrayStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/gray/gray${label.toLowerCase()}.svg`)
}

const tasks = ref([
  { name: '아코밍 출석', completed: true },
  { name: '아코자국', completed: true },
  { name: '댓글 남기기', completed: false },
  { name: '아코폴리오', completed: false }
])

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
</script>
