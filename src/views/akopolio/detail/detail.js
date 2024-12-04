import MainHeader from '../../../components/layout/Header.vue';
import MainFooter from '../../../components/layout/Footer.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // vue-router 기능 사용

const nickname = ref('');

const fetchUserData = async () => {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_BE_API_URL}/api/users/profile`,
      {
        method: 'GET',
        credentials: 'include', 
      }
    );

    if (response.ok) {
      const data = await response.json();
      nickname.value = data.nickname;
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
};

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const portfolio = ref(null); // 포트폴리오 데이터 저장
    const images = ref([]); // 업로드된 이미지 또는 미리보기 저장
    const nickname = ref(''); // 사용자 닉네임 저장
    const userId = ref(null); // 사용자 ID 저장

    const route = useRoute(); // route 사용
    const router = useRouter(); // router 사용
    const portfolioId = route.params.id; // route에서 portfolioId 가져오기


    console.log("Portfolio ID:", portfolioId);

    // 포트폴리오 데이터 가져오기
    const fetchPortfolioById = async (portfolioId) => {
      try {
        const apiUrl = `${process.env.VUE_APP_BE_API_URL}/api/portfolios/${portfolioId}`;
        console.log('Fetching portfolio from URL:', apiUrl); // API URL 출력

        // Fetch 요청
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status); // 상태 코드 확인

        if (!response.ok) {
          console.error(`Response status: ${response.status}, ${response.statusText}`);
          // 예외 처리를 통해 사용자에게 상세한 에러 메시지 제공
          if (response.status === 404) {
            throw new Error('포트폴리오를 찾을 수 없습니다.');
          } else if (response.status === 500) {
            throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          } else {
            throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
          }
        }

        const data = await response.json();

        // 응답 데이터 확인
        console.log('Received portfolio data:', data);

        // 포트폴리오 데이터를 구조에 맞게 저장
        portfolio.value = {
          baseInfo: data.baseInfo || {}, // 기본 정보 저장
          experience: data.experience || {}, // 경험 정보 저장
          pmi: data.pmi || {}, // PMI 정보 저장
          photoUrls: data.photoUrls || [], // 사진 URL 배열 저장
        };

        // 이미지 데이터 따로 저장
        images.value = portfolio.value.photoUrls;

      } catch (error) {
        console.error('Error fetching portfolio:', error);
        alert('포트폴리오를 가져오는 중 오류가 발생했습니다.');
        portfolio.value = null; // 오류 발생 시 초기화
        images.value = [];
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
      fetchUserData(); // 사용자 정보도 마운트 시 호출
      fetchPortfolioById(portfolioId); 
    });

    return {
      portfolio,
      images,
      nickname,
      editPortfolio,
      handleDeletePortfolio,
    };
  },
};
