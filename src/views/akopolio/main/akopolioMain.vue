<template>
  <div class="akopolio-page">
    <MainHeader />
    <header class="header">
      <div class="filter-container">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @input="applyFilters" 
            placeholder="활동명을 입력하세요 (두 글자 이상)"
          />
          <button class="reset-btn" @click="resetFilters">초기화</button>
        </div>
        <div class="date-picker">
          <input type="date" v-model="startDate" @input="applyFilters" />
          <span> </span>
          <input type="date" v-model="endDate" @input="applyFilters" />
        </div>
      </div>
    </header>

    <!-- 분야 설정 -->
    <div class="category-box">
      <div class="category">
        <label @click="toggleDropdown" class="category-label">
          <h2>분야 설정</h2>
          <span v-if="selectedTags.length">
            <span class="tag-badge" v-for="tag in selectedTags" :key="tag">
              {{ tag }}
            </span>
          </span>
        </label>

        <div v-show="isDropdownOpen" class="tag-container">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="{ active: selectedTags.includes(tag) }"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- 포트폴리오 목록 또는 데이터 없음 메시지 -->
    <div v-if="filteredPortfolioList.length > 0" class="portfolio-list">
      <div
        v-for="item in filteredPortfolioList"
        :key="item.id"
        class="portfolio-card"
        @click="goToDetailPage(item.id)" 
      >
        <div class="portfolio-content">
          <h3 class="portfolio-title">{{ item.name }}</h3>
          <div class="portfolio-tags">
            <span v-for="tag in item.tags" :key="tag" class="portfolio-tag">
              {{ tag }}
            </span>
          </div>
        </div>
        <p class="created-date">활동일: {{ item.startDate }}</p>
      </div>
    </div>

    <div v-else class="no-data">
      <h2>등록된 포트폴리오가 없습니다.</h2>
    </div>

    <pagination-nav
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="handlePageChanged"
    />

    <button class="floating-btn" @click="goToCreatePage">
      <img
        class="logo"
        :src="require('@/assets/images/AddFile.svg')"
        alt="Akoming Logo"
      />
    </button>


    <MainFooter />
  </div>
</template>

<script src="./main.js"></script>

<style scoped>

.akopolio-page {
  width: 395px;
  max-width: 500px;
  margin: 4rem auto;
  padding: 20px;
  background-color: #fae8da;
  min-height: calc(100vh - 120px);
  position: relative;
  font-family: 'NanumSquareRound', sans-serif;
}

h3 {
  font-size: 15px;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'NanumSquareRound', sans-serif;
}

h2 {
  margin: 0;
  font-size: 15px;
  font-family: 'NanumSquareRound', sans-serif;
}

.no-data {
  text-align: center; 
  padding: 50px 0;
  font-family: 'NanumSquareRound', sans-serif;
}

.no-data h2 {
  font-size: 0.7rem; 
  color: #777; 
}

input[type='text'],
input[type='date'] {
  background-color: white;
  border: 1px solid #eec092;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  font-size: 14px;
}

.date-picker input[type='date'] {
  margin-right: 10px;
}

.date-picker input[type='date']:last-of-type {
  margin-right: 0;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 12px;
}

button {
  display: inline-block;
  margin: 3px;
  padding: 5px 10px;
  border-radius: 40px;
  background-color: white;
  transition: background-color 0.3s;
  border: 1px solid #eec092;
}

button.active {
  background-color: #f6b87a;
}

.filter-container {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}
.category-box {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 0px;
  margin-bottom: 40px;
  width: 100%;
}

.category-label {
  display: flex;
  align-items: center;
}

.tag-badge {
  display: inline-block;
  margin-left: 10px;
  background-color: #f6b87a;
  color: black;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
}

.portfolio-list {
  display: grid;
  grid-template-columns: 1fr; /* 한 줄에 하나 */
  gap: 15px;
}

.portfolio-card {
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
  position: relative; 
  
}

.portfolio-card:hover {
  transform: translateY(-4px);
  cursor: pointer;
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.portfolio-title {
  font-size: 16px;
  margin: 0;
}

.created-date {
  font-size: 13px;
  color: #666;
  text-align: right;
  align-self: flex-end; 
  margin: 0;
  font-family: 'NanumSquareRound', sans-serif;
}

.portfolio-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.portfolio-tag {
  background-color: #ffc68d;
  color: black;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
  margin-top: 5px;
  font-family: 'NanumSquareRound', sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.search-container {
  display: flex; /* 수평 정렬 */
  align-items: center;
  margin-bottom: 10px;
  width: 100%; /* 필요한 경우 전체 너비 설정 */
}

.search-container input[type='text'] {
  flex: 1; /* 검색 입력란이 가로로 늘어나도록 설정 */
}
.date-picker {
  display: flex;
  align-items: center;
}

.reset-btn {
  margin-left: 10px; /* 오른쪽 여백 */
  background-color: #f4b28c;
  color: black;
  border: none;
  padding: 6px 11px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  border-radius: 8px;
}

.reset-btn:hover {
  background-color: #f2a579;
}

.floating-btn {
  position: fixed;
  bottom: 8%; 
  right: calc(50% - 180px);
  background-color: #f4b28c;
  color: white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 100; /* 다른 요소들 위에 표시되도록 */
}


.floating-btn:hover {
  cursor: pointer;
  background-color: #eaa279;
}


.floating-btn img {
  width: 30px;
  height: 30px;
}
</style>
