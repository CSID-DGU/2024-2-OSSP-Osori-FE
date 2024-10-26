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
          class="mb-6 text-xl font-medium text-center text-gray-800 font-uhbeesehyun"
        >
          오늘도 우리 아코는 한 걸음씩!
        </h1>

        <!-- 스탬프 영역 -->
        <div class="relative w-[390px] h-[520px] mx-auto mb-6">
          <svg
            class="absolute top-0 left-0 z-0 w-full h-full"
            viewBox="0 0 390 520"
          >
            <path
              d="M 60 40 L 195 40 Q 330 40, 330 137.5 Q 330 235, 195 235 L 60 235 A 87.5 87.5 0 0 0 60 410 L 270 410"
              stroke="#BBB4B4"
              stroke-width="3"
              fill="transparent"
            />
          </svg>
          <div
            v-for="(stamp, index) in stamps"
            :key="index"
            :style="stamp.position"
            class="absolute w-[85px] h-[85px] flex justify-center items-center"
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
        <div class="mb-6 space-y-3">
          <div class="flex space-x-3">
            <div
              v-for="(task, index) in tasks.slice(0, 2)"
              :key="index"
              class="flex items-center justify-between flex-1 p-2 bg-white rounded-[20px] shadow-sm"
            >
              <span
                class="text-sm"
                :class="{ 'text-[#FF7F00]': task.completed }"
                >{{ task.name }}</span
              >
            </div>
          </div>
          <div class="flex space-x-3">
            <div
              v-for="(task, index) in tasks.slice(2)"
              :key="index"
              class="flex items-center justify-between flex-1 p-2 bg-white rounded-[20px] shadow-sm"
            >
              <span
                class="text-sm"
                :class="{ 'text-[#FF7F00]': task.completed }"
                >{{ task.name }}</span
              >
            </div>
          </div>
        </div>

        <!-- 아코 이미지 -->
        <div class="text-center flex flex-col items-center">
          <div class="flex items-center mb-2">
            <img
              src="@/assets/Icons/akoming/mainpage/minielephanticon.svg"
              alt="미니 아코 이미지"
              class="w-6 h-6 mr-2"
            />
            <p class="text-lg text-gray-600">토실토실 아코가 자라는 중</p>
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
import minielephanticon from '@/assets/Icons/akoming/mainpage/minielephanticon.svg'

const stamps = ref([
  { label: 'A', completed: true, position: { top: '0px', left: '17px' } },
  { label: 'K', completed: true, position: { top: '0px', left: '152px' } },
  { label: 'O', completed: true, position: { top: '95px', left: '287px' } },
  { label: 'M', completed: false, position: { top: '192px', left: '152px' } },
  { label: 'I', completed: false, position: { top: '192px', left: '17px' } },
  { label: 'N', completed: false, position: { top: '367px', left: '107px' } },
  { label: 'G', completed: false, position: { top: '367px', left: '242px' } }
])

// 함수: completed가 true일 때 색상이 있는 아이콘을 가져옵니다.
const getCompletedStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/color/color${label.toLowerCase()}.svg`)
}

// 함수: completed가 false일 때 회색 아이콘을 가져옵니다.
const getGrayStampIcon = (label) => {
  return require(`@/assets/Icons/akoming/stamp/gray/gray${label.toLowerCase()}.svg`)
}

const tasks = ref([
  { name: '아코밍 출석', completed: true },
  { name: '아코자국', completed: true },
  { name: '댓글 남기기', completed: false },
  { name: '아코폴리오', completed: false }
])
</script>

<style scoped>
@font-face {
  font-family: 'UhBeeSe_hyun';
  src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeSe_hyun.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>
