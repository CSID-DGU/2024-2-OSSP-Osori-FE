<template>
    <div class="akopolio-detail">
      <MainHeader />
      <div class="detail-header">
        <h1>{{ portfolio.title }}</h1>
        <div class="action-buttons">
          <button @click="editPortfolio">수정하기</button>
          <button @click="deletePortfolio">삭제하기</button>
        </div>
      </div>
      <div class="detail-content">
        <p><strong>작성일:</strong> {{ portfolio.createdDate }}</p>
        <p><strong>태그:</strong> 
          <span v-for="tag in portfolio.tags" :key="tag">{{ tag }}</span>
        </p>
  
        <h2>STAR 분석</h2>
        <p><strong>상황:</strong> {{ portfolio.star.situation }}</p>
        <p><strong>과제:</strong> {{ portfolio.star.task }}</p>
        <p><strong>행동:</strong> {{ portfolio.star.action }}</p>
        <p><strong>결과:</strong> {{ portfolio.star.result }}</p>
  
        <h2>PMI 분석</h2>
        <p><strong>장점:</strong> {{ portfolio.pmi.plus }}</p>
        <p><strong>단점:</strong> {{ portfolio.pmi.minus }}</p>
        <p><strong>흥미로운 점:</strong> {{ portfolio.pmi.interesting }}</p>
      </div>
      <MainFooter />
    </div>
  </template>
  
  <script>
  import MainHeader from '../../components/layout/Header.vue';
  import MainFooter from '../../components/layout/Footer.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    components: {
      MainHeader,
      MainFooter,
    },
    data() {
      return {
        portfolio: null,
      };
    },
    computed: {
      ...mapGetters(['getPortfolios']),
    },
    created() {
      const portfolioId = this.$route.params.id; // URL에서 포트폴리오 ID 가져오기
      this.portfolio = this.getPortfolios.find(item => item.id === portfolioId); // 해당 ID의 포트폴리오 찾기
    },
    methods: {
      editPortfolio() {
        // 수정 페이지로 이동 (예: /akopolio/edit/:id)
        this.$router.push(`/akopolio/edit/${this.portfolio.id}`);
      },
      deletePortfolio() {
        // 삭제 기능 구현 (예: Vuex 액션 호출)
        if (confirm('정말 삭제하시겠습니까?')) {
          // 여기에 삭제 로직 추가 (예: Vuex 액션 호출)
          alert('삭제되었습니다.'); // 삭제 후 메시지 표시
          this.$router.push('/akopolio/main'); // 목록 페이지로 이동
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .akopolio-detail {
    padding: 20px;
  }
  
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .action-buttons button {
    margin-left: 10px;
  }
  
  .detail-content {
    margin-top: 20px;
  }
  </style>
  