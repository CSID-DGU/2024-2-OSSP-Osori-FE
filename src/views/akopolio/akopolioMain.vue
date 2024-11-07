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

    <!-- 포트폴리오 목록 또는 데이터 없음 메시지 -->
    <div v-if="filteredPortfolioList.length > 0" class="portfolio-list">
      <div
        v-for="item in filteredPortfolioList"
        :key="item.id"
        class="portfolio-card"
        @click="goToDetailPage(item.id)" 
      >
        <div class="portfolio-content">
          <h3 class="portfolio-title">{{ item.title }}</h3>
          <p class="created-date">작성일: {{ item.createdDate }}</p>
        </div>
        <div class="portfolio-tags">
          <span v-for="tag in item.tags" :key="tag" class="portfolio-tag">
            {{ tag }}
          </span>
        </div>
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

<script>
import PaginationNav from './paginationNav.vue';
import MainHeader from '../../components/layout/Header.vue';
import MainFooter from '../../components/layout/Footer.vue';

export default {
  components: {
    MainHeader,
    MainFooter,
    PaginationNav,
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
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동',
        '인턴', '아르바이트', '대외활동', '서포터즈', '기자단',
        '강연/행사', '스터디', '부트캠프', '프로젝트', '연구',
        '학생회', '기타'
      ],
      isDropdownOpen: false,
      portfolioList: [
        // 백엔드 API로 받아오는 데이터로 대체 필요
        { id: 1, title: '융합프로그래밍', createdDate: '2024-11-01', tags: ['전공'] },
        { id: 2, title: '오픈소스소프트웨어 실습', createdDate: '2024-10-15', tags: ['전공', '프로젝트'] },
        { id: 3, title: '성남시 IT 서비스 스터디', createdDate: '2024-09-10', tags: ['스터디'] },
        // 여기에 더 많은 포트폴리오 데이터가 추가될 수 있음
      ]
    };
  },
  computed: {
    filteredPortfolioList() {
      let filteredList = this.portfolioList;

      // 검색 필터 적용
      if (this.searchQuery) {
        filteredList = filteredList.filter(item =>
          item.title.includes(this.searchQuery)
        );
      }

      // 태그 필터 적용
      if (this.selectedTags.length > 0) {
        filteredList = filteredList.filter(item =>
          this.selectedTags.every(tag => item.tags.includes(tag))
        );
      }

      // 날짜 필터 적용
      if (this.startDate && this.endDate) {
        filteredList = filteredList.filter(item => {
          const itemDate = new Date(item.createdDate);
          return (
            itemDate >= new Date(this.startDate) &&
            itemDate <= new Date(this.endDate)
          );
        });
      }

      // 페이지네이션 적용
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredList.slice(startIndex, endIndex);
    },

    totalPages() {
      const totalFilteredItems = this.portfolioList.filter(item => {
        return (
          (!this.searchQuery || item.title.includes(this.searchQuery)) &&
          (this.selectedTags.length === 0 || 
            this.selectedTags.every(tag => item.tags.includes(tag))) &&
          (!this.startDate || !this.endDate ||
            (new Date(item.createdDate) >= new Date(this.startDate) &&
             new Date(item.createdDate) <= new Date(this.endDate)))
        );
      }).length;
      return Math.ceil(totalFilteredItems / this.itemsPerPage);
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.applyFilters(); // 태그 변경 시 필터 적용
    },

    applyFilters() {
      this.currentPage = 1; // 필터 적용 시 첫 페이지로 초기화
    },

    handlePageChanged(newPage) {
      this.currentPage = newPage;
    },

    goToCreatePage() {
      this.$router.push('/akopolio/create');
    },

    resetFilters() {
      this.searchQuery = '';
      this.startDate = '';
      this.endDate = '';
      this.selectedTags = [];
      this.currentPage = 1;
    },

    goToDetailPage(id) {
      this.$router.push(`/akopolio/detail/${id}`); // ID를 포함하여 상세 페이지로 이동
    },

    // API에서 포트폴리오 데이터 받아오는 함수 (백엔드 연결 필요)
    // async fetchPortfolios() {
    //   try {
    //     const response = await axios.get('/api/portfolios');
    //     this.portfolioList = response.data;
    //   } catch (error) {
    //     console.error('Error fetching portfolios:', error);
    //   }
    // }
  }
};
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
  cursor: pointer;
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
