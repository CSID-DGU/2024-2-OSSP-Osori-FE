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
