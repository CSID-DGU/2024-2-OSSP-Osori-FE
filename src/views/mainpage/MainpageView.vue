<template>
  <div class="min-h-screen bg-[#FFF9F2] font-pretendard flex justify-center">
    <div
      class="w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative overflow-y-auto"
    >
    <MainHeader />
      <!-- 본문 내용 -->
      <main class="flex flex-col px-6 pt-20 pb-24">
        <!-- 제목 -->
        <h1 class="mb-6 text-2xl font-bold text-center text-gray-800">
          오늘도 우리 아코는 한 걸음씩!
        </h1>

        <!-- 스탬프 영역 -->
        <div class="relative w-[300px] h-[400px] mx-auto mb-6">
          <svg
            class="absolute top-0 left-0 z-0 w-full h-full"
            viewBox="0 0 300 400"
          >
            <path
              d="M 50 50 L 150 50 Q 250 50, 250 125 Q 250 200, 150 200 L 50 200 A 75 75 0 0 0 50 350 L 150 350"
              stroke="#ccc"
              stroke-width="4"
              fill="transparent"
            />
          </svg>
          <div
            v-for="(stamp, index) in stamps"
            :key="index"
            :class="[
              'absolute w-[50px] h-[50px] flex justify-center items-center rounded-full text-2xl text-white',
              stamp.completed ? 'bg-[#F6B87A]' : 'bg-blue-500'
            ]"
            :style="stamp.position"
          >
            {{ stamp.label }}
          </div>
        </div>

        <!-- 할 일 표시 -->
        <div class="mb-6 space-y-4">
          <div class="flex space-x-4">
            <div
              v-for="(task, index) in tasks.slice(0, 2)"
              :key="index"
              class="flex items-center justify-between flex-1 p-3 bg-white rounded-lg shadow-sm"
            >
              <span class="text-sm">{{ task.name }}</span>
              <span v-if="task.completed" class="text-[#F6B87A]">✔</span>
            </div>
          </div>
          <div class="flex space-x-4">
            <div
              v-for="(task, index) in tasks.slice(2)"
              :key="index"
              class="flex items-center justify-between flex-1 p-3 bg-white rounded-lg shadow-sm"
            >
              <span class="text-sm">{{ task.name }}</span>
              <span v-if="task.completed" class="text-[#F6B87A]">✔</span>
            </div>
          </div>
        </div>

        <!-- 아코 이미지 -->
        <div class="text-center">
          <svg
            class="w-32 h-32 mx-auto mb-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            />
            <path d="M14 9l-5 5-2-2" />
          </svg>
          <p class="text-sm text-gray-600">토실토실 아코가 자라는 중</p>
        </div>
      </main>
    </div>
  </div>
  <MainFooter />
</template>

<script setup>
import { ref } from 'vue'
import MainHeader from '@/views/mainpage/Header.vue'
import MainFooter from '@/views/mainpage/Footer.vue'

const stamps = ref([
  { label: 'A', completed: true, position: { top: '25px', left: '25px' } },
  { label: 'K', completed: true, position: { top: '25px', left: '125px' } },
  { label: 'O', completed: true, position: { top: '100px', left: '225px' } },
  { label: 'M', completed: false, position: { top: '175px', left: '125px' } },
  { label: 'I', completed: false, position: { top: '175px', left: '25px' } },
  { label: 'N', completed: false, position: { top: '325px', left: '25px' } },
  { label: 'G', completed: false, position: { top: '325px', left: '125px' } }
])

const tasks = ref([
  { name: '아코밍 출석', completed: true },
  { name: '아코자국', completed: true },
  { name: '댓글 남기기', completed: false },
  { name: '아코폴리오', completed: false }
])
</script>
