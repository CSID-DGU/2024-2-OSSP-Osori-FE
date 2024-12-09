<template>
  <div class="page-container">
    <div class="mobile-container" style="margin-top: 20px">
      <MainHeader />

      <!-- 본문 내용 -->
      <div class="main-content">
        <h1
          class="title skeleton-text"
          style="font-family: 'UhBeeSe_hyun', sans-serif"
        >
          &nbsp;
        </h1>

        <!-- 스켈레톤 스탬프 영역 -->
        <div class="stamp-container">
          <svg viewBox="0 0 390 520" class="path">
            <path
              d="M 60 25 L 195 25 Q 330 25, 330 107.5 Q 330 190, 195 190 L 60 190 A 75 75 0 0 0 60 340 L 270 340"
              stroke="#E0E0E0"
              stroke-width="3"
              fill="transparent"
            />
          </svg>
          <div
            v-for="index in 7"
            :key="index"
            class="stamp skeleton-stamp"
            :style="getStampPosition(index)"
          ></div>
        </div>

        <!-- 스켈레톤 할 일 표시 -->
        <div class="task-container">
          <div class="task-row" v-for="row in 2" :key="row">
            <div v-for="task in 2" :key="task" class="task skeleton-task">
              <div class="skeleton-text"></div>
              <div class="skeleton-icon"></div>
            </div>
          </div>
        </div>

        <!-- 스켈레톤 아코 이미지 -->
        <div class="ako-image-container">
          <div class="ako-status">
            <div class="skeleton-icon"></div>
            <div class="skeleton-text"></div>
          </div>
          <div class="skeleton-ako-image"></div>
        </div>
      </div>

      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainHeader from '@/components/layout/Header.vue'
import MainFooter from '@/components/layout/Footer.vue'

const getStampPosition = (index) => {
  const positions = [
    { top: '-18px', left: '12px' },
    { top: '-18px', left: '147px' },
    { top: '62px', left: '262px' },
    { top: '144px', left: '157px' },
    { top: '144px', left: '22px' },
    { top: '297px', left: '102px' },
    { top: '297px', left: '237px' }
  ]
  return positions[index - 1]
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #fff9f2;
  font-family: 'NanumSquareRound', sans-serif;
  display: flex;
  justify-content: center;
}

.mobile-container {
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
  padding: 6rem 1.5rem 6rem;
  font-family: 'NanumSquareRound', sans-serif;
}

.title {
  margin-bottom: 70px;
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  color: #4a4a4a;
  font-family: 'UhBeeSehyun', sans-serif;
}

.stamp-container {
  position: relative;
  width: 390px;
  height: 520px;
  margin: 0 auto;
}

.stamp {
  position: absolute;
  width: 95px;
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-container {
  margin-top: -80px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.task-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 290px;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 40px;
  padding: 0 1rem;
  background-color: white;
  border-radius: 17px;
}

.ako-image-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
}

.ako-status {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skeleton-text,
.skeleton-stamp,
.skeleton-task,
.skeleton-icon,
.skeleton-ako-image {
  position: relative;
  overflow: hidden;
  background-color: #e0e0e0;
}

.skeleton-text::before,
.skeleton-stamp::before,
.skeleton-task::before,
.skeleton-icon::before,
.skeleton-ako-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #f0f0f0 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  height: 1em;
  width: 70%;
  margin: 0.5em auto;
  border-radius: 4px;
}

.skeleton-stamp {
  border-radius: 50%;
}

.skeleton-task {
  background-color: #f5f5f5;
}

.skeleton-task .skeleton-text {
  width: 60%;
  height: 0.875em;
  margin: 0;
}

.skeleton-task .skeleton-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.skeleton-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.skeleton-ako-image {
  width: 256px;
  height: 256px;
  border-radius: 50%;
  margin: 0 auto;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
