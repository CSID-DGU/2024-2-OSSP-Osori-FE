<template>
  <div class="akopolio-page">
    <MainHeader />
    <header class="header">
      <div class="filter-container">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="아코폴리오 활동명을 입력하세요"
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

    <div class="portfolio-list">
      <div
        v-for="item in filteredPortfolioList"
        :key="item.id"
        class="portfolio-card"
      >
        <div class="portfolio-content">
          <h3 class="portfolio-title">{{ item.title }}</h3>
          <p class="created-date">작성일: {{ item.createdDate }}</p>
        </div>
        <div class="portfolio-tags">
          <span v-for="tag in item.tags" :key="tag" class="portfolio-tag">{{
            tag
          }}</span>
        </div>
      </div>
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

<script>
import PaginationNav from './paginationNav.vue'
import MainHeader from '../../components/layout/Header.vue'
import MainFooter from '../../components/layout/Footer.vue'

export default {
  components: {
    MainHeader,
    MainFooter,
    PaginationNav
  },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      currentPage: 1,
      itemsPerPage: 8,
      selectedTags: [],
      tags: [
        '전공',
        '교양',
        '교내동아리',
        '교외동아리',
        '학회',
        '봉사활동',
        '인턴',
        '아르바이트',
        '대외활동',
        '서포터즈',
        '기자단',
        '강연/행사',
        '스터디',
        '부트캠프',
        '프로젝트',
        '연구',
        '학생회',
        '기타'
      ],
      isDropdownOpen: false,
      portfolioList: this.generatePortfolioList(50) // 예시: 50개 데이터 생성
    }
  },
  computed: {
    filteredPortfolioList() {
      let filteredList = this.portfolioList

      if (this.searchQuery) {
        filteredList = filteredList.filter((item) =>
          item.title.includes(this.searchQuery)
        )
      }

      if (this.selectedTags.length > 0) {
        filteredList = filteredList.filter((item) =>
          this.selectedTags.every((tag) => item.tags.includes(tag))
        )
      }

      if (this.startDate && this.endDate) {
        filteredList = filteredList.filter((item) => {
          return (
            new Date(item.createdDate) >= new Date(this.startDate) &&
            new Date(item.createdDate) <= new Date(this.endDate)
          )
        })
      }

      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return filteredList.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.portfolioList.length / this.itemsPerPage)
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag)
      if (index > -1) {
        this.selectedTags.splice(index, 1)
      } else {
        this.selectedTags.push(tag)
      }
    },
    generatePortfolioList(count) {
      const tags = ['전공', '스터디', '인턴', '프로젝트', '봉사활동']
      const portfolio = []
      for (let i = 1; i <= count; i++) {
        portfolio.push({
          id: i,
          title: `포트폴리오 ${i}`,
          tags: [tags[i % tags.length]],
          createdDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`
        })
      }
      return portfolio
    },
    applyFilters() {
      this.currentPage = 1 // 필터 적용 시 페이지를 1로 초기화
    },
    handlePageChanged(newPage) {
      this.currentPage = newPage
    },
    goToCreatePage() {
      this.$router.push('/akopolio/create')
    },
    resetFilters() {
      this.searchQuery = ''
      this.startDate = ''
      this.endDate = ''
      this.selectedTags = []
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.akopolio-page {
  width: 395px;
  max-width: 500px;
  margin: 4rem auto;
  padding: 20px;
  background-color: #ffe8d1;
  min-height: calc(100vh - 120px);
}

h3 {
  font-size: 15px;
  color: #ff7f00;
  margin-top: 10px;
}

h2 {
  margin: 0;
  font-size: 15px;
}

input[type='text'],
input[type='date'] {
  background-color: #ffe8d1;
  border: 1px solid #eec092;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  font-size: 15px;
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
  padding: 8px;
  border-radius: 40px;
  background-color: white;
  transition: background-color 0.3s;
}

button.active {
  background-color: #f6b87a;
  color: white;
}

.filter-container {
  background-color: #fff3e6;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}
.category-box {
  background-color: #fff3e6;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  color: white;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
}

.portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.portfolio-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.created-date {
  font-size: 14px;
  color: #666;
}

.portfolio-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.portfolio-tag {
  background-color: #ffc68d;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
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
  background-color: #ff8c42;
  color: white;
  border: none;
  padding: 6px 11px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
}

.reset-btn:hover {
  background-color: #ffa768;
}

.floating-btn {
  position: fixed;
  bottom: 90px;
  right: 280px;
  background-color: #f4b28c;
  color: white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.floating-btn img {
  width: 30px;
  height: 30px;
}
</style>
