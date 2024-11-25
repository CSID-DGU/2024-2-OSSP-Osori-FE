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
        // TODO: 백엔드 연동 후 아래를 실제 데이터로 교체
        // const response = await fetch(`API_URL/portfolios/${id}`);
        // portfolio.value = await response.json();

        portfolio.value = {
          title: '융합프로그래밍',
          createdDate: '2024-11-01',
          tags: ['전공'],
          star: {
            situation: '상황 예시',
            task: '과제 예시',
            action: '행동 예시',
            result: '결과 예시',
          },
          pmi: {
            plus: '긍정적인 면',
            minus: '부정적인 면',
            interesting: '흥미로운 점',
          },
          images: [
            { presignedUrl: 'https://via.placeholder.com/150', name: 'image1.jpg' },
            { presignedUrl: 'https://via.placeholder.com/150', name: 'image2.jpg' },
          ],
        };
        images.value = portfolio.value.images || [];
      } catch (error) {
        console.error('Error fetching portfolio:', error);
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
          // TODO: 백엔드 API 호출
          // await fetch(`API_URL/portfolios/${portfolioId}`, { method: 'DELETE' });
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
