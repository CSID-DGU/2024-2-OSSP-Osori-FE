<template>
  <div class="main-container">
    <img class="logo" :src="require('@/assets/images/Akoming.svg')" alt="Akoming Logo" />
      <calendar-component></calendar-component>
     
   



      <!-- 분야 설정 (태그 목록 토글) -->
      <div class="tag-section">
        <v-btn @click="toggleTagDropdown" class="tag-toggle" outlined>
          분야설정
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <div v-if="tagDropdown" class="tags-container">
          <v-btn
            v-for="tag in tags"
            :key="tag"
            :class="['tag-button', { active: selectedTags.includes(tag) }]"
            @click="toggleTag(tag)"
            outlined
          >
            {{ tag }}
          </v-btn>
        </div>
        <!-- 선택한 태그 표시 -->
        <div class="selected-tags">
          <span v-if="selectedTags.length">선택한 태그: {{ selectedTags.join(', ') }}</span>
        </div>
      </div>
      <div class="combined-section">
        <div class="header">오늘의 평가 (PMI + Star)</div>
        <div class="subtitle">Plus-Minus-Interesting & Star</div>
        <rating-component></rating-component>
      </div>

      <button class="submit-button" @click="submitForm">저장하기</button>
    </div>
 
</template>

<script>
export default {
  data() {
    return {
      showTags: false,
      tags: [
        '교내동아리', '교양', '전공', '교외동아리', '학회', '봉사활동', '연구',
        '서포터즈', '기자단', '부트캠프', '아르바이트', '학생회', '대외활동',
        '스터디', '강연/행사', '인턴', '기타', '프로젝트',
      ],
      selectedTags: ['기타'], // 기본값으로 '기타' 선택
    };
  },
  methods: {
    toggleTagSection() {
      this.showTags = !this.showTags;
    },
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
      } else {
        this.selectedTags.push(tag);
      }
    },
    submitForm() {
      // Form submit logic
      console.log('Form submitted!');
    }
  }
};
</script>

<style scoped>
/* 전체 레이아웃 */
.activity-form {
  background-color: #fae6d4;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 로고 */
.logo {
  display: block;
  margin: 0 auto 20px;
  width: 120px;
  max-width: 100%;
}

/* 태그 섹션 */
.tag-section {
  margin-top: 20px;
}
.tag-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffe4c4;
  border-radius: 8px;
  padding: 10px;
  transition: background-color 0.3s;
}
.tag-toggle:hover {
  background-color: #ffd5a8;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ff7f50;
  border-radius: 8px;
  background-color: #fff8f0;
}
.selected-tags {
  margin-top: 10px;
  color: #ff7f50;
  font-weight: bold;
}

/* 태그 버튼 */
.tag-button {
  margin: 5px;
  border-radius: 16px;
  padding: 5px 10px;
  color: #ff7f50;
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid #ff7f50;
}
.tag-button:hover {
  background-color: #ffe4c4;
}
.tag-button.active {
  background-color: #ff7f50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* PMI 및 Star 평가 섹션 */
.combined-section {
  margin-top: 30px;
}
.header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.subtitle {
  font-size: 0.8rem;
  color: #ff7f50;
  margin-bottom: 10px;
}
</style>

<style>
/* global.css */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 전역 스타일 */
body {
  @apply bg-customBg font-pretendard min-h-screen;
}

.main-container {
  @apply w-[395px] min-w-[340px] bg-[#FAE8DA] min-h-screen relative mx-auto;
}

input {
  @apply w-full px-3 py-2 bg-[#DDD7D3] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F6B87A] focus:border-transparent transition duration-200;
}

button {
  @apply px-3 py-2 bg-[#F6B87A] text-white text-sm rounded-full hover:bg-[#e5a769] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed;
}

.error-message {
  @apply mt-1 text-xs text-red-500;
}

/* Scoped 버튼 클래스는 여기서 우선순위 조정 */
.submit-button {
  @apply w-full py-3 bg-[#ff7f50] text-white text-sm rounded-full transition-colors duration-300;
}

.submit-button:hover {
  background-color: #e67300 !important;
}
</style>
