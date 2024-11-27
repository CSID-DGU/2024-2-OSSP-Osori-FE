import axios from 'axios'; 
import PaginationNav from '../paginationNav.vue';
import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';

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
      portfolioList: [], // 초기 포트폴리오는 빈 배열로 설정
      defaultPortfolioList: [
        {
          id: 1,
          title: '예시 포트폴리오 1',
          createdDate: '2023-01-01',
          tags: ['전공', '프로젝트'],
        },
        {
          id: 2,
          title: '예시 포트폴리오 2',
          createdDate: '2023-02-15',
          tags: ['스터디', '연구'],
        },
        // 추가 예시 데이터
      ],
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
      if (this.startDate || this.endDate) {
        filteredList = filteredList.filter(item => {
          const itemDate = new Date(item.createdDate);
          if (this.startDate && !this.endDate) {
            return itemDate >= new Date(this.startDate);
          } else if (!this.startDate && this.endDate) {
            return itemDate <= new Date(this.endDate);
          } else {
            return (
              itemDate >= new Date(this.startDate) &&
              itemDate <= new Date(this.endDate)
            );
          }
        });
      }

      // 페이지네이션 적용
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredList.slice(startIndex, endIndex);
    },

    totalPages() {
      return Math.ceil(this.portfolioList.length / this.itemsPerPage);
    },
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
      this.applyFilters();
    },

    applyFilters() {
      this.currentPage = 1;
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
      this.$router.push(`/akopolio/detail/${id}`);
    },

    async fetchPortfolios() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BE_API_URL}/api/portfolios`);
        this.portfolioList = response.data.length ? response.data : this.defaultPortfolioList; // 데이터가 없으면 예시 데이터 사용
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        this.portfolioList = this.defaultPortfolioList; // 오류 시 예시 데이터 사용
      }
    },
  },

  mounted() {
    this.fetchPortfolios();
  }
};
