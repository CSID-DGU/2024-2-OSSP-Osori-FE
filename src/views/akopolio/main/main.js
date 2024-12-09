import axios from 'axios'; 
import PaginationNav from '../paginationNav.vue';
import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, computed, onMounted } from 'vue'


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
      itemsPerPage: 7,
      selectedTags: [],
      tags: [
        '전공', '교양', '교내동아리', '교외동아리', '학회', '봉사활동',
        '인턴', '아르바이트', '대외활동', '서포터즈', '기자단', '기타',
        '강연/행사', '스터디', '부트캠프', '프로젝트', '연구',
        '학생회'
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
      const query = this.searchQuery.trim().toLowerCase(); // 검색어를 소문자로 변환
      if (query.length > 0) {
        filteredList = filteredList.filter(item =>
          item.name.toLowerCase().includes(query) // 포트폴리오 이름을 검색어와 비교
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
          const itemDate = new Date(item.startDate); // startDate를 Date 객체로 변환
          const start = this.startDate ? new Date(this.startDate) : null;
          const end = this.endDate ? new Date(this.endDate) : null;
  
          if (start && !end) {
            return itemDate >= start;
          } else if (!start && end) {
            return itemDate <= end;
          } else if (start && end) {
            return itemDate >= start && itemDate <= end;
          }
          return true;
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

    groupedPortfolioList() {
      const grouped = {};
      this.filteredPortfolioList.forEach(item => {
        if (!grouped[item.startDate]) {
          grouped[item.startDate] = [];
        }
        grouped[item.startDate].push(item);
      });
  
      // 객체를 배열로 변환하고 날짜를 오래된 순으로 정렬
      return Object.entries(grouped)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([date, items]) => ({ date, items }));
    },
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
  
        console.log('서버 응답 상태:', response.status, response.statusText);
  
        if (response.ok) {
          const data = await response.json();
          this.nickname = data.nickname; // nickname을 data 안으로 변경
          console.log('사용자 정보:', data);
        } else {
          console.error('사용자 정보 불러오기 실패:', response.status, response.statusText);
          if (response.status === 401) {
            alert('인증에 실패했습니다. 다시 로그인해주세요.');
            window.location.href = '/login';
          } else {
            alert('사용자 정보 가져오기 실패. 다시 시도해주세요.');
          }
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error);
        alert('사용자 정보 가져오기 오류가 발생했습니다.');
      }
    },

    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        // 이미 선택된 태그라면 배열에서 제거
        this.selectedTags.splice(index, 1);
      } else {
        // 선택되지 않은 태그라면 배열에 추가
        this.selectedTags.push(tag);
      }
      this.applyFilters(); // 필터 적용
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

    goToDetailPage(id) {
      this.$router.push(`/akopolio/detail/${id}`);
    },

    async fetchPortfolios() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BE_API_URL}/api/portfolios`);
        
        // API 응답에 따라 포트폴리오 리스트 업데이트
        this.portfolioList = response.data.length 
          ? response.data.map(portfolio => ({
              id: portfolio.portfolioId,   // 포트폴리오 ID
              name: portfolio.name,        // 포트폴리오 이름
              updatedAt: portfolio.updatedAt, // 마지막 업데이트 시간
              startDate: portfolio.startDate, // 시작일
              tags: portfolio.tags         // 태그 리스트
            })) 
          : this.defaultPortfolioList;     // 데이터가 없으면 기본 리스트 사용
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        this.portfolioList = this.defaultPortfolioList; // 오류 시 기본 데이터 사용
      }
    },    
  },

  mounted() {
    this.fetchUserData();    // 사용자 정보 로드
    this.fetchPortfolios();
  }
};
