import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // vue-router 기능 사용

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const portfolio = ref(null); // 포트폴리오 데이터 저장
    const images = ref([]); // 업로드된 이미지 또는 미리보기 저장
    const route = useRoute(); // route 사용
    const router = useRouter(); // router 사용
    const portfolioId = route.params.id; // route에서 id 값 가져오기

    // 포트폴리오 데이터 가져오기
    const fetchPortfolioById = async (id) => {
      try {
        // 백엔드 API 연동
        const response = await fetch(
          `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${id}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }

        portfolio.value = await response.json();
        images.value = portfolio.value.images || [];
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        alert('포트폴리오를 가져오는 중 오류가 발생했습니다.');
      }
    };

    // 수정 페이지로 이동
    const editPortfolio = () => {
      router.push(`/akopolio/edit/${portfolioId}`);
    };

    // 포트폴리오 삭제
    const handleDeletePortfolio = async () => {
      if (confirm('정말 삭제하시겠습니까?')) {
        try {
          // 백엔드 API 연동
          const response = await fetch(
            `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`,
            { method: 'DELETE' }
          );
          
          if (!response.ok) {
            throw new Error(`Failed to delete portfolio: ${response.statusText}`);
          }

          alert('삭제되었습니다.');
          router.push('/akopolio/main');
        } catch (error) {
          console.error('Error deleting portfolio:', error);
          alert('삭제 중 오류가 발생했습니다.');
        }
      }
    };

    // 컴포넌트 마운트 시 데이터 가져오기
    onMounted(() => {
      fetchPortfolioById(portfolioId);
    });

    return {
      portfolio,
      images,
      editPortfolio,
      handleDeletePortfolio,
    };
  },
};




