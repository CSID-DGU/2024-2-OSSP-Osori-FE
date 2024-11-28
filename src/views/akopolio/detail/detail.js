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
    const defaultPortfolio = {
      title: '예시 활동명',
      createdDate: '2023-11-27',
      tags: ['전공', '프로젝트'],
      star: {
        situation: '이 프로젝트는 동아리 활동의 일환으로 시작되었습니다.',
        task: '팀원들과 함께 웹사이트 개발을 진행해야 했습니다.',
        action: 'Vue.js와 Firebase를 활용해 프로젝트를 완성했습니다.',
        result: '사용자 수가 200명 이상 증가했습니다.',
      },
      pmi: {
        plus: '새로운 기술을 배워서 유익했습니다.',
        minus: '일정 관리가 어려웠습니다.',
        interesting: '사용자 피드백이 매우 흥미로웠습니다.',
      },
      images: [
        'https://via.placeholder.com/300.png?text=Image+1',
        'https://via.placeholder.com/300.png?text=Image+2',
      ],      
    };
  
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
  
        const data = await response.json();
        portfolio.value = data || defaultPortfolio; // 데이터가 없으면 예시 데이터 사용
        images.value = portfolio.value.images || [];
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        alert('포트폴리오를 가져오는 중 오류가 발생했습니다. 예시 데이터를 표시합니다.');
        portfolio.value = defaultPortfolio; // 오류 시 예시 데이터 사용
        images.value = defaultPortfolio.images;
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




