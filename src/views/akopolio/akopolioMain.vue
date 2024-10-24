<template>
    <div class="akopolio-page">
      <MainHeader />
      <header class="header">
        <input type="text" v-model="searchQuery" placeholder="아코폴리오 활동명을 입력하세요" />
        <div class="date-picker">
          <input type="date" v-model="startDate" @input="applyFilters" />
          <span>~</span>
          <input type="date" v-model="endDate" @input="applyFilters" />
        </div>
      </header>
  
      <button class="reset-btn" @click="resetFilters">초기화</button>
  
      <div class="tags-container">
        <button 
          v-for="tag in allTags" 
          :key="tag" 
          :class="['tag', { selected: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
          @mouseover="hoverTag = tag"
          @mouseleave="hoverTag = ''"
          :style="hoverTag === tag || selectedTags.includes(tag) ? hoverStyle(tag) : {}"
        >
          {{ tag }}
        </button>
      </div>
  
      <div class="portfolio-list">
        <div v-for="item in filteredPortfolioList" :key="item.id" class="portfolio-card">
          <div class="portfolio-content">
            <h3 class="portfolio-title">{{ item.title }}</h3>
            <p class="created-date">작성일: {{ item.createdDate }}</p>
          </div>
          <div class="portfolio-tags">
            <span v-for="tag in item.tags" :key="tag" class="portfolio-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
  
      <pagination-nav
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="handlePageChanged"
      />
  
      <button class="floating-btn" @click="goToWritePage">
        <img class="logo" :src="require('@/assets/images/Akoming.svg')" alt="Akoming Logo" />
      </button>
      <MainFooter />
    </div>
  </template>
  
  <script>
  import PaginationNav from './paginationNav.vue';
  import MainHeader from '../../components/layout/Header.vue'
  import MainFooter from '../../components/layout/Footer.vue'
  
  export default {
    components: { 
      MainHeader,
      MainFooter,
      PaginationNav},
    data() {
      return {
        searchQuery: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        itemsPerPage: 8,
        selectedTags: [],
        hoverTag: '',
        allTags: [
          '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동', '인턴', '아르바이트',
          '대외활동', '서포터즈', '기자단', '강연/행사', '스터디', '부트캠프', '프로젝트', 
          '연구', '학생회', '기타',
        ],
        portfolioList: this.generatePortfolioList(50), // 예시: 50개 데이터 생성
      };
    },
    computed: {
      filteredPortfolioList() {
        let filteredList = this.portfolioList;
  
        if (this.searchQuery) {
          filteredList = filteredList.filter(item =>
            item.title.includes(this.searchQuery)
          );
        }
  
        if (this.selectedTags.length > 0) {
          filteredList = filteredList.filter(item =>
            this.selectedTags.every(tag => item.tags.includes(tag))
          );
        }
  
        if (this.startDate && this.endDate) {
          filteredList = filteredList.filter(item => {
            return (
              new Date(item.createdDate) >= new Date(this.startDate) &&
              new Date(item.createdDate) <= new Date(this.endDate)
            );
          });
        }
  
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filteredList.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.portfolioList.length / this.itemsPerPage);
      },
    },
    methods: {
      generatePortfolioList(count) {
        const tags = ['전공', '스터디', '인턴', '프로젝트', '봉사활동'];
        const portfolio = [];
        for (let i = 1; i <= count; i++) {
          portfolio.push({
            id: i,
            title: `포트폴리오 ${i}`,
            tags: [tags[i % tags.length]],
            createdDate: `2024-${String(i % 12 + 1).padStart(2, '0')}-01`,
          });
        }
        return portfolio;
      },
      toggleTag(tag) {
        if (this.selectedTags.includes(tag)) {
          this.selectedTags = this.selectedTags.filter(t => t !== tag);
        } else {
          this.selectedTags.push(tag);
        }
      },
      applyFilters() {
        this.currentPage = 1;
      },
      handlePageChanged(newPage) {
        this.currentPage = newPage;
      },
      hoverStyle(tag) {
        return {
          backgroundColor: this.selectedTags.includes(tag) ? '#FF8C42' : '#FFE0B2',
          cursor: 'pointer',
        };
      },
      goToWritePage() {
        this.$router.push('/akopolio/write');
      },
      resetFilters() {
        this.searchQuery = '';
        this.startDate = '';
        this.endDate = '';
        this.selectedTags = [];
        this.currentPage = 1;
      },
    },
  };
  </script>
  
  <style scoped>
  .akopolio-page {
    padding: 20px;
    background-color: #fae6d4;
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
    background-color: #FFC68D;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .date-picker {
    display: flex;
    align-items: center;
  }
  
  .reset-btn {
    margin-top: 10px;
    background-color: #FF8C42;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .reset-btn:hover {
    background-color: #FFA768;
  }
  
  .tags-container {
    margin: 20px 0;
  }
  
  .tag {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border-radius: 50px;
    background-color: #fff8f8;
    transition: background-color 0.3s;
  }
  
  .tag.selected {
    background-color: #FF8C42;
    color: white;
  }
  
  
  .floating-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #F4B28C;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .floating-btn img {
    width: 30px;
    height: 30px;
  }
  
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .bottom-nav a {
    text-decoration: none;
    color: black;
  }
  </style>
  