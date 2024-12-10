<template>
<div class="whole-page">
    <MainHeader />
    <div class="akopolio-page">
    <header class="header">
      <div class="filter-container">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @input="applyFilters" 
            placeholder="아코폴리오 활동명을 입력하세요"
          />
        </div>
        <div class="date-picker">
          <input type="date" v-model="startDate" @input="applyFilters" />
          <span> </span>
          <input type="date" v-model="endDate" @input="applyFilters" />
        </div>
      </div>
    </header>

    <!-- 분야 설정 -->
    <div class="tag-container">
      <div
        v-for="tag in tags"
        :key="tag"
        @click="toggleTag(tag)"
        :class="{ active: selectedTags.includes(tag) }"
      >
        #{{ tag }}
      </div>
    </div>


    <div v-if="filteredPortfolioList.length > 0" class="portfolio-list">
    <div v-for="group in groupedPortfolioList" :key="group.date" class="portfolio-group">
      <!-- 날짜 헤더 -->
      <p class="group-date">{{ group.date }}</p>

      <!-- 해당 날짜의 카드들 -->
      <div v-for="item in group.items" :key="item.id" class="portfolio-card"  @click="goToDetailPage(item.id)">
        <div class="portfolio-content">
          <h3 class="portfolio-title">{{ item.name }}</h3>
          <div class="portfolio-tags">
            <span v-for="tag in item.tags" :key="tag" class="portfolio-tag">
              #{{ tag }}
            </span>
          </div>
        </div>
      <img :src="require('@/assets/images/detailarr.svg')" alt="detail arrow" class="portfolio-arrow">
      </div>
    </div>
    </div>

  <!-- 데이터가 없을 경우 -->
  <div v-else class="no-data">
    <h2>등록된 포트폴리오가 없습니다😮</h2>
  </div>

    <pagination-nav
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="handlePageChanged"
    />

    <div class="floating-btn" @click="goToCreatePage">
      <img
        class="logo"
        :src="require('@/assets/images/AddFile.svg')"
        alt="Akoming Logo"
      />
    </div>
  </div>
    <MainFooter />
</div>
</template>

<script src="./main.js"></script>

<style scoped>
.akopolio-page {
  min-height: 110vh;
  max-width: 395px;
  width: 100%; 
  margin: 4rem auto;
  padding: 20px;
  background-color: #fae8da;
  position: relative;
  justify-content: space-between; 
  font-family: 'NaR';
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
  font-family: 'NaR';
  width:100%;
  text-align: center;
  font-size: 14px;
  color: rgba(107, 105, 105, 0.612);
  margin-bottom: 10px;
}

input[type='text'],
input[type='date'] {
  background-color: transparent;
  border:none;
  width: 100%;
  font-size: 13px;
  text-align: center;
}

input[type='text']{
  border-bottom: 1px solid #D9D9D9;
  border-radius: 0;
  padding: 7px;
  }

  input[type='date'] {
  padding-top: 0;      
  padding-right: 10px; 
  padding-bottom: 5px; 
  padding-left: 10px;  
}


input {
  all: unset; /* 기본 스타일 초기화 */
}


.date-picker input[type='date'] {
  margin-right: 10px;

}

.date-picker input[type='date']:last-of-type {
  margin-right: 0;
}

.filter-container {
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #D9D9D9;
}

.tag-container {
  display: flex;
  flex-wrap: wrap; 
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 10px;
  font-weight: 300;
  justify-content: space-between;
  font-family: sans-serif;
  max-width: 355px;
}

.tag-container div {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 40px;
  background-color: white;
  transition: background-color 0.3s;
  border: 1px solid #eec092;
  cursor: pointer;
  margin-top: 4px;
}

.tag-container div.active {
  background-color: #f6b87a;
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
  padding: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
  position: relative; 
  margin-bottom: 10px;
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
  font-size: 15px;
  margin: 0;
}

.group-date {
  font-size: 15px;
  margin-bottom: 7px;
  text-align: left;
  margin-left: 8px;
}

.portfolio-arrow {
  margin-right: 5px;
}

.portfolio-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.portfolio-tag {
  background-color: #ffc68d;
  color: black;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 10px;
  margin-top: 5px;
  font-weight: lighter;
  font-family: sans-serif;
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

.floating-btn {
  position: fixed;
  bottom: 90px;
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
  z-index: 10;
}

.floating-btn:hover {
  cursor: pointer;
  background-color: #eaa279;
}

.floating-btn img {
  width: 30px;
  height: 30px;
}

@media (max-width: 370px) {
  .floating-btn {
    right: 40px; 
    bottom: 10%; 
    width: 50px; 
    height: 50px; 
  }
}

</style>
